import { navigate } from '../index.js';
import Abstract from './Abstract.js';

function loadCSS(url) {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = url;
    document.head.appendChild(link);
}

export default class GameAi extends Abstract {
    constructor(params) {
        loadCSS('../styles/LocalMatch.css');
        super(params);
        this.setTitle("Friendly Match");
    }

    async getHtml() {
        return `
        <div class="game-header">
            <button class="game-instruction" id="game-instruction">Back to Home page</button>
        </div>
        <div class="game-container">
            <canvas id="pong" class="container" width="600" height="500"></canvas>
        </div>
        `;
    }


    async initialize() {
        const canvas = document.querySelector("#pong");
        const ctx = canvas.getContext("2d");

        // Game variables
        const SCORE_LIMIT = 3;
        const PLAYER_HEIGHT = 100;
        const PLAYER_WIDTH = 20;
        const BALL_START_SPEED = 1;
        const SPEED_INCREMENT_INTERVAL = 10000; // Increase speed every 10 seconds
        const SPEED_INCREMENT_AMOUNT = 0.2;

        let gameOver = false;

        canvas.width = 800; 
        canvas.height = 400;

        const net = {
            x: canvas.width / 2 - 1,
            y: 0,
            width: 2,
            height: 10,
            color: "RED",
        };

        const player1 = {
            x: 0,
            y: canvas.height / 2 - PLAYER_HEIGHT / 2,
            width: PLAYER_WIDTH,
            height: PLAYER_HEIGHT,
            color: "RED",
            score: 0,
        };

        const player2 = {
            x: canvas.width - PLAYER_WIDTH,
            y: canvas.height / 2 - PLAYER_HEIGHT / 2,
            width: PLAYER_WIDTH,
            height: PLAYER_HEIGHT,
            color: "BLUE",
            score: 0,
        };

        const ball = {
            x: canvas.width / 2,
            y: canvas.height / 2,
            radius: 10,
            speed: BALL_START_SPEED,
            velocityX: 5,
            velocityY: 5,
            color: "GREEN",
        };

        function Rectdraw(x, y, w, h, color) {
            ctx.fillStyle = color;
            ctx.fillRect(x, y, w, h);
        }

        function Circledraw(x, y, r, color) {
            ctx.fillStyle = color;
            ctx.beginPath();
            ctx.arc(x, y, r, 0, Math.PI * 2, false);
            ctx.closePath();
            ctx.fill();
        }

        function Textdraw(text, x, y, color) {
            ctx.fillStyle = color;
            ctx.font = "45px Arial";
            ctx.fillText(text, x, y);
        }

        function Netdraw() {
            for (let i = 0; i <= canvas.height; i += 15) {
                Rectdraw(net.x, net.y + i, net.width, net.height, net.color);
            }
        }

        function collision(b, p) {
            return (
                b.x + b.radius > p.x &&
                b.x - b.radius < p.x + p.width &&
                b.y + b.radius > p.y &&
                b.y - b.radius < p.y + p.height
            );
        }

        function lerp(start, end, amount) {
            return (1 - amount) * start + amount * end;
        }

        function gameover() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.fillStyle = "antiquewhite";
            ctx.font = "50px diablo";
            ctx.textAlign = "center";
            const winner = player1.score >= SCORE_LIMIT ? "Player 1" : "Player 2";
            ctx.fillText(`${winner} Wins!`, canvas.width / 2, canvas.height / 2);
        }

        function render() {
            if (gameOver) {
                gameover();
                return;
            }

            ctx.clearRect(0, 0, canvas.width, canvas.height);
            Rectdraw(0, 0, canvas.width, canvas.height, "#000");
            Netdraw();
            Textdraw(player1.score, canvas.width / 4.5, canvas.height / 5, "RED");
            Textdraw(player2.score, (3 * canvas.width) / 4, canvas.height / 5, "BLUE");
            Rectdraw(player1.x, player1.y, player1.width, player1.height, player1.color);
            Rectdraw(player2.x, player2.y, player2.width, player2.height, player2.color);
            Circledraw(ball.x, ball.y, ball.radius, ball.color);
        }

        function Update() {
            if (player1.score >= SCORE_LIMIT || player2.score >= SCORE_LIMIT) {
                gameOver = true;
            }

            ball.x += ball.velocityX * ball.speed;
            ball.y += ball.velocityY * ball.speed;

            if (ball.y + ball.radius > canvas.height || ball.y - ball.radius < 0) {
                ball.velocityY = -ball.velocityY;
            }

            const selectedPlayer = ball.x < canvas.width / 2 ? player1 : player2;
            if (collision(ball, selectedPlayer)) {
                ball.velocityX = -ball.velocityX;
            }

            if (ball.x - ball.radius < 0) {
                player2.score++;
                resetBall();
            } else if (ball.x + ball.radius > canvas.width) {
                player1.score++;
                resetBall();
            }
        }

        function resetBall() {
            ball.x = canvas.width / 2;
            ball.y = canvas.height / 2;
            ball.velocityX = -ball.velocityX;
            ball.speed = BALL_START_SPEED;
        }

        function game() {
            Update();
            render();
        }

        // Speed up the ball every SPEED_INCREMENT_INTERVAL
        setInterval(() => {
            if (!gameOver) {
                ball.speed += SPEED_INCREMENT_AMOUNT;
            }
        }, SPEED_INCREMENT_INTERVAL);

        const FPS = 60;
        setInterval(game, 1000 / FPS);

        // Player controls
        window.addEventListener("keydown", (event) => {
            switch (event.key) {
                case "ArrowUp":
                    player2.y = Math.max(player2.y - 20, 0);
                    break;
                case "ArrowDown":
                    player2.y = Math.min(player2.y + 20, canvas.height - player2.height);
                    break;
                case "w":
                    player1.y = Math.max(player1.y - 20, 0);
                    break;
                case "s":
                    player1.y = Math.min(player1.y + 20, canvas.height - player1.height);
                    break;
            }
        });

        document.getElementById("game-instruction").addEventListener("click", function () {
            navigate('/home');
        });
    }

}
