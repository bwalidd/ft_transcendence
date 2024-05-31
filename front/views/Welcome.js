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
            <div class="container">
                <div class="box">
                    <div class="right-div">
                        <img src="../images/ponglogo.png" alt="bg-logo">
                        </div>
                        <div class="left-div">
                        <div class="container-horizontal">
                            <h1 class="title">JOIN THE BATTLE</h1>
                            <button class="signup-btn">Sign Up with your Intra 42</button>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    initialize() {
        // Any additional initialization code
    }
}
