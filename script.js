const API_KEY = 'your_api_key_here';
const MATCH_ID = 'match_id_here';

// Define player names for each team
const playerNames = {
    team1: ["Player 1 (SEN)", "Player 2 (SEN)", "Player 3 (SEN)", "Player 4 (SEN)", "Player 5 (SEN)"],
    team2: ["Player 6 (FNC)", "Player 7 (FNC)", "Player 8 (FNC)", "Player 9 (FNC)", "Player 10 (FNC)"],
};

// Define team names
const teamNames = {
    team1: "SEN",
    team2: "FNC",
};

function fetchData() {
    fetch(`https://api.riotgames.com/valorant/match/v1/matches/${MATCH_ID}`, {
        headers: {
            'X-Riot-Token': API_KEY
        }
    })
        .then(response => response.json())
        .then(data => updateOverlay(data))
        .catch(error => console.error('Error fetching data:', error));
}

function updateOverlay(matchData) {
    if (matchData) {
        const team1AgentsElement = document.getElementById('team1-agents');
        const team2AgentsElement = document.getElementById('team2-agents');

        // Clear previous agent data
        team1AgentsElement.innerHTML = '';
        team2AgentsElement.innerHTML = '';

        // Display agents for each team
        matchData.players.forEach(player => {
            const playerName = playerNames[player.teamId][player.playerId - 1] || `Player ${player.playerId}`;
            const abilities = player.abilities.map(ability => ability.name).join(' '); // Get abilities as a string
            const economy = player.economy; // Assuming economy is a property of player object
            const agentElement = document.createElement('div');
            agentElement.classList.add('agent');
            agentElement.innerHTML = `<div class="player-name">${playerName}</div>
                                      <div class="player-details">Abilities: ${abilities} | Economy: $${economy}</div>`;

            if (player.teamId === matchData.teams[0].teamId) {
                team1AgentsElement.appendChild(agentElement);
            } else {
                team2AgentsElement.appendChild(agentElement);
            }
        });
    } else {
        console.error('No match data available');
    }
}

// Fetch data initially and set interval to fetch data periodically
fetchData();
setInterval(fetchData, 5000); // Fetch data every 5 seconds (adjust as needed)
