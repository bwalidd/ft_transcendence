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

        <div class="first-container">
            <div class="content">
                <nav class="navbar navbar-expand-lg " style="height:100px;">
                    <div class="navbar-nav">
                        <a class="nav-link" href="#">
                            <div class="notif"></div>
                        </a>
                        <a class="nav-link" href="#">
                            <div class="search"></div>
                        </a>
                        <a class="nav-link" href="#">
                            <div class="profile-img"></div>
                        </a>
                    </div>
                </nav>

                <div class="bodypage">
                    <div class="side-nav">
                        <div class="logo"></div>
                        <ul>
                            <li>
                                <a href="/">
                                    <img src="../images/sidenav-img/home.png" class="home">
                                    <p>Home</p>
                                </a>
                            </li>
                            <li>
                                <a href="/leaderboard">
                                    <img src="../images/sidenav-img/leaderboard.png" class="home">
                                    <p>Leaderboard</p>
                                </a>
                            </li>
                            <li>
                                <a>
                                    <img src="../images/sidenav-img/trophy.png" class="home">
                                    <p>Tournament</p>
                                </a>
                            </li>
                            <li>
                                <a href="/chat">
                                    <img src="../images/sidenav-img/messages.png" class="home">
                                    <p>Messages</p>
                                </a>
                            </li>
                            <li>
                                <a>
                                    <img src="../images/sidenav-img/settings.png" class="home">
                                    <p>Setting</p>
                                </a>
                            </li>

                        </ul>
                        <div class="sep"></div>
                        <ul>
                            <li>
                                <img src="../images/sidenav-img/logout.png">
                                <p>Logout</p>
                            </li>
                        </ul>
                        <div class="sep"></div>
                        <ul>
                            <li>
                                <img src="../images/sidenav-img/logout.png">
                                <p>Logout</p>
                            </li>
                        </ul>
                    </div>   
                </div>

            </div>
            <div class="fixed-bottom text-right p-4">
                <button type="button" class="btn btn-outline-light">Play</button>
            </div>
        </div>
            

        `;
    }

    initialize() {
        // Any additional initialization code
    }
}
