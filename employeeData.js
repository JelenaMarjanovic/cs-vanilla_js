// Path to the fake API
const API_PATH = "https://randomuser.me/api";

// Store for fetched data
let employees = [];

// Invoke API calls, e.g. five times
for (let i = 0; i < 5; i++) {
  fetchEmployee();
}

// Generate a random salary in the given range rounded to 2 decimals
function randomSalary(min, max) {
  return Math.random() * (max - min) + min;
}

// Fetch Random People using Async/Await
async function fetchEmployee() {
  const result = await fetch(API_PATH);

  const data = await result.json();

  const employeeData = data.results[0];

  const employee = {
    name: `${employeeData.name.first} ${employeeData.name.last}`,
    salary: randomSalary(50000, 500000)
  };

  addEmployee(employee);
  console.log(employees);
}

// Add new employee
function addEmployee(employee) {
  employees.push(employee);
}

// Calculate gross income - approximately with coefficient 1.65
function grossIncome() {
  employees = employees.map(employee => {
    return {
      ...employee,
      salary: employee.salary * 1.65
    };
  });

  console.log(employees);
}

// Show only salaries higher than 100,000.00 RSD
function sixDigitsSalaries() {
  employees = employees.filter(employee => employee.salary >= 100000.0);

  console.log(employees);
}

// Get all needed DOM elements
const addBtn = document.getElementById("add_employee");
const grossBtn = document.getElementById("gross_income");
const highSalaryBtn = document.getElementById("six_digits");

// Buttons' event listeners
addBtn.addEventListener("click", fetchEmployee);
grossBtn.addEventListener("click", grossIncome);
highSalaryBtn.addEventListener("click", sixDigitsSalaries);
