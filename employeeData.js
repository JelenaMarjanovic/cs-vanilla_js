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
  return (Math.random() * (max - min) + min).toFixed(2);
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
}

// Add new employee
function addEmployee(employee) {
  employees.push(employee);
}

// Get all needed DOM elements
const addBtn = document.getElementById("add_employee");

// Buttons' event listeners
addBtn.addEventListener("click", fetchEmployee);
