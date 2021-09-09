const express = require("express");
// var bodyParser = require("body-parser");
var cors = require('cors');
const app = express();
var opn = require('opn');
const { response } = require("express");

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({extended: true}));


app.get("/", function(request, respond){
    respond.send("Hello World");
});

app.listen(3001, function(){
    console.log("Server started!");
  });