import Abstract from './Abstract.js';

function loadCSS(url) {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = url;
    document.head.appendChild(link);
}

export default class Home extends Abstract {
    constructor(params) {
        super(params);
        this.setTitle("Home");
        loadCSS('../styles/home.css');
    }

    async getHtml() {
        return `
        <div class="nav-bar">
        <div class="logo">
            <img src="../images/pongx.png" alt="logoooooo" width="300px" height="200px">
        </div>
            <div class="nav-icon">
                <i class="fa-solid fa-magnifying-glass glass" style="color:#ffffff;"></i>
                <i class="fa-solid fa-bars" style="color:#ffffff;"></i>
            </div>
        </div>
        <div class="hero">
            <div class="hero-content">
                <h1>PONG-X</h1>
                <h3>About PONG-X</h3>
                <p>
                    FT_Transcendence is a project from the 42 programming school curriculum that involves building a sophisticated web application. This project is designed to help students deepen their understanding of full-stack web development, combining front-end and back-end technologies to create a complete, functional web application.
                </p>
                <button>
                </button>
                <h3>ivii Networks</h3>
            </div>
            <div class=""hero-image>
                <img src="../images/hero.png">
            </div>
        </div>
        `;
    }

    initialize() {
        // Any additional initialization code
    }
}
