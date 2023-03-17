const inquirer = require('inquirer');
const mysql = require('mysql2');
const cTable = require('console.table');
require('dotenv').config();


const connection = mysql.createConnection(
  {
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'employee_db'
  });

connection.connect(err => {
  if (err) throw err;
  else {
  console.log(
    `Connected to the employee_db database.
    
  ****************************************
  *                                      *
  *                                      *
  *              Employee                *
  *               Tracker                *
  *                                      *
  *                                      *
  ****************************************`);
  promptSelect()
  }
});


const promptSelect = () => {
  inquirer.prompt ([
    {
      type: 'list',
      name: 'Selection',
      message: 'Please choose from the following options below:',
      choices: ['View all departments', 
      'View all roles', 
      'View all employees', 
      'Add department', 
      'Add role', 
      'Add employee', 
      'No Action']
    }
  ])
  .then((answers) => {
    const { choice } = answers;
  if (choice === "View all roles") {
    showRoles();
  }
  if (choice === "View all departments") {
    showDepartments();
  }
  if (choice === "View all employess") {
    showEmployees();
  }
  if (choice === "Add department") {
    addDepartment();
  }
  if (choice === "Add role") {
    addRole();
  }
  if (choice === "Add employee") {
    addEmployee();
  }
  if (choice === "No Action") {
    quitApp()
  };
  });
};

showRoles = () => {
  console.log('Showing available roles');
  const sql = `SELECT role.id, role.title, department.name AS department FROM role`;
  connection.promise().query(sql, (err, rows) => {
    if (err) throw err;
    console.table(rows);
    promptUser();
  })
};

showDepartments = () => {
  console.log('Showing available departments');
  const sql = `SELECT department.id, department.name AS department FROM department`;
  connection.promise().query(sql, (err, rows) => {
    if (err) throw err;
    console.table(rows);
    promptUser();
  }) 
};

showEmployees = () => {
  console.log('Showing all current employees');
  const sql = `SELECT * FROM employee`
  db.promise().query(sql, (err, rows) => {
    if (err) throw err;
    console.table(rows);
    promptUser();
  }) 
};

addDepartment = () => {
  inquirer.prompt(
    [
      {
        type: 'input',
        name: 'addDepartment',
        message: "Please type name of new department below",
        }
    ]
  )}

addRole = () => {
  inquirer.prompt(
    [
      {
        type: 'input',
        name: 'addRole',
        message: "Please type name of the new role below",
        validate: addRole => {
          if (addRole) {
            return true;
          } else {
            console.log("You can't leave it blank");
            return false
          }
          }
        },
        {
      type: 'input',
      name: 'wage',
      message: "Please type the salary/wage of the new role below",
      validate: addwage => {
        if (isNaN(addwage)) {
          return true;
        } else {
          console.log("please enter a proper monetary value for the role");
          return false
        }
      }
      }
    ])
    .then(answer => {
      const params = [answer.addRole, answer.wage];
const rolesql = `SELECT name, id FROM department`;
connection.promis().query(rolesql, (err, data) => {
  if (err) throw err;
const department = data.mapp(({ name, id }) => ({ name: name, value: id }));

inquirer.prompt([
  {
    type: 'list',
    name: 'department',
    message: "Please choose the department",
    choices: department
  }
])
.then(deptChoice => {
  const department = deptChoice.department;
  params.push(department);
  const sql = `INSERT INTO role (title, salary, department_id)
  VALUES (?, ?, ?)`;
  connection.query(sql, params, (err, result) => {
    if (err) throw err;
    console.log('Added' + answer.role + " to roles");
    showRoles();
  });
});
});
});
};

addEmployee = () => {
  inquirer.prompt([
    {
      type: 'input',
      name: 'firstName',
      message: "Please type the first name of the new employee below"
    },
  {
    type: 'input',
    name: 'lastName',
    message: "Please type the last name of the new employee below"
  }
  ])
  
.then(answer => {
  const params = [answer.firstName, answer.lastName]
  const rolesql = `SELECT role.id, role.title FROM role`;

  connection.promise().query(rolesql, (err, data) => {
    if (err) throw err;
    const roles = data.map(({ id, title }) => ({ name: title, value: id }));

    inquirer.prompt([
      {
        type: 'list',
        name: 'role',
        message: "Please choose the role the employee belongs to",
        choices: roles
      }
    ])
  })
})
};