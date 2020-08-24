
/*********************************************************************************
* WEB322 – Assignment 02
* I declare that this assignment is my own work in accordance with Seneca Academic Policy.
* No part of this assignment has been copied manually or electronically from any other source
* (including 3rd party web sites) or distributed to other students. 
* Name: Li-Ching Cheng  Student ID: 143292175  Date: 2019/01/26 *
* Online (Heroku) URL:  https://calm-sea-43057.herokuapp.com/ *
********************************************************************************/

var HTTP_PORT = process.env.PORT || 8080;
var express = require("express");
var app = express();
var path = require("path");
var dataservice = require("./data-service");

// call this function after the http server starts listening for requests
function onHttpStart() {
    console.log("Express http server listening on: " + HTTP_PORT);
}
  
app.use(express.static('public'));

  // setup a 'route' to listen on the default url path (http://localhost:8080)
app.get("/", function(req,res){
    res.sendFile(path.join(__dirname,"/views/home.html"));
});
  
  // setup another route to listen on /about
app.get("/about", function(req,res){
    res.sendFile(path.join(__dirname,"/views/about.html"));
});

app.get("/employees", function(req, res){
    dataservice.getAllEmployees()
    .then(function(employees){
        res.json(employees);
    })
    .catch(function(err){
        res.send(err);
    })
});

app.get("/departments", function(req, res){
    dataservice.getDepartments()
    .then(function(departments){
        res.json(departments);
    })
    .catch(function(err){
        res.send(err);
    })
});

app.get("/managers", function(req,res){
    dataservice.getManagers()
   .then(function(managers){
      res.json(managers);
    })
   .catch(function(err){
      res.send(err);
    })
});

app.use((req, res) => {
  res.status(404).send("Page Not Found");
});
   
// setup http server to listen on HTTP_PORT
dataservice.initialize()
.then(function(){
    app.listen(HTTP_PORT, onHttpStart)
}).catch(function(err){
  console.log(err);
});