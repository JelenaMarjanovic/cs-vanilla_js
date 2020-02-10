// Path to the fake API
const API_PATH = "https://randomuser.me/api";

// Store for fetched data
let employees = [];

// Invoke API calls, e.g. five times
for (let i = 0; i < 5; i++) {
  fetchEmployee(API_PATH);
}

// Fetch Random People using Async/Await
async function fetchEmployee(path) {
  const result = await fetch(path);

  const data = await result.json();

  const employeeData = data.results[0];

  const employee = {
    name: `${employeeData.name.first} ${employeeData.name.last}`
  };

  console.log(employee);
}
