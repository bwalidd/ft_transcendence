import Abstract from './Abstract.js';

function loadCSS(url) {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = url;
    document.head.appendChild(link);
}

export class Profile extends Abstract {
    constructor(params) {
        super(params);
        this.setTitle("Profile");
        loadCSS('../styles/profile.css');
    }

    async getHtml() {
        return `
        <div class="background-container">
        <div class="overlay"></div>
    </div>
    <div class="content">
        <div class="navbar">
            <div class="right">
                <h2>Pong-X</h2>
            </div>
            <div class="left">
                <h3><a href="/">bhazzout</a></h3>
                <div class="img"></div>
            </div>
        </div>
        <div class="body-div">
            <div class="right-div">
                <div class="upper-div">
                    <div class="container">
                        <div class="mini-container">
                            <div class="img"></div>
                            <h2>bhazzout</h2>
                        </div>
                        <div class="stats">
                            <h1>67%</h1>
                            <h3>Win Rate</h3>
                        </div>
                    </div>
                    <div class="container lower-container">
                        <div class="total-matches">
                            <h4>Total Matches</h4>
                            <p>100</p>
                        </div>
                        <div class="wins">
                            <h4>Wins</h4>
                            <p>67</p>
                        </div>
                        <div class="loss">
                            <h4>Loss</h4>
                            <p>33</p>
                        </div>
                    </div>
                </div>
                <div class="lower-div">
                    <div class="lower-container">
                        <button>
                            <div class="mini-icon"></div>
                            Add to friend list
                        </button>
                        <button>
                            <div class="mini-icon2"></div>
                            Invite to a game
                        </button>
                        <button>
                            <div class="mini-icon3"></div>
                            Send a message
                        </button>
                    </div>
                </div>
            </div>
            <div class="left-div">
                <div class="left-container">
                    <h1>Recent Matches</h1>
                    <ul>
                        <li class="win-or-loss">
                            <div>
                                <div class="img"></div>
                                <h3>Bhazzout</h3>
                            </div>
                            <p>2-0</p>
                        </li>
                        <li class="win-or-loss">
                            <div>
                                <div class="img"></div>
                                <h3>Bhazzout</h3>
                            </div>
                            <p>2-0</p>
                        </li>
                        <li class="win-or-loss">
                            <div>
                                <div class="img"></div>
                                <h3>Bhazzout</h3>
                            </div>
                            <p>2-0</p>
                        </li>
                        <li class="win-or-loss">
                            <div>
                                <div class="img"></div>
                                <h3>Bhazzout</h3>
                            </div>
                            <p>2-0</p>
                        </li>
                        <li class="win-or-loss">
                            <div>
                                <div class="img"></div>
                                <h3>Bhazzout</h3>
                            </div>
                            <p>2-0</p>
                        </li>
                    </ul>
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
