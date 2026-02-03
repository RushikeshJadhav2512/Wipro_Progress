// Student Result Calculator

document.getElementById('resultForm').addEventListener('submit', calculateResult);

function calculateResult(event) {
    event.preventDefault();

    // Get input values
    const studentName = document.getElementById('studentName').value;
    const maths = parseInt(document.getElementById('maths').value);
    const science = parseInt(document.getElementById('science').value);
    const english = parseInt(document.getElementById('english').value);

    // Validate inputs
    if (isNaN(maths) || isNaN(science) || isNaN(english)) {
        alert('Please enter valid marks for all subjects');
        return;
    }

    // Calculate total and average
    const total = maths + science + english;
    const average = total / 3;

    // Determine pass/fail (minimum 40% to pass)
    const result = average >= 40 ? 'PASS' : 'FAIL';

    // Display results
    displayResults(studentName, total, average, result);

    // Console output as per original code
    console.log('Student Name: ' + studentName.toUpperCase());
    console.log('Total Marks: ' + total);
    console.log('Result: ' + result.toLowerCase());
}

function displayResults(name, total, average, result) {
    const resultContainer = document.getElementById('result');
    const nameDisplay = document.getElementById('studentNameDisplay');
    const totalDisplay = document.getElementById('totalMarks');
    const averageDisplay = document.getElementById('averageMarks');
    const finalResult = document.getElementById('finalResult');

    nameDisplay.textContent = `Student Name: ${name}`;
    totalDisplay.textContent = `Total Marks: ${total} / 300`;
    averageDisplay.textContent = `Average: ${average.toFixed(2)}%`;
    
    finalResult.textContent = `Result: ${result}`;
    finalResult.className = result === 'PASS' ? 'pass' : 'fail';

    resultContainer.style.display = 'block';
}

