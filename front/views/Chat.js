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
            <div class="containerr">
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

                <div class="container-fluid body-content">
                    <div class="side-nav">
                        <div class="logo"></div>
                        <ul>
                            <li> <img src="../images/sidenav-img/home.png" class="home"><p>Home</p></li>
                            <li> <img src="../images/sidenav-img/leaderboard.png" class="home"><p>Leaderboard</p></li>
                            <li> <img src="../images/sidenav-img/trophy.png" class="home"><p>Tournament</p></li>
                            <li> <img src="../images/sidenav-img/messages.png" class="home"><p>Messages</p></li>
                            <li> <img src="../images/sidenav-img/settings.png" class="home"><p>Setting</p></li>
                        </ul>
                        <div class="sep"></div>
                        <ul>
                            <li>
                                <img src="../images/sidenav-img/logout.png">
                                <p>Logout</p>
                            </li>
                        </ul>
                    </div>

                    <div class="chat-container">
                        <div class="leftSide ">
                            <div class="header ">
                                <nav>
                                    <ul class="nav-list">
                                        <li class="nav-item"><button id="discussionTab" class="active">Discussion</button></li>
                                        <li class="nav-item"><button id="friendsTab">Friends</button></li>
                                    </ul>
                                </nav>
                            </div>
                            <div class="content">
                                <div id="discussionContent" class="tab-content active">
                                    <div class="search-chat ">
                                        <input type="text" class="search search-icon" placeholder="Search or start new chat">
                                    </div>
                                    <div class="chatlist ">
                                        <div class="block active">
                                            <div class="cover" style="background: url(../images/bhazzout.jpeg); background-position: center; background-size: cover;">
                                            </div>
                                            <div class="details  d-flex flex-column justify-content-between">
                                                <div class="listHead">
                                                    <h5> Wbouwach </h5>
                                                    <p class="time"> 10:45 </p>
                                                </div>
                                                <div class="message">
                                                    <p>Hello,kkkkkkkkkkkkkkkkkkfdfd dfdfdjkkdkfdkfkdkfkdkkkkk</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="block">
                                            <div class="cover" style="background: url(../images/bhazzout.jpeg); background-position: center; background-size: cover;">
                                            </div>
                                            <div class="details  d-flex flex-column justify-content-between">
                                                <div class="listHead">
                                                    <h5> Wbouwach </h5>
                                                    <p class="time"> 10:45 </p>
                                                </div>
                                                <div class="message">
                                                    <p>Hello,kkkkkkkkkkkkkkkkkkfdfd dfdfdjkkdkfdkfkdkfkdkkkkk</p>
                                                    <b>1</b>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="block">
                                            <div class="cover" style="background: url(../images/bhazzout.jpeg); background-position: center; background-size: cover;">
                                            </div>
                                            <div class="details  d-flex flex-column justify-content-between">
                                                <div class="listHead">
                                                    <h5> Wbouwach </h5>
                                                    <p class="time"> 10:45 </p>
                                                </div>
                                                <div class="message">
                                                    <p>Hello,kkkkkkkkkkkkkkkkkkfdfd dfdfdjkkdkfdkfkdkfkdkkkkk</p>
                                                    <b>1</b>
                                                </div>
                                            </div>
                                        </div>
                                        
                                        <div class="block">
                                            <div class="cover" style="background: url(../images/bhazzout.jpeg); background-position: center; background-size: cover;">
                                            </div>
                                            <div class="details  d-flex flex-column justify-content-between">
                                                <div class="listHead">
                                                    <h5> Wbouwach </h5>
                                                    <p class="time"> 10:45 </p>
                                                </div>
                                                <div class="message">
                                                    <p>Hello,kkkkkkkkkkkkkkkkkkfdfd dfdfdjkkdkfdkfkdkfkdkkkkk</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="block">
                                            <div class="cover" style="background: url(../images/bhazzout.jpeg); background-position: center; background-size: cover;">
                                            </div>
                                            <div class="details  d-flex flex-column justify-content-between">
                                                <div class="listHead">
                                                    <h5> Wbouwach </h5>
                                                    <p class="time"> 10:45 </p>
                                                </div>
                                                <div class="message">
                                                    <p>Hello,kkkkkkkkkkkkkkkkkkfdfd dfdfdjkkdkfdkfkdkfkdkkkkk</p>
                                                    <b>1</b>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="block">
                                            <div class="cover" style="background: url(../images/bhazzout.jpeg); background-position: center; background-size: cover;">
                                            </div>
                                            <div class="details  d-flex flex-column justify-content-between">
                                                <div class="listHead">
                                                    <h5> Wbouwach </h5>
                                                    <p class="time"> 10:45 </p>
                                                </div>
                                                <div class="message">
                                                    <p>Hello,kkkkkkkkkkkkkkkkkkfdfd dfdfdjkkdkfdkfkdkfkdkkkkk</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="block">
                                            <div class="cover" style="background: url(../images/bhazzout.jpeg); background-position: center; background-size: cover;">
                                            </div>
                                            <div class="details  d-flex flex-column justify-content-between">
                                                <div class="listHead">
                                                    <h5> Wbouwach </h5>
                                                    <p class="time"> 10:45 </p>
                                                </div>
                                                <div class="message">
                                                    <p>Hello,kkkkkkkkkkkkkkkkkkfdfd dfdfdjkkdkfdkfkdkfkdkkkkk</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="block">
                                            <div class="cover" style="background: url(../images/bhazzout.jpeg); background-position: center; background-size: cover;">
                                            </div>
                                            <div class="details  d-flex flex-column justify-content-between">
                                                <div class="listHead">
                                                    <h5> Wbouwach </h5>
                                                    <p class="time"> 10:45 </p>
                                                </div>
                                                <div class="message">
                                                    <p>Hello,kkkkkkkkkkkkkkkkkkfdfd dfdfdjkkdkfdkfkdkfkdkkkkk</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="block">
                                            <div class="cover" style="background: url(../images/bhazzout.jpeg); background-position: center; background-size: cover;">
                                            </div>
                                            <div class="details  d-flex flex-column justify-content-between">
                                                <div class="listHead">
                                                    <h5> Wbouwach </h5>
                                                    <p class="time"> 10:45 </p>
                                                </div>
                                                <div class="message">
                                                    <p>Hello,kkkkkkkkkkkkkkkkkkfdfd dfdfdjkkdkfdkfkdkfkdkkkkk</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="block">
                                            <div class="cover" style="background: url(../images/bhazzout.jpeg); background-position: center; background-size: cover;">
                                            </div>
                                            <div class="details  d-flex flex-column justify-content-between">
                                                <div class="listHead">
                                                    <h5> Wbouwach </h5>
                                                    <p class="time"> 10:45 </p>
                                                </div>
                                                <div class="message">
                                                    <p>Hello,kkkkkkkkkkkkkkkkkkfdfd dfdfdjkkdkfdkfkdkfkdkkkkk</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="block">
                                            <div class="cover" style="background: url(../images/bhazzout.jpeg); background-position: center; background-size: cover;">
                                            </div>
                                            <div class="details  d-flex flex-column justify-content-between">
                                                <div class="listHead">
                                                    <h5> Wbouwach </h5>
                                                    <p class="time"> 10:45 </p>
                                                </div>
                                                <div class="message">
                                                    <p>Hello,kkkkkkkkkkkkkkkkkkfdfd dfdfdjkkdkfdkfkdkfkdkkkkk</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div id="friendsContent" class="tab-content">
                                    <div class="friend-block">
                                        <div class="cover" style="background: url(../images/bhazzout.jpeg); background-position: center; background-size: cover;">
                                        </div>
                                        <div class="details d-flex justify-content-between">
                                            <div class="listHead">
                                                <h5> Wbouwach </h5>
                                                <div class="message-icon" style="background: url(../images/sidenav-img/messages.png); background-position: center; background-size: cover;">
                                                </div>
                                                <div class="game-message">
                                                    
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="rightSide">
                            <div class="header d-flex align-items-center justify-content-between">
                                <div class="cover" style="background: url(../images/bhazzout.jpeg); background-position: center; background-size: cover;">
                                </div>

                                <div class="button-wrapper">
                                    <button class="game-button" id="gameButton">
                                        <div class="game-ico"></div>
                                    </button>
                                    <span class="tooltip">Invite to game</span>
                                </div>

                                <div class="name-stat d-flex flex-column justify-content-center" style="position:absolute; left:80px; padding:5px 5px;">
                                    <h4> Wbouwach </h4>
                                </div>
                                
                                <div class="online d-flex align-items-center" style="position:absolute; right:0; margin:5px; gap:5px">
                                    <div class="circle m-1"></div>
                                    <b> Online </b>
                                </div>
                            </div>

                            <div class="chat-box">
                                <div class="message received">
                                    <div class="message-content">Hey Wbouwach! How's it going?</div>
                                </div>
                                <div class="message sent">
                                    <div class="message-content">Hi there! I'm doing great, thanks for asking. How about you?</div>
                                </div>
                                <div class="message received">
                                    <div class="message-content">I'm good too! I was wondering if you'd like to play a game together?</div>
                                </div>
                                <div class="message sent">
                                    <div class="message-content">Sure, that sounds fun! What game did you have in mind?</div>
                                </div>
                                <div class="message received">
                                    <div class="message-content">How about a quick round of chess?</div>
                                </div>
                                <div class="message sent">
                                    <div class="message-content">Perfect! I'm always up for chess. Let's do it!</div>
                                </div>
                                <div class="message received">
                                    <div class="message-content">Hey Wbouwach! How's it going?</div>
                                </div>
                                <div class="message sent">
                                    <div class="message-content">Hi there! I'm doing great, thanks for asking. How about you?</div>
                                </div>
                                <div class="message received">
                                    <div class="message-content">I'm good too! I was wondering if you'd like to play a game together?</div>
                                </div>
                                <div class="message sent">
                                    <div class="message-content">Sure, that sounds fun! What game did you have in mind?</div>
                                </div>
                                <div class="message received">
                                    <div class="message-content">How about a quick round of chess?</div>
                                </div>
                                <div class="message sent">
                                    <div class="message-content">Perfect! I'm always up for chess. Let's do it!</div>
                                </div>
                                <div class="message received">
                                    <div class="message-content">Hey Wbouwachkdsfjsdkhfhjhgjfhjhgjhfjjhjfhjhfjfhjfhfjfjfhfjhfjfhjifnlgkdgdgkdfgjdlgkjdlfkgjldfkgjfjdshkfjdshkfjhsdkfjshdkfjshdkfjdshkjfhskdjfhksdjfhkjsdhfkjsdhfkjsdkhfjsdhfkjshkfjshdkfjshkdfjshkfdjshkdf! How's it going?</div>
                                </div>
                                <div class="message sent">
                                    <div class="message-content">Hi there! I'm doing great, thanks for asking. How about you?</div>
                                </div>
                                <div class="message received">
                                    <div class="message-content">I'm good too! I was wondering if you'd like to play a game together?</div>
                                </div>
                                <div class="message sent">
                                    <div class="message-content">Sure, that sounds fun! What game did you have in mind?</div>
                                </div>
                                <div class="message received">
                                    <div class="message-content">How about a quick round of chess?</div>
                                </div>
                                <div class="message sent">
                                    <div class="message-content">Perfect! I'm always up for chess. Let's do it!</div>
                                </div>
                            </div>

                            <div class="message-input">
                                <input type="text" placeholder="Type a message...">
                                <button>Send</button>
                            </div>
                        </div>
                    </div>
            </div>
      `;
    }

    initialize() {
        // This assumes the chat container is always in the DOM
        const chatContainer = document.querySelector('.chat-container');
        chatContainer.addEventListener('click', (e) => {
            if (e.target.id === 'discussionTab') {
                this.setActiveTab(e.target, document.getElementById('discussionContent'));
            } else if (e.target.id === 'friendsTab') {
                this.setActiveTab(e.target, document.getElementById('friendsContent'));
            }
        });
    }
    
    setActiveTab(tab, content) {
        document.querySelectorAll('.nav-item button, .tab-content').forEach(el => el.classList.remove('active'));
        tab.classList.add('active');
        content.classList.add('active');
    }
}
