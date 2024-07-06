import Abstract from './Abstract.js';

function loadCSS(url) {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = url;
    document.head.appendChild(link);
}

export default class Landing extends Abstract {
    constructor(params) {
        super(params);
        this.setTitle("Landing");
        loadCSS('../styles/Signup.css');
    }

    async getHtml() {
        return `
        <div class="first-container">
            <h1>Signup</h1>
        </div>
        
        `;
    }

    initialize() {
        // Any additional initialization code
    }
}
