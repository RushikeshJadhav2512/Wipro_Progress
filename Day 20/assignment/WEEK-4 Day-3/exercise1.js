// ============================================
// Exercise 1: Fetch API - Get Employee Data
// ============================================
// This program fetches data from a JSON endpoint and displays it on console

// Function to fetch employee data
function fetchEmployeeData() {
    console.log("Fetching employee data...");
    
    // Using Fetch API to get data from the endpoint
    fetch("https://dummy.restapiexample.com/api/v1/employees")
        .then(function(response) {
            // Check if response is OK
            if (!response.ok) {
                throw new Error("HTTP error! Status: " + response.status);
            }
            // Convert response to JSON
            return response.json();
        })
        .then(function(data) {
            // Display the data on console
            console.log("Employee Data Retrieved Successfully!");
            console.log("=====================================");
            console.log(data);
            console.log("=====================================");
            console.log("Total employees: " + (data.data ? data.data.length : 0));
            
            // Display each employee
            if (data.data && Array.isArray(data.data)) {
                console.log("\nEmployee List:");
                data.data.forEach(function(employee, index) {
                    console.log((index + 1) + ". " + employee.employee_name + 
                                " - Salary: $" + employee.employee_salary);
                });
            }
        })
        .catch(function(error) {
            // Handle any errors
            console.error("Error fetching data:", error);
        });
}

// Call the function to fetch data
fetchEmployeeData();

