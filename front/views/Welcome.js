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
        this.cssUrl = '../styles/welcome.css';
    }

    async getHtml() {
        return `
        <div class="containerr">
            <div class="overlay"></div>
            <div class="content">
                <h1 class="headline">
                    <span class="word">FUN</span>
                    <span class="word">MOOD</span>
                    <span class="word">ALL</span>
                    <span class="word">DAY!</span>
                </h1>
                <a href="/login" class="login-link">Start Fight</a>
            </div>
        </div>
        `;
    }

    initialize() {
        loadCSS(this.cssUrl);
    }
}
