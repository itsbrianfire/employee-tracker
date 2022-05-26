const mysql = require('mysql2');
const consoleTable = require('console.table');
// const start = require('repl');
const inquirer = require('inquirer');
// const fs = require('fs');
// const path = require('path');
// const app = express();


// const DIST_DIR = path.resolve(__dirname, 'dist');
// const output = path.join(DIST_DIR, 'querytest.sql');

// Connect to database
const db = mysql.createConnection(
    {
      host: 'localhost',
      user: 'root',
      password: '1234',
      database: 'company_db',
    //   messages: [{ value: Buffer.from(JSON.stringify(''))}]
    },
    console.log(`Connected to the company_db database.`),
    // start()
);

db.connect(function(err) {
    if(err) throw err;
    console.log('SQL connected!');

    start();
});

function start() {
    inquirer
        .prompt( [
            {
                type: 'list',
                name: 'start',
                message: 'What would you like to do? (use arrow keys)',
                choices: ['View All Departments', 'View All Roles', 'View All Employees', 'Add Department', 'Add Role', 'Add Employee', 'Update Employee Role', 'Quit']
            }
        ]).then (function(res) {
            switch(res.start) {
                case 'View All Departments':
                    viewAllDepts();
                    break;
                case 'View All Roles':
                    viewAllRoles();
                    break;    
                case 'View All Employees':
                    viewAllEmployees();
                    break;
                case 'Add Department':
                    addDept();
                    break;
                case 'Add Role':
                    addRole();
                    break;
                case 'Add Employee':
                    addEmployee();
                    break;    
                case 'Update Employee Role':
                    updateEmployeeRole();
                    break;
                case 'Quit':
                    console.log('Company database saved!');
                    break;
                default:
                    console.log('default');       
            }
        });

}

function viewAllDepts() {
    db.query('SELECT d.id, d.department_name FROM department d', function(err, results)
    {
        if(err) console.log('error') 
        else console.table(results);
        // console.table(results);
        start();
    })
}

// Still returns NULL values but this db.query does return the right table || Redone the output SQL function to make it work
function viewAllRoles() {
    db.query('SELECT d.id, r.title, d.department_name, r.salary FROM department d, roles r WHERE d.id=r.id', function(err,results)
    {
        if(err) console.log('error') 
        else console.table(results);
        start();
    })
}

function viewAllEmployees() {
    db.query('SELECT d.id, e.first_name, e.last_name, r.title, d.department_name, r.salary, e.manager FROM employees e, roles r, department d WHERE d.id=e.id;', function(err,results){
        if(err) console.log('error') 
        else console.table(results);
        start();
    })
}

function addDept() {
    inquirer
        .prompt( [
            {
                type: 'input',
                name: 'department',
                message: 'Please enter the department name:'
            }
        ]).then ((answer) => {
            db.query(`INSERT INTO department VALUES (DEFAULT, department_name)`, [answer.department], function(err)
            {
                if(err) console.log('error')
                else console.table(answer.department + ' added!');
                start();
            }
            )
        });
}

function addRole() {
    inquirer
        .prompt( [
            {
                type: 'list',
                name: 'department',
                message: 'Please enter the role department:',
                choices: ['Sales', 'Engineering', 'Finance', 'Legal', 'Marketing']
            },
            {
                type: 'input',
                name: 'role',
                message: 'Please enter the role name:'
            },
            {
                type: 'number',
                name: 'salary',
                message: 'Please enter the role salary:'
            },
        ]).then ((answer) => {
            db.query(`INSERT INTO roles VALUES (title, salary, department_id)`, 
            {
                department: answer.department,
                title: answer.role, 
                salary: answer.salary
            }, function(err)
            {
                if(err) console.log('error')
                else console.table(answer.role + ' added!');
                start();
            }
            )
        });
}

function addEmployee() {
    db.query('SELECT * FROM roles', function(err, results) {
    if(err) console.log('error');
    inquirer.prompt([
        {
            name: 'firstName',
            type: 'input',
            message: 'Please enter employee first name:'
        },
        {
            name: 'lastName',
            type: 'input',
            message: 'Please enter employee last name:'
        },
        {
            name: 'role',
            type: 'rawlist',
            choices: function() {
                let choiceArr = [];
                for(i=0; i< results; i++) {
                    choiceArr.push(results[i].title)
                }
                return choiceArr;
            },
            message: 'Are they a manager?'
        },
        {
            name: 'manager',
            type: 'number',
            validate: function(value) {
                if(isNaN(value) === FALSE){
                    return TRUE;
                }
                return FALSE;
                },
            message: 'Enter Manager ID (1 or 0)',
            default: 0
        }
    ])
    .then(function(answer) {
        db.query('INSERT INTO employee VALUES (first_name, last_name, manager)', {
            firstName: answer.firstName,
            lastName: answer.lastName,
            role: answer.role,
            managerId: answer.manager,   
        })
        console.log('Employee Added!');
        start();
    });
});
}

function updateEmployeeRole() {
    db.query('SELECT * FROM employee', function(err, results) {
        if(err) console.log('error');
        inquirer.prompt([

            {
                name: 'choice',
                type: 'rawlist',
                choices: function() {
                    let choiceArr = [];
                    for(i=0; i< results; i++) {
                        choiceArr.push(results[i].last_name)
                    }
                    return choiceArr;
                },
                message: 'Select Employee to update:'
            }
        ])
        .then(function(answer) {
            const saveName = answer.choice;

            db.query('SELECT * FROM employee', function(err, results) {
                if(err) console.log('error');
                inquirer
                    .prompt ([
                    {    
                        name: 'role',
                        type: 'rawlist',
                        choices: function() {
                            let choiceArr = [];
                            for(i=0; i< results; i++) 
                            {
                                choiceArr.push(results[i].roleId)
                            }
                            return choiceArr;
                        }, 
                        message: 'Select title:'
                    },
                    {
                            type: 'number',
                            name: 'manager',
                            validate: function(value) {
                                if(isNaN(value) === FALSE) {
                                    return TRUE;
                                }
                                return FALSE;
                            },
                            message: 'Enter manager ID',
                            default: '0'
                        }
                    ]).then(function(answer){
                        console.log(answer);
                        console.log(saveName);
                        db.query('UPDATE employee SET ? WHERE last_name = ?',
                        [
                            {
                                roldId: answer.role,
                                managerId: answer.manager
                            }, saveName
                        ],
                    ),
                    console.log('Employee Updated!');
                    start();
                });
            })
        })
    })
}