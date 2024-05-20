import Abstract from './Abstract.js';

function loadCSS(url) {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = url;
    document.head.appendChild(link);
}

export class Welcome extends Abstract {
    constructor(params) {
        super(params);
        this.setTitle("Welcome");
        loadCSS('../styles/welcome.css');  // Adjust the path as necessary
    }

    async getHtml() {
        return `
            <div class="container">
                <h1>hiiii</h1>
                <h1>hiiii</h1>
                <h1>hiiii</h1>
                <h1>hiiii</h1>
            </div>
        `;
    }

    initialize() {
        // Any additional initialization code
    }
}
