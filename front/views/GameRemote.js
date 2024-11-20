import Abstract from './Abstract.js';

export default class GameRemote extends Abstract {
    constructor(params) {
        super(params);
        this.setTitle("Game");
    }

    async getHtml() {
        return `
            <div class="game-container">
                <h1>Game Session</h1>
                <canvas id="gameCanvas"></canvas>
            </div>
        `;
    }

    async runGame(sessionId) {
        console.log("Starting game for session:", sessionId);
        // Add game logic here, e.g., initializing a game engine or WebSocket communication
    }
}
