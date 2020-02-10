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

// Format salary as currency string
function formatAsCurrency(amount) {
  return `${amount.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,")} RSD`;
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

// Update DOM
function updateDOM(data = employees) {
  // Clear previous content
  mainContent.innerHTML = "<h2>Employee Salary</h2>";

  // Show updated content
  data.forEach(employee => {
    const el = document.createElement("div");
    el.classList.add("employee");
    el.innerHTML = `${employee.name} ${formatAsCurrency(employee.salary)}`;

    mainContent.appendChild(el);
  });
}

// Add new employee
function addEmployee(employee) {
  employees.push(employee);

  updateDOM();
}

// Calculate gross income - approximately with coefficient 1.65
function grossIncome() {
  employees = employees.map(employee => {
    return {
      ...employee,
      salary: employee.salary * 1.65
    };
  });

  updateDOM();
}

// Show only salaries higher than 100,000.00 RSD
function sixDigitsSalaries() {
  employees = employees.filter(employee => employee.salary >= 100000.0);

  updateDOM();
}

// Sort employees by salary in descending order
function sortInDescending() {
  employees = employees.sort((e1, e2) => e2.salary - e1.salary);

  updateDOM();
}

// Calculate average salary
function averageSalary() {
  const total = employees.reduce(
    (acc, employee) => (acc += employee.salary),
    0
  );

  const average = total / employees.length;

  const avgSalary = document.createElement("div");
  avgSalary.innerHTML = `<h3><strong>Average salary: ${formatAsCurrency(
    average
  )}</strong></h3>`;
  mainContent.appendChild(avgSalary);
}

// Get all needed DOM elements
const addBtn = document.getElementById("add_employee");
const grossBtn = document.getElementById("gross_income");
const highSalaryBtn = document.getElementById("six_digits");
const sortBtn = document.getElementById("sort_descending");
const averageBtn = document.getElementById("average_salary");
const mainContent = document.getElementById("content");

// Buttons' event listeners
addBtn.addEventListener("click", fetchEmployee);
grossBtn.addEventListener("click", grossIncome);
highSalaryBtn.addEventListener("click", sixDigitsSalaries);
sortBtn.addEventListener("click", sortInDescending);
averageBtn.addEventListener("click", averageSalary);
