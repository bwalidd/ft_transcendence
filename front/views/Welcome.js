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
            <div class="our-logo">
            </div>
            <div>
                <p class="quoate-p">
                Life is like a game of ping pong. The more you play, the better you get. Enjoy every rally and embrace the challenge!
                </p>
            </div>
            <button class="login-btn">Sign in With Intra 42</button>
        </div>
        </div>
        `;
    }

    initialize() {
        // Any additional initialization code
    }
}
