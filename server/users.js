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
let users;

//get the orders and users collection
MongoClient.connect(
    connectionString,
    { useUnifiedTopology: true },
    (err, client) => {
        if (err) return console.error(err);
        console.log("Connected");
        let db = client.db("Bicycool_Data");
        users = db.collection("users");
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
        req.body.age == undefined ||
        req.body.password == undefined
    ) {
        return res.status(500).send("יש להזין את כל השדות");
    }
    message = validition.validationId(req.body.id);
    if (message != null) {
        return res.status(500).send(message);
    }

    let user = {
        id: req.body.id,
        name: req.body.name,
        email: req.body.email.toLowerCase(),
        phone: req.body.phone,
        age: req.body.age,
        password: req.body.password,
        meets: [], 
        role:"BicycleRider"
    };
    if (req.body.src !== undefined) {
        user.src = req.body.src;
    }

    users
        .findOne({ id: req.body.id })
        .then((result) => {
            if (result) return res.status(500).send("משתמש זה קיים במערכת");
            users.findOne({ email: req.body.email }).then(result => {
                if (result) return res.status(500).send("מייל זה קיים במערכת");
                users
                    .insertOne(user)
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
    users
        .findOne({ email: req.body.email.toLowerCase() })
        .then((result) => {
            if (result) {
                if (result.password == req.body.password) {
                    return res.status(200).json(result);
                } else return res.status(500).json({ err: "סיסמה לא נכונה" });
            } else return res.status(500).json({ err: "משתמש לא קיים" });
        })
        .catch((err) => {
            return res.status(500).json({ err: err });
        });
});

router.get("/getAllUsers", (req, res) => {
    users
        .find()
        .toArray()
        .then((result) => {
            return res.status(200).json(result);
        })
        .catch((err) => {
            return res.status(500).json({ err: err });
        });
});


router.get("/getUser/:id", (req, res) => {
    users
        .findOne({id:req.params["id"]})
        .then((result) => {
            return res.status(200).json(result);
        })
        .catch((err) => {
            return res.status(500).json({ err: err });
        });
});

//function to delete only for preprocess
router.put("/updateUser", (req, res) => {
    let message = "";
    if (
        req.body.id == undefined ||
        req.body.name == undefined ||
        req.body.email == undefined ||
        req.body.phone == undefined ||
        req.body.password == undefined
    ) {
        return res.status(500).send("יש להזין את כל השדות");
    }
    message = validition.validationId(req.body.id);
    if (message != null) {
        return res.status(500).send(message);
    }

    users
        .findOneAndUpdate(
            { id: req.body.id },
            {
                $set: {
                    name: req.body.name,
                    email: req.body.email.toLowerCase(),
                    phone: req.body.phone,
                    password: req.body.password
                }
            }
        )
        .then(() => {
            return res.status(200).send("OK");
        })
        .catch((err) => {
            return res.status(500).send(err);
        });
});


module.exports = router;