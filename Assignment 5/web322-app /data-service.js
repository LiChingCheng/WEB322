const Sequelize=require('sequelize');
const sequelize = new Sequelize("df637hh9hn90dq", "ebcwabzbhrgabz", "5c77b57234e3778f68cd79c5895d48fb774a2978dcb728b15d6bbc226907134f", {
    host: "ec2-23-21-165-188.compute-1.amazonaws.com",  
    dialect: "postgres",
    port: 5432,
    dialectOptions: {
      ssl: true
    }
  });

  const Employee = sequelize.define('Employee',{
    employeeNum:{
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    firstName: Sequelize.STRING,
    lastName: Sequelize.STRING,
    email: Sequelize.STRING,
    SSN: Sequelize.STRING,
    addressStreet: Sequelize.STRING,
    addressCity: Sequelize.STRING,
    addressState: Sequelize.STRING,
    addressPostal: Sequelize.STRING,
    matritalStatus: Sequelize.STRING,
    isManager: Sequelize.BOOLEAN,
    employeeManagerNum: Sequelize.INTEGER,
    status: Sequelize.STRING,
    department: Sequelize.INTEGER,
    hireDate: Sequelize.STRING
});

const Department = sequelize.define('Department',{
    departmentId:{
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    departmentName: Sequelize.STRING
});

module.exports.initialize = function () {
    return new Promise( (resolve, reject) => {
        sequelize.sync()
        .then(() => {
            resolve();
        })
        .catch((err) => {
            reject("Unable to sync the database");
        });
    });
}

module.exports.getAllEmployees = function(){
    return new Promise((resolve,reject)=>{
        Employee.findAll()
        .then((data) => {
            resolve(data);
        })
        .catch((err) => {
            reject("no results returned");
        });
    });
}

module.exports.addEmployee = function (employeeData) {
    return new Promise(function (resolve, reject) {
        employeeData.isManager = (employeeData.isManager) ? true : false;
        for (var i in employeeData) {
            if (employeeData[i] == "") {
                employeeData[i] = null;
            }
        }
        Employee.create(employeeData)
        .then(() => {
            resolve();
        })
        .catch((err) => {
            reject("unable to create employee");
        });
    });
};

module.exports.getEmployeeByNum = function (num) {
    return new Promise(function (resolve, reject) {
        Employee.findAll({
            where: { employeeNum: num }
        })
        .then((data) => {
            resolve(data[0]);
        })
        .catch((err) => {
            reject("no results returned");
        });
    });
};

module.exports.getEmployeesByStatus = function (status) {
    return new Promise(function (resolve, reject) {
        Employee.findAll({
            where: { status: status }
        })
        .then((data)=>{
            resolve(data);
        })
        .catch((err) => {
            reject("no results returned.");
        });
    });
};

module.exports.getEmployeesByDepartment = function (department) {
    return new Promise(function (resolve, reject) {
        Employee.findAll({
            where: { department: department }
        })
        .then((data) => {
            resolve(data);
        })
        .catch((err) => {
            reject("no results returned");
        });
    });
};

module.exports.getEmployeesByManager = function (employeeManagerNum) {
    return new Promise(function (resolve, reject) {
        Employee.findAll({
            where: { employeeManagerNum: manager }
        })
        .then((data) => {
            resolve(data);
        })
        .catch((err) => {
            reject("no results returned");
        });
    });
};

module.exports.getManagers = function () {
    return new Promise(function (resolve, reject) {
        reject();
    });
};

module.exports.getDepartments = function(){
   return new Promise((resolve,reject)=>{
        Department.findAll()
        .then((data) => {
            resolve(data);
        }).catch((err) => {
            reject("no results returned");
        });
   });
}

module.exports.updateEmployee = function (employeeData) {
    return new Promise(function (resolve, reject) {
        employeeData.isManager = (employeeData.isManager) ? true : false;
        for (var i in employeeData) {
            if (employeeData[i] == "") {
                employeeData[i] = null;
            }
        }
        Employee.update(employeeData, {
            where: { employeeNum: employeeData.employeeNum } 
        })
        .then(() => {
            resolve();
        })
        .catch((err) => {
            reject("unable to update employee");
        });
    });
};

module.exports.addDepartment = (departmentData) => {
    return new Promise((resolve, reject) => {
        for(var i in departmentData){
            if(departmentData[i] == "") {
                departmentData[i] = null;
            }
        }
        Department.create({
            departmentId: departmentData.departmentId,
            departmentName: departmentData.departmentName
        })
        .then(() => {
            resolve(Department);
        })
        .catch((err) => {
            reject("unable to create department.");
        });
    });
}

module.exports.updateDepartment = (departmentData) => {
    return new Promise((resolve, reject) => {
        for(var i in departmentData){
            if(departmentData[i] == "") {
                departmentData[i] = null;
            }
        }
        Department.update({
        departmentName: departmentData.departmentName
        }, { where: {departmentId: departmentData.departmentId}
        })
        .then(() =>{
            resolve(Department);
        })
        .catch((err) => {
            reject("unable to create department.");
        });
    });
}

module.exports.getDepartmentById = (id) => {
    return new Promise((resolve, reject) => {
        Department.findAll({
            where: { departmentId: id }
        })
        .then((data) => {
            resolve(data[0]);
        })
        .catch((err) => {
            reject("no results returned");
        });
    });
}

module.exports.deleteEmployeeByNum = (empNum) => {
    return new Promise((resolve, reject) => {
        Employee.destroy({
            where: { employeeNum: empNum }
        })
        .then(() => {
            resolve();
        })
        .catch((err) => {
            reject("Delete Fail");
        });
    });
}



