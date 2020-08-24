const fs=require('fs');
var employees = [];
var departments = [];

module.exports.initialize=function() {
    return new Promise(function(resolve, reject) {
        fs.readFile('./data/employees.json', (err, data) =>{
            if (err) {
                reject("Unable to read the file.");
            }
            else {                
                employees = JSON.parse(data);
                fs.readFile("./data/departments.json", function(err, data) {
                    if (err) {
                        reject("Unable to read the file.");
                    }
                    else {                
                        departments = JSON.parse(data);
                             resolve(departments);
                             resolve(employees);
                    }
                });
            }               
        })   
    });
}

module.exports.getAllEmployees=function(){
    return new Promise (function(reject,resolve){
        if(employees.length==0){
            reject("no results returned.");
        }
        else{
            resolve(employees);
        }
    });
}

module.exports.getManagers=function(){
    return new Promise (function(reject,resolve){
      var managers=[];  
        for(var i=0;i<employees.length;i++){
            if(employees[i].isManager==true){
                managers[i]=employees[i];
            }   
        }
        if(managers.length==0){
            reject("no results returned.");
        }
        else{
            resolve(managers);
        }
    });
}

module.exports.getDepartments=function(){
    return new Promise (function(reject,resolve){
        if(departments.length==0){
            reject("no results returned.");
        }
        else{
           resolve(departments);
        }
    });
}
