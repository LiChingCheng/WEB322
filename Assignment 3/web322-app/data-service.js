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
                             resolve();
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
                managers.push(employees[i]);
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

module.exports.addEmployee=function(employeeData){
    return new Promise (function(reject,resolve){
        employeeData.isManager = (employeeData.isManager) ? true : false;
        employeeData.employeeNum=++employees.length;
        if(employees.length!=0){   
            employees.push(employeeData);
            resolve(employees);
        }
    });
}

module.exports.getEmployeesByStatus=function(status){
    return new Promise (function(reject,resolve){
        var empStatus=[];
        for(var i=0;i<employees.length;i++){
            if(employees[i].status==status){
                empStatus.push(employees[i]);
            }
        }
        if(empStatus.length==0){
            reject("no results returned.");
        }
        else{
            resolve(empStatus);
        }
    });
}

module.exports.getEmployeesByDepartment=function(department){
    return new Promise (function(reject,resolve){
        var empDepart=[];
        for(var i=0;i<employees.length;i++){
            if(employees[i].department==department){
                empDepart.push(employees[i]);
            }
        }
        if(empDepart.length==0){
            reject("no results returned.");
        }
        else{
            resolve(empDepart);
        }
    });
}

module.exports.getEmployeesByManager=function(employeeManagerNum){
    return new Promise (function(reject,resolve){
        var empMng=[];
        for(var i=0;i<employees.length;i++){
            if(employees[i].employeeManagerNum==employeeManagerNum){
                empMng.push(employees[i]);
            }
        }
        if(empMng.length==0){
            reject("no results returned.");
        }
        else{
            resolve(empMng);
        }
    });
}

module.exports.getEmployeeByNum=function(employeeNum){
    return new Promise (function(reject,resolve){
        var empNum=[];
        for(var i=0;i<employees.length;i++){
            if(employees[i].employeeNum==employeeNum){
                empNum.push(employees[i]);
            }
        }
        if(empNum.length==0){
            reject("no results returned.");
        }
        else{
            resolve(empNum);
        }
    });
}