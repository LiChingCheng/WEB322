const fs = require("fs");
var employees = [];
var departments = [];

module.exports.initialize = function () {
    return new Promise( (resolve, reject) => {
        fs.readFile('./data/departments.json', (err, data) => {
            if (err) {
                reject(err);
            }
            departments = JSON.parse(data);
            fs.readFile('./data/employees.json', (err, data) => {
                if (err) {
                    reject(err);
                }
                employees = JSON.parse(data);
                resolve();
            });
        });
    });
}

module.exports.getAllEmployees = function(){
    return new Promise((resolve,reject)=>{
        if (employees.length == 0) {
            reject("No result returned");
        }
        resolve(employees);
    });
}

module.exports.addEmployee = function (employeeData) {
    return new Promise(function (resolve, reject) {
        employeeData.isManager = (employeeData.isManager) ? true : false;
        employeeData.employeeNum = ++employees.length;
        employees.push(employeeData);
        resolve();
    });
};

module.exports.getEmployeeByNum = function (num) {
    return new Promise(function (resolve, reject) {
        var empNum = null;
        for (let i = 0; i < employees.length; i++) {
            if (employees[i].employeeNum == num) {
                empNum = employees[i];
            }
        }
        if (!empNum) {
            reject("No result returned");
        }
        resolve(empNum);
    });
};

module.exports.getEmployeesByStatus = function (status) {
    return new Promise(function (resolve, reject) {
        var empStatus = [];
        for (let i = 0; i < employees.length; i++) {
            if (employees[i].status == status) {
                empStatus.push(employees[i]);
            }
        }

        if (empStatus.length == 0) {
            reject("No result returned");
        }
        resolve(empStatus);
    });
};

module.exports.getEmployeesByDepartment = function (department) {
    return new Promise(function (resolve, reject) {
        var empDept = [];
        for (let i = 0; i < employees.length; i++) {
            if (employees[i].department == department) {
                empDept.push(employees[i]);
            }
        }
        if (empDept.length == 0) {
            reject("No result returned");
        }
        resolve(empDept);
    });
};

module.exports.getEmployeesByManager = function (employeeManagerNum) {
    return new Promise(function (resolve, reject) {
        var empMng = [];
        for (let i = 0; i < employees.length; i++) {
            if(employees[i].employeeManagerNum == employeeManagerNum){
                empMng.push(employees[i]);
            }
        }
        if (empMng.length == 0) {
            reject("No result returned");
        }
        resolve(empMng);
        console.log("msm");
    });
};

module.exports.getManagers = function () {
    return new Promise(function (resolve, reject) {
        var mng = [];
        for (let i = 0; i < employees.length; i++) {
            if (employees[i].isManager == true) {
                mng.push(employees[i]);
            }
        }
        if (mng.length == 0) {
            reject("No result returned");
        }
        resolve(mng);
    });
};

module.exports.getDepartments = function(){
   return new Promise((resolve,reject)=>{
    if (departments.length == 0) {
        reject("No result returned");
    }
    resolve(departments);
   });
}

module.exports.updateEmployee = function (employeeData) {
    employeeData.isManager = (employeeData.isManager) ? true : false;
    return new Promise(function (resolve, reject) {
        for(let i=0; i < employees.length; i++){
            if(employees[i].employeeNum == employeeData.employeeNum){
                employees[i] = employeeData;
            }
        }
        resolve();
    });
};
