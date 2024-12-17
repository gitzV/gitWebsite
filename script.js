let fullData = [];

document.addEventListener("DOMContentLoaded", () => {
    // Load CSV file using PapaParse
    Papa.parse("data.csv", {
        download: true,
        header: true,
        complete: function (results) {
            console.log("CSV Loaded Successfully:", results.data);
            fullData = results.data; // Save the full data for later use
            populateCertificationTab(fullData); // Populate the table initially
        },
        error: function (error) {
            console.error("Error loading CSV file:", error);
        }
    });

    // Set default tab to open
    document.getElementById("defaultTab").click();
});

// Function to populate the Certification tab with data
function populateCertificationTab(data) {
    const tableContainer = document.getElementById("tableContainer");
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

    tableContainer.innerHTML = ""; // Clear existing content
    tableContainer.appendChild(table);
}

// Function to search data by TableName or any matching text in any column
function searchData() {
    const searchInput = document.getElementById("searchInput").value.toLowerCase();
    if (!searchInput) {
        // If search box is empty, display the full table
        populateCertificationTab(fullData);
        return;
    }

    const filteredData = fullData.filter(row => {
        // Check if any column value contains the search input
        return Object.values(row).some(value =>
            value.toString().toLowerCase().includes(searchInput)
        );
    });

    if (filteredData.length > 0) {
        populateCertificationTab(filteredData); // Display filtered data
    } else {
        // Display "No data found" if no matches
        const tableContainer = document.getElementById("tableContainer");
        tableContainer.innerHTML = `<p style="color: red; font-weight: bold;">No matching data found</p>`;
    }
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
