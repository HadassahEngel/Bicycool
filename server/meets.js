"use strict";
const express = require("express");
let app = express();
let router = express.Router();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
const validition = require("./validation");
const mail = require("./sendMail");

router.use(function resetRouter(req, res, next) {
    next();
});

const mongo = require("mongodb");
const MongoClient = mongo.MongoClient;
const connectionString =
    "mongodb+srv://bicycool:1234@cluster0.kbz1x.mongodb.net/bicycool?retryWrites=true&w=majority";
let meets;
let users;
let guides;

//get the orders and users collection
MongoClient.connect(
    connectionString,
    { useUnifiedTopology: true },
    (err, client) => {
        if (err) return console.error(err);
        console.log("Connected");
        let db = client.db("Bicycool_Data");
        meets = db.collection("meets");
        users = db.collection("users");
        guides = db.collection("guides")
    }
);

router.post("/createMeet", (req, res) => {
    let message = "";
    if (
        req.body.namemeet == undefined ||
        req.body.time == undefined ||
        req.body.date == undefined ||
        req.body.map == undefined ||
        req.body.src == undefined ||
        req.body.level == undefined ||
        req.body.area == undefined ||
        req.body.way == undefined ||
        req.body.about == undefined ||
        req.body.idguide == undefined
    ) {
        return res.status(500).send("יש להזין את כל השדות");
    }
 

    let meet = {
        namemeet: req.body.namemeet,
        about: req.body.about,
        date: req.body.date,
        time: req.body.time,
        map: req.body.map,
        src: req.body.src,
        level: req.body.level,
        area: req.body.area,
        way: req.body.way,
        idguide: req.body.idguide,
        name: req.body.name,
        users: []
    };
    meets
        .findOne({ idguide: req.body.idguide, time: req.body.time, namemeet: req.body.namemeet })
        .then((result) => {
            if (result)
                return res.status(500).send("קיים כבר מפגש במיקום זה, ביום ובשעה שהזנת.");

            meets
                .insertOne(meet)
                .then(() => {
                    return res.status(200).send("OK");
                })
                .catch((err) => {
                    return res.status(500).send(err);
                });
        })
        .catch((err) => {
            return res.status(500).send(err);
        });
});

router.get("/chooseAllMeet", (req, res) => {
    meets
        .find()

        .toArray()
        .then((result) => {
            return res.status(200).json(result);
        })
        .catch((err) => {
            return res.status(500).json({ err: err });
        });
});

router.post("/getMeet", (req, res) => {


    meets
        .findOne({ _id: new mongo.ObjectID(req.body.idMeet) }, { $projection: req.body.projection })
        .then(async (result) => {
            if (result) { return res.status(200).json(result); }
            else { return res.status(500).json({ err: "מפגש לא קיים במערכת" }); }
        })
        .catch((err) => {
            return res.status(500).json({ err: err });
        });
});


router.get("/getUsersInMeets/:idMeets", async (req, res) => {

    meets
        .findOne({ _id: new mongo.ObjectID(req.params["idMeets"]) })
        .then(async (result) => {
            let usersArrya = [];
            for (let i = 0; i < result.users.length; i++) {
                let userDetails = await users.findOne({ id: result.users[i] }, { $projection: { name: 1, src: 1 } });
                usersArrya.push(userDetails);
            }
            return res.status(200).json(usersArrya);
        })
        .catch((err) => {
            return res.status(500).json({ err: err });
        });
});


router.put("/joinMeet", async (req, res) => {

    meets.findOne({ _id: new mongo.ObjectID(req.body.idMeets) })
        .then((meetToJoin) => {
            if (!meetToJoin) return res.status(500).send("מפגש זה לא קיים במערכת");
            users.findOne({ id: req.body.idUser })
                .then(async (userToJoin) => {
                    if (!userToJoin) return res.status(500).send("משתמש זה לא קיים במערכת");

                    for (let i = 0; i < userToJoin.meets.length; i++) {
                        let meetsDetails = await meets.findOne({ _id: new mongo.ObjectID(userToJoin.meets[i]) });

                        if (meetsDetails && meetsDetails.date == meetToJoin.date) {

                            return res.status(500).send("כבר שמור לך מפגש אחר לאותו תאריך");
                        }
                    }
                    let newUsersArray = meetToJoin.users;
                    newUsersArray.push(userToJoin.id);
                    meets.findOneAndUpdate(
                        {
                            _id: new mongo.ObjectID(meetToJoin._id)
                        },
                        {
                            $set: {
                                users: newUsersArray
                            }
                        })
                    let newMeetsArray = userToJoin.meets;
                    newMeetsArray.push(meetToJoin._id);
                    users.findOneAndUpdate(
                        {
                            id: userToJoin.id
                        },
                        {
                            $set: {
                                meets: newMeetsArray
                            }
                        })
                    return res.status(200).send("ok");
                })
                .catch((err) => {
                    return res.status(500).send(err);
                });
        })
        .catch((err) => {
            return res.status(500).send(err);
        });
})



router.put("/leaveMeet", async (req, res) => {

    meets.findOne({ _id: new mongo.ObjectID(req.body.idMeets) })
        .then((meetToLeave) => {
            if (!meetToLeave) return res.status(500).send("מפגש זה לא קיים במערכת");
            users.findOne({ id: req.body.idUser })
                .then(async (userToLeave) => {
                    if (!userToLeave) return res.status(500).send("משתמש זה לא קיים במערכת");
                    let newUsersArray = meetToLeave.users;

                    let index = meetToLeave.users.findIndex(id => id === userToLeave.id)

                    if (index < 0) return res.status(500).send("משתמש זה לא נמצא במפגש זה");
                    newUsersArray.splice(index, 1);
                    meets.findOneAndUpdate(
                        {
                            _id: new mongo.ObjectID(meetToLeave._id)
                        },
                        {
                            $set: {
                                users: newUsersArray
                            }
                        })


                    let newMeetsArray = userToLeave.meets;

                    index = -1
                    for (let i = 0; i < userToLeave.meets.length; i++) {

                        if (String(userToLeave.meets[i]) == String(meetToLeave._id)) {
                            index = i;
                            break;
                        }
                    }


                    if (index < 0) {
                        return res.status(500).send("meet not found");
                    }
                    newMeetsArray.splice(index, 1);
                    users.findOneAndUpdate(
                        {
                            id: userToLeave.id
                        },
                        {
                            $set: {
                                meets: newMeetsArray
                            }
                        })
                    return res.status(200).send("ok");
                })
                .catch((err) => {
                    return res.status(500).send(err);
                });
        })
        .catch((err) => {
            return res.status(500).send(err);
        });
})



module.exports = router;
