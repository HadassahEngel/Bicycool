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
let response;

//get the orders and users collection
MongoClient.connect(
    connectionString,
    { useUnifiedTopology: true },
    (err, client) => {
        if (err) return console.error(err);
        console.log("Connected");
        let db = client.db("Bicycool_Data");
        response = db.collection("responses");
    }
);

//function to delete only for preprocess
router.get("/getAll", (req, res) => {
    response.find().toArray().then(result=>{
        return res.status(200).json(result)
    })
    .catch((err) => {
        return res.status(500).json({ err: err });
    });
});

//function to delete only for preprocess
router.post("/add", (req, res) => {
   response.insertOne({val:req.body.val})
   .then(()=> {return res.status(200).send()})
   .catch((err) => {
    return res.status(500).json({ err: err });
    });
});


module.exports = router;