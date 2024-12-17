document.addEventListener("DOMContentLoaded", () => {
    // Use PapaParse to parse the CSV file
    Papa.parse("data.csv", {
        download: true,
        header: true,
        complete: function (results) {
            const data = results.data; // Parsed data as an array of objects
            populateCertificationTab(data);
        },
        error: function (error) {
            console.error("Error loading CSV file:", error);
        }
    });
});

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
        headers.forEach(header => {
            const td = document.createElement("td");
            td.textContent = row[header]; // Match header with object key
            tr.appendChild(td);
        });
    });

    certificationTab.appendChild(table);
}
