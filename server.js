// const express = require('express');
// const fs = require('console.table');
const connection = require('./config/connection');
const inquirer = require('inquirer');
const mysql = require('mysql2');
const cTable = require('console.table');
require('dotenv').config();

// const PORT = process.env.PORT || 3001;
// const app = express();

// app.use(express.urlencoded({ extended: false }));
// app.use(express.json());
// The only functional part of my code is the start up screen with the connecton data unfortunately.

// This is the statement that will open up the connection to the server or throw an error.


// These are the prompts we are met with after seeing the employee tracker window.

    
  const choices = ['View all departments', 'View all roles', 'View all employees', 'Add department', 'Add role', 'Add employee', 'No Action']
const departmentarray = [];    

// connection.promise().query("SELECT id, dept_name FROM department")
//   .then(([rows, fields]) => {
//     rows.forEach(row => {
//       departmentarray.push({
//         id: row.id,
//         name: row.name
//       });
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
  //   });
  // })
 




  function init() {
      inquirer.prompt({
          name: "list",
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
  }
  });
};
// This function looks out for the roles in the seeds.sql and posts it.
showRoles = () => {
  connection.query('SELECT * FROM role', 
  function (error, results, fields) {
    if (error) throw error;
    console.table(results);
    init();
  })
}
// This function reveals the data under the department table.
showDepartments = () => {
  connection.query('SELECT * FROM department', 
function (error, results, fields) {
    if (error) throw error;
    console.table(results);
    init();
  })
};
// This function shows the data under the employee table.
showEmployees = () => {
  connection.query('SELECT * FROM employee',
  function (error, results, fields) {
    if (error) throw error;
    console.table(results);
    init();
  })
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
  ).then(function (answer) {
    connection.query('INSERT INTO department (dept_name) VALUES (?)', 
    [answer.addDepartment], 
    function (err, res) {
      if (err) throw err
      console.log("You successfully added the department")
      init();
    });
  });
}
// This does the same as the addDepartment, but for the role table.
function addRole() {
  connection.promise().query("SELECT id, dept_name FROM department")
  .then(([rows, fields]) => {
    const departmentArray = rows.map(row => ({
      name: row.dept_name,
      value: row.id
    }));

  inquirer.prompt(
    [
      {
        type: 'input',
        name: 'addRole',
        message: "Please type name of the new role below"
        },
        {
          // This makes it possible to type in a monetary value for the wage.
      type: 'input',
      name: 'wage',
      message: "Please type the salary/wage of the new role below"
      },
      {
        name: "department",
        type: "list",
        message: "What department would you like this role to be under",
        choices: departmentArray
      }
    ]).then(function (answer) {
      connection.query("INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)", [answer.addRole, answer.wage, answer.department],
      function (err, res) {
        if (err) throw err
        console.log("You successfully added the role")
        init();
      })
    })
  })}
  
      // This allows for the code to have the responses be used for the role table data on newly created employees.
     
// This chooses the department a person is placed in.

// This makes the data above be posted for each employee created.

// This function gives questions and code to create new sections in the employee table to add more people.
function addEmployee() {
  connection.promise().query(`SELECT id, title FROM role`)
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
]).then(function (answer) {
const managerId = answer.manager_id ? null : 1;
const roleId = answer.roleselection;

  connection.promise().query("INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)", [answer.first, answer.last, roleId, managerId],
  function (err, res) {
    if (err) throw err
    console.log("You successfully added an employee")
    init();
}) 
});
});
  };

init();