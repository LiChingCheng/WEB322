var mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
var Schema = mongoose.Schema;
let User;

var userSchema = new Schema({
    "userName":  {
        "type": String,
        "unique": true
    },
    "password": String,
    "email": String,
    "loginHistory": [{
        dateTime: Date,
        userAgent: String
    }]  
});

module.exports.initialize = function () {
    return new Promise(function (resolve, reject) {
        let db = mongoose.createConnection("mongodb+srv://MongoDB:MongoDB@senecaweb-oofjf.mongodb.net/test?retryWrites=true");
        db.on("error", (err) => {
            reject(err); 
        });
        db.once("open", () => {
            User = db.model("users", userSchema);
            resolve();
        });
    });
};

module.exports.checkUser = function (userData) {
    return new Promise(function (resolve,reject) {
        User.find({ userName: userData.userName })
        .exec()
        .then((data)=>{
            if(!data){
                reject("Unable to find user: " + userData.userName );
            }
            else{
                    bcrypt.compare(userData.password, data[0].password).then((res)=>{
                        if(res===true){
                            data[0].loginHistory.push({dateTime: (new Date()).toString(), userAgent: userData.userAgent});
                            User.update(
                                { userName: data[0].userName },
                                { $set: {loginHistory: data[0].loginHistory }},
                                { multi: false }
                            ).exec()
                            .then(() => {
                                resolve(data[0]);
                            }).catch((err) => {
                                reject("There was an error verifying the user: " + err);
                            });
                        } 
                        else if(res===false){
                            reject("Incorrect Password for user: " + userData.userName);
                        }
                    }).
                    catch((err) => {
                        reject("There was an error verifying the user: " + err);
                    });
            }
        })
        .catch((err)=>{
            reject("Unable to find user: " + userData.userName +err );
        });
    })
};

module.exports.registerUser = function (userData) {
    return new Promise(function (resolve, reject) {
        if (userData.password != userData.password2) {
            reject("Passwords do not match");
        }
        else {
            let newUser = new User(userData);
            bcrypt.genSalt(10, function (err, salt) {
                bcrypt.hash(userData.password, salt, function (err, hash) {
                    if (err) {
                        reject("There was an error encrypting the password");
                    }
                    else {
                        newUser.password = hash;
                        newUser.save()
                        .then(() => {
                            resolve();
                        })
                        .catch((err) => {
                            if (err.code == 11000) {
                                reject("User Name already taken");
                            }
                            else {
                                reject("There was an error creating the user:" + err);
                            }
                        });
                    }
                });
            });
        }
    });
}