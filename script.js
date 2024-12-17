document.addEventListener("DOMContentLoaded", () => {
    // Load CSV file using PapaParse
    Papa.parse("data.csv", {
        download: true,
        header: true,
        complete: function (results) {
            console.log("CSV Loaded Successfully:", results.data);
            populateCertificationTab(results.data);
        },
        error: function (error) {
            console.error("Error loading CSV file:", error);
        }
    });

    // Set default tab to open
    document.getElementById("defaultTab").click();
});

// Function to populate the Certification tab
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
            td.textContent = row[header];
            tr.appendChild(td);
        });
    });

    certificationTab.innerHTML = ""; // Clear existing content
    certificationTab.appendChild(table);
}

// Tab switching functionality
function openTab(evt, tabName) {
    const tabcontent = document.getElementsByClassName("tabcontent");
    for (let i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }
    const tablinks = document.getElementsByClassName("tablinks");
    for (let i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
    document.getElementById(tabName).style.display = "block";
    evt.currentTarget.className += " active";
}
