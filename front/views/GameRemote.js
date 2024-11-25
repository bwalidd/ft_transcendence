import { navigate } from '../index.js';
import Abstract from './Abstract.js';

function loadCSS(url) {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = url;
    document.head.appendChild(link);
}

export default class GameRemote extends Abstract {
    constructor(params) {
        super(params);
        loadCSS('../styles/GameRemote.css');
        this.setTitle("Friendly Match");
        this.currentPlayer = null;
        this.currentUsername = null;
        this.leftuser = null;
        this.gameCanvas = null;
        this.ctx = null;
        this.player1 = null;
        this.player2 = null;
        this.ball = null;
        this.ws = null;
    }

    async getHtml() {
        return `
        <div class="informations">
            <div class="right-div">
                <div id="my-username-avatar" class="avatar"></div>
                <h2 id="my-username">Logged username</h2>
            </div>
            <div class="left-div">
                <h2 id="friend-username">Friend username</h2>
                <div id="friend-username-avatar" class="avatar"></div>
            </div>
        </div>
        <div class="game-header">
            <button class="game-instruction" id="game-instruction">Back to Home page</button>
        </div>
        <div class="game-container">
            <canvas id="pong" class="container" width="800" height="400"></canvas>
        </div>
        `;
    }

    async getCsrfToken() {
        const name = 'csrftoken=';
        const cookies = document.cookie.split(';');
        for (let cookie of cookies) {
            cookie = cookie.trim();
            if (cookie.indexOf(name) === 0) {
                return cookie.substring(name.length);
            }
        }
        return null;
    }

    async initialize() {
        this.leftuser = null;
        try {
            const sessionId = localStorage.getItem("currentSessionId");
            console.log("Session ID from localStorage:", sessionId);

            if (sessionId) {
                await this.initializeGameSession(sessionId);
            } else {
                console.error("No sessionId found in localStorage.");
            }
            this.setupGameEnvironment();
        } catch (error) {
            console.error("Error during initialization:", error);
        }
    }

    async initializeGameSession(sessionId) {
        try {
            const csrfToken = await this.getCsrfToken();
            const response = await fetch(`http://localhost:8001/api/game/details/${sessionId}/`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
                    'Content-Type': 'application/json',
                    'X-CSRFToken': csrfToken
                },
                credentials: 'include'
            });
    
            if (!response.ok) {
                throw new Error('Failed to fetch game session details');
            }
    
            const data = await response.json();
            console.log('Game session details:', data);
    
            // Fetch and display user info for both players
            await this.fetchAndDisplayUserInfo(data.player_one, "my-username");
            await this.fetchAndDisplayUserInfo(data.player_two, "friend-username");
    
            // Ensure the inviter (player_one) is on the left side
            const myUsername = localStorage.getItem('my-username');
            const friendUsername = localStorage.getItem('friend-username');
    
            this.leftuser = document.getElementById('my-username').textContent;
    
            // Ensure checkWhoLoggedIn finishes before setting currentPlayer
            this.currentUsername = await this.checkWhoLoggedIn();
            console.log('Current user is:------->', this.currentUsername);
            console.log('Left user is:------->', this.leftuser);
    
