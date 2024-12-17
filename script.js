document.addEventListener("DOMContentLoaded", () => {
    fetch('data.csv')
        .then(response => response.text())
        .then(data => {
            const rows = data.split("\n").slice(1); // Skip header
            const parsedData = rows.map(row => {
                const [SrNo, TableName, Dimension, Result] = row.split(",");
                return { SrNo, TableName, Dimension, Result };
            });

            populateCertificationGraph(parsedData);
            populateCertificationTable(parsedData);
            populateQualityGraph(parsedData);
        });
});

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

function populateCertificationGraph(data) {
    const tableNames = [...new Set(data.map(row => row.TableName))];
    const counts = tableNames.map(name =>
        data.filter(row => row.TableName === name && row.Result.trim() === "Passed").length
    );

    const trace = {
        x: tableNames,
        y: counts,
        type: "bar"
    };

    const layout = {
        title: "Certification Results",
        xaxis: { title: "Table Names" },
        yaxis: { title: "Passed Dimensions" }
    };

    Plotly.newPlot('certification-graph', [trace], layout);
}

function populateCertificationTable(data) {
    const tableBody = document.getElementById("certification-table").getElementsByTagName("tbody")[0];

    data.forEach(row => {
        const tr = document.createElement("tr");
        Object.values(row).forEach(value => {
            const td = document.createElement("td");
            td.textContent = value.trim();
            tr.appendChild(td);
        });
        tableBody.appendChild(tr);
    });
}

function populateQualityGraph(data) {
    const dimensions = [...new Set(data.map(row => row.Dimension))];
    const counts = dimensions.map(dim =>
        data.filter(row => row.Dimension === dim && row.Result.trim() === "Passed").length
    );

    const trace = {
        labels: dimensions,
        values: counts,
        type: "pie"
    };

    const layout = {
        title: "Quality Results"
    };

    Plotly.newPlot('quality-graph', [trace], layout);
}
