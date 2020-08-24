/*********************************************************************************
* WEB322 – Assignment 1
* I declare that this assignment is my own work in accordance with Seneca Academic Policy.
* No part of this assignment has been copied manually or electronically from any other source
* (including web sites) or distributed to other students. *
* Name: Li-Ching Cheng  Student ID: 143292175  Date: 2019/01/08 *
* Online (Heroku) URL: https://agile-earth-69645.herokuapp.com/ *
********************************************************************************/

var HTTP_PORT = process.env.PORT || 8080;
var express = require("express");
var app = express();

// setup a 'route' to listen on the default url path
app.get("/", (req, res) => {
    res.send(" Li-Ching,Cheng - 143292175 ");
});

// setup http server to listen on HTTP_PORT
app.listen(HTTP_PORT);