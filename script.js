document.addEventListener("DOMContentLoaded", () => {
    // Fetch the CSV data
    fetch('data.csv')
        .then(response => response.text())
        .then(data => {
            const rows = data.split("\n").slice(1); // Skip header
            const parsedData = rows.map(row => {
                const [SrNo, TableName, Dimension, Result] = row.split(",");
                return { SrNo, TableName, Dimension, Result };
            });

            // Populate the Certification tab
            populateCertificationTab(parsedData);
        });
});

// Populate the Certification tab with data
function populateCertificationTab(data) {
    const certificationTab = document.getElementById("Certification");
    const table = document.createElement("table");

    // Add table headers
    const headers = ["SrNo", "TableName", "Dimension", "Result"];
    const thead = table.createTHead();
    const headerRow = thead.insertRow();
    headers.forEach(header => {
        const th = document.createElement("th");
        th.textContent = header;
        headerRow.appendChild(th);
    });

    // Add table rows
    const tbody = table.createTBody();
    data.forEach(row => {
        const tr = tbody.insertRow();
        Object.values(row).forEach(cellData => {
            const td = document.createElement("td");
            td.textContent = cellData;
            tr.appendChild(td);
        });
    });

    certificationTab.appendChild(table);
}
