document.addEventListener("DOMContentLoaded", () => {
    const tableBody = document.querySelector("#data-table tbody");
    const searchInput = document.getElementById("search-input");

    fetch("data.csv")
        .then(response => response.text())
        .then(data => {
            const rows = data.split("\n").slice(1); // Exclude header
            rows.forEach(row => {
                if (row.trim()) {
                    const cols = row.split(",");
                    const tr = document.createElement("tr");
                    cols.forEach((col, index) => {
                        const td = document.createElement("td");
                        td.textContent = col.trim();
                        if (index === 3) {
                            // Add icons to the "Result" column
                            td.innerHTML = col.trim() === "Passed" 
                                ? `${col} <i class="fas fa-check-circle" style="color:green;"></i>` 
                                : `${col} <i class="fas fa-times-circle" style="color:red;"></i>`;
                        }
                        tr.appendChild(td);
                    });
                    tableBody.appendChild(tr);
                }
            });

            // Add search/filter functionality
            searchInput.addEventListener("input", () => {
                const filter = searchInput.value.toLowerCase();
                const rows = tableBody.querySelectorAll("tr");
                rows.forEach(row => {
                    const cells = row.querySelectorAll("td");
                    const matches = Array.from(cells).some(cell => cell.textContent.toLowerCase().includes(filter));
                    row.style.display = matches ? "" : "none";
                });
            });
        })
        .catch(error => console.error("Error loading data:", error));
});
