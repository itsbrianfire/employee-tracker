// test server js DO NOT USE FOR APPLICATION
const mysql = require('mysql2');
const questions = require('inquirer');
const fs = require('fs');
const path = require('path');
const app = express();


const DIST_DIR = path.resolve(__dirname, 'dist');
const output = path.join(DIST_DIR, 'querytest.sql');

// Connect to database
const db = mysql.createConnection(
    {
      host: 'localhost',
      user: 'root',
      password: '1234',
      database: 'company_db'
    },
    console.log(`Connected to the company_db database.`)
);

const promptUser = () => {
    return questions.prompt([
      {
        type: 'list',
        name: 'management',
        message: 'What would you like to do? (use arrow keys)',
        choices: ['View All Departments', 'View All Roles', 'View All Employees', 'Add Department', 'Add Role', 'Add Employee', 'Update Employee Role', 'Quit'],
        // default: 0
      },
      {
        type: 'list',
        name: 'add_department',
        message: 'What would you like to do? (use arrow keys)',
        choices: ['View All Departments', 'View All Roles', 'View All Employees', 'Add Department', 'Add Role', 'Add Employee', 'Update Employee Role', 'Quit'],
        // default: 0
      }
    ])
.then((answers) => {
const data = generateSQL(answers);
fs.writeFile('./db/query2.sql', data, (err) => {
    if (err) {return console.log(err);}
    console.log("Success!")
})
})};

const init = () => {
promptUser()
    .then((answers) => fs.writeFileSync('./db/query2.sql', generateSQL(answers)))
    .then(() => console.log('Success!'))
    .catch((err) => console.error(err));
};      

init();

// _________________________________________________________________________________

const department = require('./lib/department');
const employee = require('./lib/employee');
const role = require('./lib/role');

const team = [];

function addDepartment() {

  function department() {
    inquirer.prompt([
      {
        type: 'input',
        name: 'departmentName',
        message: `Please enter department's name:`,
      }
    ])

      .then((answers) => {
        const department = new department(answers.departmentName);
        team.push(department);
        createTeam();
    });
  }}
  
addDepartment();


function addRole() {

  function role() {
    inquirer.prompt([
        {
          type: 'input',
          message: `Please enter name of role:`,
          name: 'roleName',
         }
    ])

      .then((answers) => {
        const role = new role(answers.roleName);
        team.push(role);
        createTeam();
    });
  }}
 
addRole();  

function addEmployee() {

  function employee() {
    inquirer
      .prompt([
        {
          type: 'input',
           message: `Please enter employee's first name:`,
           name: 'employeeFirstName',
        },
        {
          type: 'input',
          name: 'employeeLastName',
          message: `Please enter employee's last name:`
        },
        {
            type: 'list',
            message: 'Is this employee a Manager?',
            name: 'memberChoice',
            choices: ['Yes', 'No']
          }
      ])
      .then((answers) => {
        const employee = new employee(answers.employeeFirstName, answers.employeeLastName, answers.memberChoice);
        team.push(employee);
        createTeam();
      });
  }

//   function generateSQL(){
//     fs.writeFileSync(output, template(team), "utf-8");
//   }
//   department();
}

addEmployee();

// app.post('querytest2.sql', ({ body }, res) => {
//     const sql = `INSERT INTO department (department_name)
//       VALUES (?)`;
//     const params = [body.movie_name];
    
//     db.query(sql, params, (err, result) => {
//       if (err) {
//         res.status(400).json({ error: err.message });
//         return;
//       }
//       res.json({
//         message: 'success',
//         data: body
//       });
//     });
//   });

// app.use((req, res) => {
// res.status(404).end();
// });
app.get('', (req,res) => {
    res.render('home');
});
// app.listen(PORT, () => {
// console.log(`Server running on port ${PORT}`);
// });