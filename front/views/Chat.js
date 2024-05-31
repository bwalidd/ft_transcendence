import Abstract from './Abstract.js';

function loadCSS(url) {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = url;
    document.head.appendChild(link);
}

export default class Chat extends Abstract {
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
                    <div class="profile-pic"></div>
                </div>
            </div>
        </div>
        <div class="page-body">
            <div class="right-div">
                <div class="messages-container">
                    <h2>Discussion</h2>
                    <div class="input">
                        <input type="text" placeholder="Search a friend...">
                        <div></div>
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
                                        <div class="photo-msg"></div>
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
                                        <div class="photo-msg"></div>
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
                                        <div class="photo-msg"></div>
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
                                        <div class="photo-msg"></div>
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
                                        <div class="photo-msg"></div>
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
                                        <div class="photo-msg"></div>
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
                                        <div class="photo-msg"></div>
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
                                        <div class="photo-msg"></div>
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
                <div class="chat-box">
                    <div class="chat-header">
                        <div class="first-div">
                            <div class="img-div">
                                <div class="photo-chat"></div>
                            </div>
                            <div class="chat-person-details">
                                <h3>username</h3>
                                <p>Online</p>
                            </div>
                        </div>
                        <div>
                            <div>
                                <img class="threepoints-img" src="../images/threepoints.png" alt="menu">
                            </div>
                        </div>
                    </div>
                    <div class="chat-content">
                        <ul>
                            <li>
                                <div class="other-msg">
                                    <div class="photo-msg"></div>
                                    <div class="msg">
                                        <p>msg msg msg msg msg msg msg msg msg</p>
                                    </div>
                                </div>
                            </li>
                            
                            <li>
                                <div class="other-msg">
                                    <div class="photo-msg"></div>
                                    <div class="msg">
                                        <p>msg msg msg msg msg msg msg msg msg</p>
                                    </div>
                                </div>
                            </li>
                            
                            <li>
                                <div class="other-msg">
                                    <div class="photo-msg"></div>
                                    <div class="msg">
                                        <p>msg msg msg msg msg msg msg msg msg</p>
                                    </div>
                                </div>
                            </li>
                            
                            <li>
                                <div class="other-msg">
                                    <div class="photo-msg"></div>
                                    <div class="msg">
                                        <p>msg msg msg msg msg msg msg msg msg</p>
                                    </div>
                                </div>
                            </li>
                            
                            <li>
                                <div class="other-msg">
                                    <div class="photo-msg"></div>
                                    <div class="msg">
                                        <p>msg msg msg msg msg msg msg msg msg</p>
                                    </div>
                                </div>
                            </li>
                            
                            <li>
                                <div class="other-msg">
                                    <div class="photo-msg"></div>
                                    <div class="msg">
                                        <p>msg msg msg msg msg msg msg msg msg</p>
                                    </div>
                                </div>
                            </li>
                            
                            <li>
                                <div class="other-msg">
                                    <div class="photo-msg"></div>
                                    <div class="msg">
                                        <p>msg msg msg msg msg msg msg msg msg</p>
                                    </div>
                                </div>
                            </li>
                            
                            <li>
                                <div class="other-msg">
                                    <div class="photo-msg"></div>
                                    <div class="msg">
                                        <p>msg msg msg msg msg msg msg msg msg</p>
                                    </div>
                                </div>
                            </li>
                            
                            <li>
                                <div class="my-msg">
                                    <div class="photo-msg"></div>
                                    <div class="msg">
                                        <p>msg msg msg msg msg msg msg msg msg</p>
                                    </div>
                                </div>
                            </li>
                            
                            <li>
                                <div class="my-msg">
                                    <div class="photo-msg"></div>
                                    <div class="msg">
                                        <p>msg msg msg msg msg msg msg msg msg</p>
                                    </div>
                                </div>
                            </li>
                            
                            <li>
                                <div class="my-msg">
                                    <div class="photo-msg"></div>
                                    <div class="msg">
                                        <p>msg msg msg msg msg msg msg msg msg</p>
                                    </div>
                                </div>
                            </li>
                            
