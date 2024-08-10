import Abstract from './Abstract.js';

function loadCSS(url) {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = url;
    document.head.appendChild(link);
}

export default class Profile extends Abstract {
    constructor(params) {
        super(params);
        this.setTitle("Profile");
        this.cssUrl = '../styles/Profile.css';
    }

    async getHtml() {
        // Retrieve username from localStorage
        const username = localStorage.getItem('username') || 'Guest';

        return `
        <div class="background-container">
            <div class="overlay"></div>
        </div>
        <div class="content">
            <div class="navbar">
                <div class="right">
                    <h2 id="logo">Pong-X</h2>
                </div>
                <div class="left">
                    <div class="notification">
                        <div class="bell"></div>
                        <div class="counter">8</div>
                    </div>
                    <a href="/chat">
                        <div class="img"></div>
                    </a>
                </div>
            </div>
            <div class="body-div">
                <div class="right-div">
                    <div class="upper-div">
                        <div class="container">
                            <div class="mini-container">
                                <div class="img"></div>
                                <h2 id="username">${username}</h2>
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
                                <p>69</p>
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
                                <a href="/chat">Add to friend list</a>
                            </button>
                            <button>
                                <div class="mini-icon2"></div>
                                <a href="/chat">Invite to a game</a>
                            </button>
                            <button>
                                <div class="mini-icon3"></div>
                                <a href="/chat">Send a Message</a>
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
                                    <h3><a href="/">Bhazzout</a></h3>
                                </div>
                                <p>2-0</p>
                            </li>
                            <!-- More recent matches -->
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
