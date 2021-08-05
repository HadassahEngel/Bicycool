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
let guides;
let meets;

//get the orders and users collection
MongoClient.connect(
    connectionString,
    { useUnifiedTopology: true },
    (err, client) => {
        if (err) return console.error(err);
        console.log("Connected");
        let db = client.db("Bicycool_Data");
        guides = db.collection("guides");
        meets = db.collection("meets");
    }
);

//function to delete only for preprocess
router.post("/signUp", (req, res) => {
    let message = "";
    if (
        req.body.id == undefined ||
        req.body.name == undefined ||
        req.body.email == undefined ||
        req.body.phone == undefined ||
        req.body.password == undefined ||
        req.body.confirm_password == undefined ||
        req.body.license_number == undefined ||
        req.body.about == undefined
    ) {
        return res.status(500).send("יש להזין את כל השדות");
    }
    message = validition.validationId(req.body.id);
    if (message != null) {
        return res.status(500).send(message);
    }
    message = validition.validationName(req.body.name);
    if (message != null) {
        return res.status(500).send(message);
    }
    message = validition.validationEmail(req.body.email);
    if (message != null) {
        return res.status(500).send(message);
    }
    message = validition.validationPhone(req.body.phone);
    if (message != null) {
        return res.status(500).send(message);
    }
    message = validition.validationLicense_number(req.body.license_number);
    if (message != null) {
        return res.status(500).send(message);
    }
    message = validition.validationPassword(req.body.password);
    if (message != null) {
        return res.status(500).send(message);
    }
    
    message = validition.validationAbout(req.body.about);
    if (message != null) {
        return res.status(500).send(message);
    }

    let guide = {
        id: req.body.id,
        name: req.body.name,
        email: req.body.email.toLowerCase(),
        phone: req.body.phone,
        age: req.body.age,
        password: req.body.password,
        license_number: req.body.license_number,
        meets:[],
        about: req.body.about,
        role:"Guide"
    };

    if(req.body.src!==undefined){
        guide.src=req.body.src;
    }
    guides
        .findOne({ email: req.body.email.toLowerCase() })
        .then((result) => {
            if (result)
                return res.status(500).send("כתובת מייל זו קיימת במערכת");
            guides
                .insertOne(guide)
                .then(() => {
                    mail.signUp(req.body.email.toLowerCase());
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

//function to delete only for preprocess
router.post("/login", (req, res) => {
    let message = "";
    if (req.body.email == undefined || req.body.password == undefined) {
        return res.status(500).send("יש להזין את כל השדות");
    }


    guides
        .findOne({ email: req.body.email.toLowerCase() })
        .then((result) => {
            if (result) {
                if (result.password == req.body.password) {
                    console.log(result);
                    return res.status(200).json(result);
                } else return res.status(500).json({ err: "סיסמה לא נכונה" });
            } else return res.status(500).json({ err: "משתמש לא קיים" });
        })
        .catch((err) => {
            return res.status(500).json({ err: err });
        });
});

//function to delete only for preprocess
router.put("/updateGuide", (req, res) => {
    let message = "";
    if (
        req.body.id == undefined ||
        req.body.name == undefined ||
        req.body.email == undefined ||
        req.body.phone == undefined ||
        req.body.password == undefined ||
        req.body.license_number == undefined ||
        req.body.about == undefined
    ) {
        return res.status(500).send("יש להזין את כל השדות");
    }
    message = validition.validationId(req.body.id);
    if (message != null) {
        return res.status(500).send(message);
    }
    guides
        .findOneAndUpdate(
            { id: req.body.id },
            {
                $set: {
                    name: req.body.name,
                    email: req.body.email.toLowerCase(),
                    phone: req.body.phone,
                    password: req.body.password,
                    license_number: req.body.license_number,
                    about: req.body.about,
                },
            }
        )
        .then(() => {
            return res.status(200).send();
        })
        .catch((err) => {
            return res.status(500).send(err);
        });
});

//function to delete only for preprocess
router.get("/getAllGuides", (req, res) => {
    guides
        .find()
        .project({ id: 1, name: 1, src: 1, about: 1 })
        .toArray()
        .then((result) => {
            return res.status(200).json(result);
        })
        .catch((err) => {
            return res.status(500).json({ err: err });
        });
});

router.get("/getGuide/:idGuide", (req, res) => {
    guides
        .findOne({id:req.params["idGuide"]})
        .then((result) => {
            return res.status(200).json(result);
        })
        .catch((err) => {
            return res.status(500).json({ err: err });
        });
});

//function to delete only for preprocess
router.post("/addMeet", (req, res) => {
    guides
        .findOne({id:req.body.id})
        .then((result) => {
            meets.findOne({ idguide: req.body.id, time: req.body.time, namemeet: req.body.namemeet })
            .then((result2) => {
                let meetsarray=result.meets
                meetsarray.push(String( result2._id))
                console.log(meetsarray);
                guides
                .findOneAndUpdate({id:req.body.id},{$set:{meets:meetsarray}})
                .then(() => {
                    return res.status(200).json({status:"ok"})
                })
                .catch((err) => {
                    return res.status(500).json({ err: err });
                });
            })
            .catch((err) => {
                return res.status(500).json({ err: err });
            });
          
        })
        .catch((err) => {
            return res.status(500).json({ err: err });
        });
});

//function to delete only for preprocess
router.get("/getGuideMeets/:idGuide", (req, res) => {
    guides
        .findOne({ id: req.params["idGuide"] })
        .then(async (result) => {
            let meetsArray = result.meets;
            console.log(meetsArray);
            let meetsFullDetails = [];
            for (let i = 0; i < meetsArray.length; i++) {
                await meets
                    .findOne({ _id: new mongo.ObjectID(meetsArray[i]) })
                    .then((result) => {
                        console.log(result);
                        meetsFullDetails.push(result);
                        console.log(meetsFullDetails);
                    })
                    .catch((err) => {
                        return res.status(500).json({ err: err });
                    });
            }
            return res.status(200).json(meetsFullDetails);
        })
        .catch((err) => {
            return res.status(500).json({ err: err });
        });
});

module.exports = router;
