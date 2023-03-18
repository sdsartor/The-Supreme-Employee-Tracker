const inquirer = require('inquirer');
const mysql = require('mysql2');
const cTable = require('console.table');
require('dotenv').config();

// The only functional part of my code is the start up screen with the connecton data unfortunately.
const connection = mysql.createConnection(
  {
    host: 'localhost',
    user: 'root',
    password: 'Snowboard48@',
    database: 'employee_db'
  });
// This is the statement that will open up the connection to the server or throw an error.
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
  init()
  }
});

// These are the prompts we are met with after seeing the employee tracker window.

    
  const choices = ['View all departments', 'View all roles', 'View all employees', 'Add department', 'Add role', 'Add employee', 'No Action']
    

init();

  function init() {
      inquirer.prompt({
          name: "selection",
          type: "list",
          message: "Please choose from the following options: ",
          choices: choices
      })

  // These create functions to access the choices above.
  .then(function init(answers) {
    console.log(answers);
  if (answers.list === choices[1]) {
    showRoles();
  }
 if (answers.list === choices[0]) {
    showDepartments();
  }
 if (answers.list === choices[2]) {
    showEmployees();
  }
 if (answers.list === choices[3]) {
    addDepartment();
  }
 if (answers.list === choices[4]) {
    addRole();
  }
 if (answers.list === choices[5]) {
    addEmployee();
  }
  if (answers.list === choices[6]) {
    console.log("Please exit node if you do not require usage of the employee tracker")
  }
  else { 
    return;
  };
  });
};
// This function looks out for the roles in the seeds.sql and posts it.
showRoles = () => {
  connection.query(sql, err, rows, fields) 
  const sql = `SELECT role.id, role.title, department.name AS department FROM role`;
    if (err) throw err;
    console.table(rows);
    init();
  }
// This function reveals the data under the department table.
showDepartments = () => {
  console.log('Showing available departments');
  const sql = `SELECT department.id, department.name AS department FROM department`;
  connection.query(sql, err, rows, fields) 
    if (err) throw err;
    console.table(rows);
    init();
  }
// This function shows the data under the employee table.
showEmployees = () => {
  console.log('Showing all current employees');
  const sql = `SELECT * FROM employee`
  connection.query(sql, err, rows, fields)
    if (err) throw err;
    console.table(rows);
    init();
  }
// This code allows for the department to create a new item and allows for prompts to make creating one easier.
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
// This does the same as the addDepartment, but for the role table.
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
          // This makes it possible to type in a monetary value for the wage.
      type: 'input',
      name: 'wage',
      message: "Please type the salary/wage of the new role below",
      validate: wage => {
        if (isNaN(wage)) {
          return true;
        } else {
          console.log("please enter a proper monetary value for the role");
          return false
        }
      }
      }
    ])
    .then(answer => {
      // This allows for the code to have the responses be used for the role table data on newly created employees.
      const parameters = [answer.addRole, answer.wage];
const rolesql = `SELECT name, id FROM department`;
connection.query(rolesql, err, rows, fields) 
  if (err) throw err;
const department = data.mapp(({ name, id }) => ({ name: name, value: id }));
// This chooses the department a person is placed in.
inquirer.prompt([
  {
    type: 'list',
    name: 'department',
    message: "Please choose the department",
    choices: department
  }
])
// This makes the data above be posted for each employee created.
.then(departmentChoice => {
  const department = departmentChoice.department;
  parameters.push(department);
  const sql = `INSERT INTO role (title, salary, department_id)
  VALUES (?, ?, ?)`;
  connection.query(sql, parameters, (err, rows) => {
    if (err) throw err;
    console.log('Added' + answer.role + " to roles");
    showRoles();
  });
});
});
};
;
// This function gives questions and code to create new sections in the employee table to add more people.
addEmployee = () => {
  connection.promise().query(`SELECT role.id, role.title FROM role`)
  .then(([rows, fields]) => {
  const rolebracket = rows.map(rows => ({
    name: rows.title, value: rows
  }))

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
  },
  {
    type: 'confirm',
    name: 'manager',
    message: "Please confirm if the new employee is a manager",
    default: 'false'
  },
{
  type: 'list',
  name: 'roleselection',
  message: "Please choose the role this employee will be working under",
  choices: rolebracket
}
  
  // This section allows for the answers to be used for the questions above and links it to the employee table.
]).then(answer => {
const managerId = answer.manager_id ? null : 1;

  connection.promise(`INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)", [answer.first, answer.last, roleId, managerId]`)
  .then(function (res) {
    console.table(res[0]);
    init;
  }) 
 
      }
  )
})}
init();