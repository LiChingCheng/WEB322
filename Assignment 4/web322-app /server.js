
/*********************************************************************************
* WEB322 – Assignment 04
* I declare that this assignment is my own work in accordance with Seneca Academic Policy.
* No part of this assignment has been copied manually or electronically from any other source
* (including 3rd party web sites) or distributed to other students. 
* Name: Li-Ching Cheng  Student ID: 143292175  Date: 2019/02/28 *
* Online (Heroku) URL:  https://glacial-coast-79878.herokuapp.com/ *
********************************************************************************/
const express = require("express");
const path = require("path");
const data = require("./data-service.js");
const bodyParser = require('body-parser');
const fs = require("fs");
const multer = require("multer");
const exphbs = require('express-handlebars');
const app = express();

const HTTP_PORT = process.env.PORT || 8080;

app.engine('.hbs', exphbs({ 
    extname: '.hbs',
    defaultLayout: "main",
    helpers: { 
        navLink: function(url, options){
            return '<li' + 
                ((url == app.locals.activeRoute) ? ' class="active" ' : '') + 
                '><a href="' + url + '">' + options.fn(this) + '</a></li>';
        },
        equal: function (lvalue, rvalue, options) {
            if (arguments.length < 3)
                throw new Error("Handlebars Helper equal needs 2 parameters");
            if (lvalue != rvalue) {
                return options.inverse(this);
            } else {
                return options.fn(this);
            }
        }
    } 
}));

app.set('view engine', '.hbs');

// multer requires a few options to be setup to store files with file extensions
// by default it won't store extensions for security reasons
const storage = multer.diskStorage({
    destination: "./public/images/uploaded",
    filename: function (req, file, cb) {
      cb(null, Date.now() + path.extname(file.originalname));
    }
  }); 
  // tell multer to use the diskStorage function for naming files instead of the default.
  const upload = multer({ storage: storage });

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));

app.use(function(req,res,next){
    let route = req.baseUrl + req.path;
    app.locals.activeRoute = (route == "/") ? "/" : route.replace(/\/$/, "");
    next();
});

app.get("/", (req,res) => {
    res.render("home");
});

app.get("/about", (req,res) => {
    res.render("about");
});

app.get("/images/add", (req,res) => {
    res.render("addImage");
});

app.get("/employees/add", (req,res) => {
    res.render("addEmployee");
});

app.get("/images", (req,res) => {
    fs.readdir("./public/images/uploaded", function(err, files) {
      res.render("images", {data: files});
    });
});

app.get("/employees", (req, res) => {
   if (req.query.status) {
        data.getEmployeesByStatus(req.query.status).then((data) => {
            res.render("employees", {employees:data});
        }).catch((err) => {
            res.render("employees",{ message: "no results" });
        });
    } 
    else if (req.query.department) {
        data.getEmployeesByDepartment(req.query.department).then((data) => {
            res.render("employees", {employees:data});
        }).catch((err) => {
            res.render("employees",{ message: "no results" });
        });
    } 
    else if (req.query.manager) {
        data.getEmployeesByManager(req.query.manager).then((data) => {
            res.render("employees", {employees:data});
        }).catch((err) => {
            res.render("employees",{ message: "no results" });
        });
    } 
    else {
        data.getAllEmployees().then((data) => {
            res.render("employees", {employees:data});
        }).catch((err) => {
            res.render("employees",{ message: "no results" });
        });
    }
});

app.get("/departments", (req,res) => {
    data.getDepartments().then((data)=>{
        res.render("departments",{departments:data});
    });
});

app.get("/employee/:num", (req, res) => {
    data.getEmployeeByNum(req.params.num).then((data) => {
        res.render("employee", {employee: data});
    }).catch((err) => {
        res.render("employee",{message:"no results"});
    });
});

app.post("/employees/add", (req, res) => {
    data.addEmployee(req.body).then(()=>{
      res.redirect("/employees"); 
    });
});

app.post("/images/add", upload.single("imageFile"), (req, res) => {
    res.redirect("/images");
});

app.post("/employee/update", (req, res) => {
    data.updateEmployee(req.body).then(()=>{
    res.redirect("/employees");
    }); 
});

app.use((req, res) => {
    res.status(404).send("Page Not Found");
  });

data.initialize().then(function(){
    app.listen(HTTP_PORT, function(){
        console.log("app listening on: " + HTTP_PORT)
    });
}).catch(function(err){
    console.log("unable to start server: " + err);
});


