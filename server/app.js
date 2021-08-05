let express = require('express');
let app = express();
let bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

let server = app.listen(27017, function () {
    console.log("success");
});



const cors = require('cors');
const corsOptions = {
    origin: 'http://localhost:4444',
    credentials: true,         
    optionSuccessStatus: 200
}
app.use(cors(corsOptions));

app.use('/users', require("./users"));
 app.use('/guides', require("./guides"));
app.use('/meets', require("./meets"));
app.use('/responses', require("./response"));
app.use(function (req, res) {
    res.status(404).send({ url: req.originalUrl + ' not found' })
});
