// US-13: Variables and functions
const tableBody = document.getElementById("userTable");
const loadBtn = document.getElementById("loadBtn");

// US-14: DOM event handling
loadBtn.addEventListener("click", loadUsers);

// US-15: Fetch API with error handling
function loadUsers() {
    fetch("https://jsonplaceholder.typicode.com/users")
        .then(response => {
            if (!response.ok) {
                throw new Error("Network error");
            }
            return response.json();
        })
        .then(data => {
            tableBody.innerHTML = "";

            // US-13: Loop usage
            data.slice(0, 5).forEach(user => {
                const row = document.createElement("tr");

                row.innerHTML = `
                    <td>${user.id}</td>
                    <td>${user.name}</td>
                    <td>Active</td>
                `;

                // US-14: DOM manipulation
                tableBody.appendChild(row);
            });
        })
        .catch(error => {
            alert("Failed to load data");
            console.error(error);
        });
}

// US-12: Bootstrap form validation logic
(() => {
    const forms = document.querySelectorAll('.needs-validation');

    forms.forEach(form => {
        form.addEventListener('submit', event => {
            if (!form.checkValidity()) {
                event.preventDefault();
                event.stopPropagation();
            }
            form.classList.add('was-validated');
        });
    });
})();