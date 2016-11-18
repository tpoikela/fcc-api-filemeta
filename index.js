

const express = require("express");
const multer = require("multer");

const bodyParser = require("body-parser");

var upload = multer({ dest: 'uploads/' });

var app = express();
app.use(bodyParser.json());

var port = process.env.PORT || 8080;

// Middleware for handling the file upload
app.post("/fileupload", upload.single("fileupload"), (req, res, next) => {
    //console.log("File upload request: " + JSON.stringify(req.file));
    console.log(req.body);
    console.log(req.file);

    if (req.hasOwnProperty("file")) {
        var fileSize = req.file.size;
        res.json({size: fileSize});
    }
    else {
        res.sendStatus(400);
    }

});

app.get("/", (req, res) => {
    console.log("app.get / request. Serving index.html");
    res.sendFile(__dirname + "/index.html");
});


app.listen(port, () => {
    console.log("File metadata server listening on port " + port);
});

module.exports = app;

