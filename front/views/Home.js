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
        <header>
            <h1>PONG-X</h1>
        </header>

        <div class="container container-fluid d-flex justify-content-center align-items-center">
            <div class="welcome-message">
                Welcome to PONG-X
            </div>
        </div>

        <a href="#about" class="about-link">About</a>
        `;
    }

    initialize() {
        // Any additional initialization code
    }
}
