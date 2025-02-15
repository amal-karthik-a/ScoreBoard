let teams = {}; // Object to store team scores and history
let history = []; // Array to store the sequence of scores

// Function to add a new team
function addTeam() {
    let teamNo = document.getElementById("teamNo").value.trim();
    let teamName = document.getElementById("teamName").value.trim();

    if (teamNo === "" || teamName === "" || teams[teamNo]) {
        alert("Enter a valid and unique team number & name.");
        return;
    }

    // Initialize team score and history
    teams[teamNo] = {
        name: teamName,
        total: 0,
        scores: []
    };

    // Update dropdown
    let teamSelect = document.getElementById("teamSelect");
    let option = document.createElement("option");
    option.value = teamNo;
    option.textContent = `${teamNo} - ${teamName}`;
    teamSelect.appendChild(option);

    // Add new column in the scoreboard table
    let headerRow = document.getElementById("headerRow");
    let newHeader = document.createElement("th");
    newHeader.textContent = teamName; // Display only team name
    newHeader.id = `team-${teamNo}`;
    headerRow.appendChild(newHeader);

    // Update total row
    let totalRow = document.getElementById("totalRow");
    let newTotalCell = document.createElement("td");
    newTotalCell.id = `total-${teamNo}`;
    newTotalCell.textContent = "0";
    totalRow.appendChild(newTotalCell);

    // Update the table for existing rows
    let scoreBody = document.getElementById("scoreBody");
    for (let row of scoreBody.children) {
        let newCell = document.createElement("td");
        row.appendChild(newCell);
    }

    document.getElementById("teamNo").value = "";
    document.getElementById("teamName").value = "";
}

// Function to update score
function updateScore() {
    let selectedTeamNo = document.getElementById("teamSelect").value;
    let scoreInput = parseInt(document.getElementById("scoreInput").value);

    if (!selectedTeamNo || isNaN(scoreInput)) {
        alert("Select a team and enter a valid number.");
        return;
    }

    // Update team score
    teams[selectedTeamNo].total += scoreInput;
    teams[selectedTeamNo].scores.push(scoreInput);

    // Update scoreboard table
    updateScoreboard();

    document.getElementById("scoreInput").value = "";
}

// Function to update the scoreboard dynamically
function updateScoreboard() {
    let scoreBody = document.getElementById("scoreBody");
    scoreBody.innerHTML = ""; // Clear table before updating

    // Determine the max number of score entries
    let maxRows = Math.max(...Object.values(teams).map(team => team.scores.length));

    // Fill the table with score history
    for (let i = 0; i < maxRows; i++) {
        let row = document.createElement("tr");

        let indexCell = document.createElement("td");
        indexCell.textContent = i + 1; // History index
        row.appendChild(indexCell);

        for (let teamNo in teams) {
            let scoreCell = document.createElement("td");
            scoreCell.textContent = teams[teamNo].scores[i] !== undefined ? teams[teamNo].scores[i] : "";
            row.appendChild(scoreCell);
        }
        scoreBody.appendChild(row);
    }

    // Update total scores
    for (let teamNo in teams) {
        document.getElementById(`total-${teamNo}`).textContent = teams[teamNo].total;
    }
}
