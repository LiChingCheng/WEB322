
/*********************************************************************************
* WEB322 – Assignment 03
* I declare that this assignment is my own work in accordance with Seneca Academic Policy.
* No part of this assignment has been copied manually or electronically from any other source
* (including 3rd party web sites) or distributed to other students. 
* Name: Li-Ching Cheng  Student ID: 143292175  Date: 2019/02/17 *
* Online (Heroku) URL:  https://calm-sea-43057.herokuapp.com/ *
********************************************************************************/

var HTTP_PORT = process.env.PORT || 8080;
var express = require('express');
var app = express();
var path = require('path');
var fs = require('fs');
var dataservice = require("./data-service");
const bodyParser = require('body-parser');
  
app.use(express.static('public'));

const multer = require('multer');
const storage = multer.diskStorage({
    destination: "./public/images/uploaded",
    filename: function (req, file, cb){
        cb(null, Date.now() + path.extname(file.originalname));
    }
});
const upload = multer({storage:storage});

app.use(bodyParser.urlencoded({ extended: true }));

// call this function after the http server starts listening for requests
function onHttpStart() {
    console.log("Express http server listening on: " + HTTP_PORT);
}

  // setup a 'route' to listen on the default url path (http://localhost:8080)
app.get("/", function(req,res){
    res.sendFile(path.join(__dirname,"/views/home.html"));
});
  
  // setup another route to listen on /about
app.get("/about", function(req,res){
    res.sendFile(path.join(__dirname,"/views/about.html"));
});

app.get("/employees", function(req, res){
    if (req.query.status){
        dataservice.getEmployeesByStatus(req.query.status) 
        .then(function(employees){
            res.json(employees);
        })
        .catch(function(err){
            res.send(err);
        })
    }  
    else if (req.query.department){
        dataservice.getEmployeesByDepartment(req.query.department)
        .then(function(employees){
            res.json(employees);
        })
        .catch(function(err){
            res.send(err);
        })
    }   
    else if (req.query.employeeManagerNum){
        dataservice.getEmployeesByManager(req.query.employeeManagerNum)
        .then(function(employees){
            res.json(employees);
        })
        .catch(function(err){
            res.send(err);
        })
    }   
    else{
        dataservice.getAllEmployees()
        .then(function(employees){
            res.json(employees);
        })
        .catch(function(err){
            res.send(err);
        })
    }
});

app.get("/employee/:num", function(req, res){
    dataservice.getEmployeeByNum(req.params.num)
    .then(function(employeeNum){
        res.json(employeeNum);
    })
    .catch(function(err){
        res.send(err);
    });
}) //(**)

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

app.get("/employees/add", function(req,res){
    res.sendFile(path.join(__dirname, "/views/addEmployee.html"));
});

app.get("/images/add", function(req,res){
    res.sendFile(path.join(__dirname, "/views/addImage.html"));
});

app.post("/images/add", upload.single("imageFile"), function(req, res){
    res.redirect("/images");
});

app.get("/images", function(req,res){
    fs.readdir("./public/images/uploaded", function(err,files) {
        res.json({"images":files});
    });
});

app.post("/employees/add",function(req,res) {
    dataservice.addEmployee(req.body)
   .then(function(){
        res.redirect("/employees");
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
