import { navigate } from '../index.js';
import Abstract from './Abstract.js';

function loadCSS(url) {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = url;
    document.head.appendChild(link);
}

export default class Tournaments extends Abstract {
    constructor(params) {
        loadCSS('../styles/ttt.css');
        super(params);
        this.setTitle("Tournaments");
    }

    async getHtml() {
        return `
        <div class="bodyy">
            <div class="overlay"></div>
            <div class="tournament-container">
                <h1>Create Tournament</h1>
                <div class="form-container">
                    <label for="player1">Player 1:</label>
                    <input type="text" id="player1" placeholder="Enter name of Player 1">
                    
                    <label for="player2">Player 2:</label>
                    <input type="text" id="player2" placeholder="Enter name of Player 2">
                    
                    <label for="player3">Player 3:</label>
                    <input type="text" id="player3" placeholder="Enter name of Player 3">
                    
                    <label for="player4">Player 4:</label>
                    <input type="text" id="player4" placeholder="Enter name of Player 4">
                    
                    <button id="generateTournament">Generate</button>
                </div>
                    <a href="/">Back To Home Page</a>
                
                <div class="tournament-map" id="tournamentMap">
                    <!-- Tournament map will be dynamically added here -->
                </div>
            </div>
        </div>

        `;
    }

    initialize() {
        this.startGame();
    }

    startGame(){
            const button = document.getElementById('generateTournament');
            const mapContainer = document.getElementById('tournamentMap');
        
            button.addEventListener('click', () => {
                const player1 = document.getElementById('player1').value.trim();
                const player2 = document.getElementById('player2').value.trim();
                const player3 = document.getElementById('player3').value.trim();
                const player4 = document.getElementById('player4').value.trim();
        
                if (!player1 || !player2 || !player3 || !player4) {
                    const alertBox = document.createElement('div');
                    alertBox.className = 'custom-alert';
                    alertBox.innerText = 'Please fill all fields!';
                    document.body.appendChild(alertBox);
            
                    // Remove the alert after 3 seconds
                    setTimeout(() => {
                        alertBox.remove();
                    }, 3000);
                    return;
                }
                if (player1 === player2 || player1 === player3 || player1 === player4 || player2 === player3 || player2 === player4 || player3 === player4) {
                    const alertBox = document.createElement('div');
                    alertBox.className = 'custom-alert';
                    alertBox.innerText = 'Players must have unique names!';
                    document.body.appendChild(alertBox);
            
                    // Remove the alert after 3 seconds
                    setTimeout(() => {
                        alertBox.remove();
                    }, 3000);
                    return;
                }

            });
    }
    
}


