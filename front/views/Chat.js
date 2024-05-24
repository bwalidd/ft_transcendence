import Abstract from './Abstract.js';

function loadCSS(url) {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = url;
    document.head.appendChild(link);
}

export class Chat extends Abstract {
    constructor(params) {
        super(params);
        this.setTitle("Chat");
        loadCSS('../styles/chat.css');
    }

    async getHtml() {
        return `
            <div class="container">
                <div>
                    <div class="navbar">
                        <div class="right">
                            <h2>Pong-X</h2>
                        </div>
                        <div class="left">
                            <h3><a href="/">wbouwach</a></h3>
                            <img class="profile-photo "src="../images/ponglogo.png">
                        </div>
                    </div>
                <div>
                <div class="page-body">
                    <div class="right-div">
                        <div class="messages-container">
                            <h2>Discussion</h2>
                            <div class="input">
                                <input type="text" placeholder="Search a friend...">
                                <div></div>
                            </div>
                            <div class="channels">
                                <h1>Channels</h1>
                                <button class="btn-channel">+</button>
                            </div>
                            <div class="channel">
                                <ul class="list">
                                   <li><a href="/">#General</a></li>
                                   <li><a href="/">#Random</a></li>
                                   <li><a href="/">#Tournaments</a></li>
                                </ul>
                            </div>
                            <div class="chats">
                                <h1>Direct messages</h1>
                                <div></div>
                            </div>
                            <div class="channel">
                                <ul class="list-friend">
                                   <li>
                                        <div class="left-div">
                                            <div class="img-div">
                                                <img src="../images/ponglogo.png">
                                            </div>
                                            <div class="friend-name">
                                                <h4>username</h4>
                                                <p class="last-msg">msg</p>
                                            </div>
                                        </div>
                                        <div class="right-div">
                                                <p>18:30</p>
                                        </div>
                                   </li>
                                   <li>
                                        <div class="left-div">
                                            <div class="img-div">
                                                <img src="../images/ponglogo.png">
                                            </div>
                                            <div class="friend-name">
                                                <h4>username</h4>
                                                <p class="last-msg">msg</p>
                                            </div>
                                        </div>
                                        <div class="right-div">
                                                <p>18:30</p>
                                        </div>
                                   </li>
                                   <li>
                                        <div class="left-div">
                                            <div class="img-div">
                                                <img src="../images/ponglogo.png">
                                            </div>
                                            <div class="friend-name">
                                                <h4>username</h4>
                                                <p class="last-msg">msg</p>
                                            </div>
                                        </div>
                                        <div class="right-div">
                                                <p>18:30</p>
                                        </div>
                                   </li>
                                </ul> 
                            </div>
                        </div>
                    </div>
                    <div class="left-div">
                        <div class="first-div">
                            <div class="nomsg">
                                <p>
                                    Pick a person from the left menu
                                    and start a conversation
                                </p>
                            </div>
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