                            <li>
                                <div class="other-msg">
                                    <div class="photo-msg"></div>
                                    <div class="msg">
                                        <p>msg msg msg msg msg msg msg msg msg</p>
                                    </div>
                                </div>
                            </li>
                            
                            <li>
                                <div class="other-msg">
                                    <div class="photo-msg"></div>
                                    <div class="msg">
                                    <p>msg msg msg msg msg msg msg msg msg
                                    msg msg msg msg msg msg msg msg msg
                                    msg msg msg msg msg msg msg msg msg
                                    msg msg msg msg msg msg msg msg msg
                                    msg msg msg msg msg msg msg msg msg
                                    msg msg msg msg msg msg msg msg msg
                                    msg msg msg msg msg msg msg msg msg
                                    msg msg msg msg msg msg msg msg msg
                                    msg msg msg msg msg msg msg msg msg
                                    msg msg msg msg msg msg msg msg msg
                                    msg msg msg msg msg msg msg msg msg
                                    </p>
                                    </div>
                                </div>
                            </li>
                            
                            <li>
                                <div class="my-msg">
                                    <div class="photo-msg"></div>
                                    <div class="msg">
                                        <p>msg msg msg msg msg msg msg msg msg
                                        msg msg msg msg msg msg msg msg msg
                                        msg msg msg msg msg msg msg msg msg
                                        msg msg msg msg msg msg msg msg msg
                                        msg msg msg msg msg msg msg msg msg
                                        msg msg msg msg msg msg msg msg msg
                                        msg msg msg msg msg msg msg msg msg
                                        msg msg msg msg msg msg msg msg msg
                                        msg msg msg msg msg msg msg msg msg
                                        msg msg msg msg msg msg msg msg msg
                                        msg msg msg msg msg msg msg msg msg
                                        </p>
                                    </div>
                                </div>
                            </li>
                            
                            <li>
                                <div class="other-msg">
                                    <div class="photo-msg"></div>
                                    <div class="msg">
                                        <p>msg msg msg msg msg msg msg msg msg</p>
                                    </div>
                                </div>
                            </li>
                            
                            <li>
                                <div class="other-msg">
                                    <div class="photo-msg"></div>
                                    <div class="msg">
                                        <p>msg msg msg msg msg msg msg msg msg</p>
                                    </div>
                                </div>
                            </li>
                            
                            <li>
                                <div class="other-msg">
                                    <div class="photo-msg"></div>
                                    <div class="msg">
                                        <p>msg msg msg msg msg msg msg msg msg</p>
                                    </div>
                                </div>
                            </li>
                            
                            <li>
                                <div class="other-msg">
                                    <div class="photo-msg"></div>
                                    <div class="msg">
                                        <p>msg msg msg msg msg msg msg msg msg</p>
                                    </div>
                                </div>
                            </li>
                            
                            <li>
                                <div class="other-msg">
                                    <div class="photo-msg"></div>
                                    <div class="msg">
                                        <p>msg msg msg msg msg msg msg msg msg</p>
                                    </div>
                                </div>
                            </li>
                            
                            <li>
                                <div class="other-msg">
                                    <div class="photo-msg"></div>
                                    <div class="msg">
                                        <p>msg msg msg msg msg msg msg msg msg</p>
                                    </div>
                                </div>
                            </li>
                            
                            <li>
                                <div class="other-msg">
                                    <div class="photo-msg"></div>
                                    <div class="msg">
                                        <p>msg msg msg msg msg msg msg msg msg</p>
                                    </div>
                                </div>
                            </li>
                            
                            <li>
                                <div class="other-msg">
                                    <div class="photo-msg"></div>
                                    <div class="msg">
                                        <p>msg msg msg msg msg msg msg msg msg</p>
                                    </div>
                                </div>
                            </li>
                            
                        </ul>
                    </div>
                    <div class="chat-input">
                        <input type="text" placeholder="Type a message...">
                        <button>Send</button>
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
