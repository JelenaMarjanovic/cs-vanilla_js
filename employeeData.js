// Path to the fake API
const API_PATH = "https://randomuser.me/api";

// Store for fetched data
let employees = [];

// Invoke API calls, e.g. five times
for (let i = 0; i < 5; i++) {
  fetchEmployee(API_PATH);
}

// Generate a random salary in the given range rounded to 2 decimals
function randomSalary(min, max) {
  return (Math.random() * (max - min) + min).toFixed(2);
}

// Fetch Random People using Async/Await
async function fetchEmployee(path) {
  const result = await fetch(path);

  const data = await result.json();

  const employeeData = data.results[0];

  const employee = {
    name: `${employeeData.name.first} ${employeeData.name.last}`,
    salary: randomSalary(50000, 500000)
  };

  console.log(employee);
}
