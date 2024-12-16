document.addEventListener("DOMContentLoaded", () => {
    const tableBody = document.querySelector("#data-table tbody");

    fetch("data.csv")
        .then(response => response.text())
        .then(data => {
            const rows = data.split("\n").slice(1); // Remove header
            rows.forEach(row => {
                if (row.trim()) {
                    const cols = row.split(",");
                    const tr = document.createElement("tr");
                    cols.forEach(col => {
                        const td = document.createElement("td");
                        td.textContent = col;
                        tr.appendChild(td);
                    });
                    tableBody.appendChild(tr);
                }
            });
        })
        .catch(error => console.error("Error loading data:", error));
});