            if (this.currentUsername === this.leftuser) {
                this.currentPlayer = 'player_one';
                console.log('Current player is player_one');
            } else {
                this.currentPlayer = 'player_two';
                console.log('Current player is player_two');
            }
            
        } catch (error) {
            console.error("Error in initializeGameSession:", error);
            throw error;
        }
    }
    
    
    async checkWhoLoggedIn() {
        try{
            const csrfToken = await this.getCsrfToken();
            const response = await fetch('http://localhost:8001/api/auth/user/', {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
                    'Content-Type': 'application/json',
                    'X-CSRFToken': csrfToken
                },
                credentials: 'include'
            });
            
            const data = await response.json();
    
            return data.username;
        }catch (error) {
            console.error("Error in checkWhoLoggedIn:", error);
        }

    }

    async fetchAndDisplayUserInfo(username, elementId) {
        try {
            const csrfToken = await this.getCsrfToken();
            const response = await fetch(`http://localhost:8001/api/auth/user/${username}/`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
                    'Content-Type': 'application/json',
                    'X-CSRFToken': csrfToken
                },
                credentials: 'include'
            });

            if (!response.ok) {
                throw new Error('Failed to fetch user profile');
            }

            const data = await response.json();
            document.getElementById(elementId).textContent = data.username;

            const userAvatar = data.avatar || '/default-avatar.png';
            console.log('User avatar:', userAvatar);

            if (elementId === "my-username") {
                localStorage.setItem('my-username', data.username);
            } else if (elementId === "friend-username") {
                localStorage.setItem('friend-username', data.username);
            }

            document.getElementById(`${elementId}-avatar`).style.backgroundImage = `url('http://localhost:8001${userAvatar}')`;
        } catch (error) {
            console.error(`Error in fetchAndDisplayUserInfo for ${elementId}:`, error);
            throw error;
        }
    }

    setupGameEnvironment() {
        this.gameCanvas = document.querySelector("#pong");
        this.ctx = this.gameCanvas.getContext("2d");

        // Game Variables
        const PLAYER_WIDTH = 10, PLAYER_HEIGHT = 100, BALL_RADIUS = 10;
        this.player1 = { x: 0, y: this.gameCanvas.height / 2 - PLAYER_HEIGHT / 2, width: PLAYER_WIDTH, height: PLAYER_HEIGHT, color: 'white' };
        this.player2 = { x: this.gameCanvas.width - PLAYER_WIDTH, y: this.gameCanvas.height / 2 - PLAYER_HEIGHT / 2, width: PLAYER_WIDTH, height: PLAYER_HEIGHT, color: 'white' };
        this.ball = { x: this.gameCanvas.width / 2, y: this.gameCanvas.height / 2, radius: BALL_RADIUS, velocityX: 5, velocityY: 5, color: 'white' };

        // Focus the canvas to ensure key events work
        this.gameCanvas.addEventListener('click', () => {
            this.gameCanvas.focus();
        });

        this.initializeWebSocket();
    }

    initializeWebSocket() {
        const sessionId = localStorage.getItem("currentSessionId");
        this.ws = new WebSocket(`ws://localhost:8001/ws/game/${sessionId}/`);
        
        this.ws.onopen = () => {
            console.log('Connected to WebSocket');
            // Send initial state with player identification
            this.ws.send(JSON.stringify({
                action: "initial_state",
                player: this.currentPlayer,
                paddle_y: this.currentPlayer === 'player_one' ? this.player1.y : this.player2.y
            }));
        };
    
        this.ws.onmessage = (event) => {
            const data = JSON.parse(event.data);
            console.log("Received game update:", data);
            
            // Update only the relevant player's paddle
            if (data.action === "update") {
                if (data.data.player === "player_one" && this.currentPlayer !== "player_one") {
                    this.player1.y = data.data.paddle_y;  // Update player one's paddle
                }
                if (data.data.player === "player_two" && this.currentPlayer !== "player_two") {
                    this.player2.y = data.data.paddle_y;  // Update player two's paddle
                }
                
                if (data.data.ball) {
                    Object.assign(this.ball, data.data.ball);  // Update ball position
                }
    
                this.render();  // Re-render the game state
            }
        };
    
        this.setupControls();  // Set up the paddle controls
        this.render();  // Initial render
    }

    render() {
        this.ctx.clearRect(0, 0, this.gameCanvas.width, this.gameCanvas.height);
    
        // Draw paddles
        this.ctx.fillStyle = this.player1.color;
        this.ctx.fillRect(this.player1.x, this.player1.y, this.player1.width, this.player1.height);
    
        this.ctx.fillStyle = this.player2.color;
        this.ctx.fillRect(this.player2.x, this.player2.y, this.player2.width, this.player2.height);
    
        // Draw ball
        this.ctx.fillStyle = this.ball.color;
        this.ctx.beginPath();
        this.ctx.arc(this.ball.x, this.ball.y, this.ball.radius, 0, Math.PI * 2);
        this.ctx.fill();
    }

    setupControls() {
        document.addEventListener('keydown', (event) => {
            let paddleMove = false;
            let newY = 0;

            if (this.currentPlayer === 'player_one') {
                if (event.key === "w" && this.player1.y > 0) {
                    this.player1.y -= 10;
                    paddleMove = true;
                    newY = this.player1.y;
                }
                if (event.key === "s" && this.player1.y < this.gameCanvas.height - this.player1.height) {
                    this.player1.y += 10;
                    paddleMove = true;
                    newY = this.player1.y;
                }
            } else if (this.currentPlayer === 'player_two') {
                if (event.key === "ArrowUp" && this.player2.y > 0) {
                    this.player2.y -= 10;
                    paddleMove = true;
                    newY = this.player2.y;
                }
                if (event.key === "ArrowDown" && this.player2.y < this.gameCanvas.height - this.player2.height) {
                    this.player2.y += 10;
                    paddleMove = true;
                    newY = this.player2.y;
                }
            }

            if (paddleMove) {
                console.log('Sending paddle move to WebSocket:', newY);
                this.ws.send(JSON.stringify({
                    action: "paddle_move",
                    player: this.currentPlayer,  // Ensure the correct player identifier
                    paddle_y: newY
                }));
                this.render();  // Re-render game state after paddle move
            }
        });
    }
}
