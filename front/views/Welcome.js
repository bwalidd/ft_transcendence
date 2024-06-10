import Abstract from './Abstract.js';

function loadCSS(url) {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = url;
    document.head.appendChild(link);
}

export default class Welcome extends Abstract {
    constructor(params) {
        super(params);
        this.setTitle("Welcome");
        loadCSS('../styles/welcome.css');
    }

    async getHtml() {
        return `
        <div class="containerr">

        <div class="overlay"></div>

        <div class="content">
            <h1>Pong-X</h1>
            <a href="#">Sign in with Intra 42</a>
        </div>
        </div>
        `;
    }

    initialize() {
        // Any additional initialization code
    }
}
