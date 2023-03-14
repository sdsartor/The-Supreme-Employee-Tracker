const inquirer = require('inquirer');
const mysql = require('mysql2');
const cTable = require('console.table');
require('dotenv').config();

// Express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Connect to database
const connection = mysql.createConnection(
  {
    host: 'localhost',
    // MySQL username,
    user: 'root',
    // TODO: Add MySQL password here
    password: '',
    database: 'employee_db'
  },
  console.log(`Connected to the employee_db database.`)
);

afterConnection = () => {
  console.log('************************')
  console.log('*                      *')
  console.log('*                      *')
  console.log('*   Employee Manager   *')
  console.log('*                      *')
  console.log('*                      *')
  console.log('************************')
  promptSelect();
}

const promptSelect = () => {
  inquirer.prompt ([
    {
      type: 'list',
      name: 'Selection',
      message: 'Please choose from the following options below:',
      choices: ['View all departments', 
      'View all roles', 
      'View all employees', 
      'Add a department', 
      'Add a role', 
      'Add an employee', 
      'Update an employee role',
      'Update an employee manager',
      "View employees by department",
      'Delete a department',
      'Delete a role',
      'Delete an employee',
      'View department budgets',
      'No Action']
    }
  ])
}