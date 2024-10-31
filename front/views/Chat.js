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
        this.socket = null; // This will hold the current socket
        this.currentFriend = null; // Store the currently selected friend
        this.userData = null;
    }

    async getHtml() {
        return `
            <div class="containerr">
                <div class="container-fluid body-content">
                    <div class="side-nav">
                        <div class="logo"></div>
                        <ul>
                            <li><a href="/"><img src="../images/sidenav-img/home.png" class="home"><p>Home</p></a></li>
                            <li><a href="/leaderboard"><img src="../images/sidenav-img/leaderboard.png" class="home"><p>Leaderboard</p></a></li>
                            <li><a><img src="../images/sidenav-img/trophy.png" class="home"><p>Tournament</p></a></li>
                            <li><a href="/chat"><img src="../images/sidenav-img/messages.png" class="home"><p>Messages</p></a></li>
                            <li><a><img src="../images/sidenav-img/settings.png" class="home"><p>Setting</p></a></li>
                        </ul>
                        <div class="sep"></div>
                        <ul>
                            <li><a href="#" id="logout-link"><img src="../images/sidenav-img/logout.png"><p>Logout</p></a></li>
                        </ul>
                    </div>

                    <div class="chat-container">
                        <div class="leftSide">
                            <div class="header">
                                <nav>
                                    <ul class="nav-list">
                                        <li class="nav-item"><button id="discussionTab" class="active">Discussion</button></li>
                                        <li class="nav-item"><button id="friendsTab">Friends</button></li>
                                    </ul>
                                </nav>
                            </div>
                            <div class="content">
                                <div id="discussionContent" class="tab-content active">
                                    <div class="search-chat">
                                        <input type="text" class="search search-icon" placeholder="Search or start new chat">
                                    </div>
                                    <div class="chatlist">
                                        <div class="block active">
                                            <div class="cover" style="background: url(../images/bhazzout.jpeg); background-position: center; background-size: cover;"></div>
                                            <div class="details d-flex flex-column justify-content-between">
                                                <div class="listHead">
                                                    <h5>Wbouwach</h5>
                                                    <p class="time">10:45</p>
                                                </div>
                                                <div class="message"><p>Hello</p></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div id="friendsContent" class="tab-content">
                                    <div class="friend-l"></div>
                                </div>
                            </div>
                        </div>
                        <div class="rightSide">
                            <div class="header d-flex align-items-center justify-content-between">
                                <div class="opened-chat-usename-profile" style="background: url(../images/bhazzout.jpeg); background-position: center; background-size: cover;"></div>
                                <div class="button-wrapper">
                                    <button class="game-button" id="gameButton"><div class="game-ico"></div></button>
                                    <span class="tooltip">Invite to game</span>
                                </div>
                                <div class="opened-chat-username d-flex flex-column justify-content-center" style="position:absolute; left:80px;"><h4>Wbouwach</h4></div>
                                <div class="online d-flex align-items-center" style="position:absolute; right:0; margin:5px; gap:5px"><div class="circle m-1"></div><b>Online</b></div>
                            </div>

                            <div class="chat-box" id="chatBox">
                                <!-- Messages will be appended here -->
                            </div>

                            <div class="message-input">
                                <input type="text" id="messageInput" placeholder="Type a message..." disabled>
                                <button id="sendMsgBtn" class="send-msg-btn" disabled>Send</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    connectWebSocket(friendId) {
        // Close existing socket if there is one
        if (this.socket) {
            this.socket.close();
        }

        // Create a new WebSocket connection for the selected friend
        this.socket = new WebSocket(`ws://localhost:8001/ws/wsc/${this.userData.id}/${friendId}/`);
        this.socket.onopen = () => {
            console.log(`WebSocket connection established with ${friendId}.`);
            document.getElementById('messageInput').disabled = false;
            document.getElementById('sendMsgBtn').disabled = false;
        };

        this.socket.onmessage = (event) => {
            const data = JSON.parse(event.data);
            this.handleIncomingMessage(data);
        };

        this.socket.onclose = () => {
            console.log(`WebSocket connection closed for ${friendId}.`);
            document.getElementById('messageInput').disabled = true;
            document.getElementById('sendMsgBtn').disabled = true;
        };

        this.socket.onerror = (error) => {
            console.error('WebSocket error:', error);
        };
    }

    handleIncomingMessage(data) {
        const { msg } = data;
        const chatBox = document.getElementById('chatBox');
        chatBox.innerHTML += `<div class="message received"><div class="message-content">${msg}</div></div>`;
        chatBox.scrollTop = chatBox.scrollHeight; // Scroll to the bottom
    }

    sendMessages() {
        const sendMsgBtn = document.getElementById('sendMsgBtn');
        sendMsgBtn.addEventListener('click', () => {
            const messageInput = document.getElementById('messageInput');
            const message = messageInput.value.trim();
    
            if (message && this.socket) {
                this.socket.send(JSON.stringify({ msg: message }));
                const chatBox = document.getElementById('chatBox');
                chatBox.innerHTML += `<div class="message sent"><div class="message-content">${message}</div></div>`;
                messageInput.value = ''; // Clear the input field
                chatBox.scrollTop = chatBox.scrollHeight; // Scroll to the bottom
            } else {
                alert('Please enter a message or connect to a friend.');
            }
        });
    }
    

    async getCsrfToken() {
        const name = 'csrftoken=';
        const cookies = document.cookie.split(';');
        for (let cookie of cookies) {
            cookie = cookie.trim();
            if (cookie.indexOf(name) === 0) {
                return cookie.substring(name.length);
            }
        }
        return null;
    }

    async fetchUserData() {
        try {
            const csrfToken = await this.getCsrfToken();
            const response = await fetch('http://localhost:8001/api/auth/user/', {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
                    'Content-Type': 'application/json',
                    'X-CSRFToken': csrfToken
                }
            });

            if (!response.ok) {
                const errorDetails = await response.text();
                throw new Error(`Failed to fetch user data: ${response.status} ${response.statusText} - ${errorDetails}`);
            }

            this.userData = await response.json();
            console.log('User data:', this.userData);
            this.populateFriends(this.userData.friends);
        } catch (error) {
            console.error('Error fetching user data:', error);
        }
    }

    async populateFriends(friends) {
        const friendsList = document.querySelector('.friend-l');
        friendsList.innerHTML = ''; // Clear any existing content

        if (friends.length === 0) {
            friendsList.innerHTML = '<p>No friends found.</p>'; // Message if no friends
            return;
        }

        friends.forEach(friend => {
            const friendBlock = document.createElement('div');
            friendBlock.classList.add('friend-block');

            friendBlock.innerHTML = `
                <div class="cover" style="background: url(http://localhost:8001${friend.avatar}); background-position: center; background-size: cover;"></div>
                <div class="details d-flex justify-content-between">
                    <div class="listHead">
                        <h5>${friend.username}</h5>
                    </div>
                </div>
            `;

            friendBlock.addEventListener('click', () => {
                this.displaySelectedFriend(friend);
            });

            friendsList.appendChild(friendBlock);
        });
    }

    async displaySelectedFriend(friend) {
        console.log('Selected friend:', friend);
        const username = document.querySelector('.opened-chat-username h4');
        username.textContent = friend.username;
        const profile = document.querySelector('.opened-chat-usename-profile');
        profile.style.background = `url(http://localhost:8001${friend.avatar})`;
        profile.style.backgroundPosition = 'center';
        profile.style.backgroundSize = 'cover';
    
        // Clear the chat box when switching friends
        const chatBox = document.getElementById('chatBox');
        chatBox.innerHTML = ''; // Clear previous messages
    
        this.currentFriend = friend;
        await this.loadChatHistory(friend.id); // Load chat history before connecting WebSocket
        this.connectWebSocket(friend.id); // Assuming friend has an id property
    }
    
    async loadChatHistory(friendId) {
        try {
            const response = await fetch(`http://localhost:8001/api/chats/messages/${this.userData.id}/${friendId}/`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
                    'Content-Type': 'application/json'
                }
            });
    
            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(`Failed to load chat history: ${errorText}`);
            }
    
            const data = await response.json(); // Get the complete response object
            console.log('API Response:', data); // Log the response for debugging
    
            // Check if messages is an array within the data object
            if (!Array.isArray(data.messages)) {
                console.error('Expected messages to be an array, but got:', data.messages);
                return; // Exit the function if it's not an array
            }
    
            const chatBox = document.getElementById('chatBox');
            chatBox.innerHTML = ''; // Clear existing messages before appending new ones
    
            data.messages.forEach(msg => {
                console.log('Message Object:', msg); // Log the individual message object for further inspection
    
                // Update the properties based on the actual structure
                const messageClass = msg.sender === this.userData.id ? 'sent' : 'received';
                const messageContent = msg.message || ''; // Use msg.message for content
    
                chatBox.innerHTML += `
                    <div class="message ${messageClass}">
                        <div class="message-content">${messageContent}</div>
                    </div>
                `;
            });
            chatBox.scrollTop = chatBox.scrollHeight; // Scroll to the bottom to show latest messages
        } catch (error) {
            console.error('Error loading chat history:', error);
        }
    }
    
    
    
    

    initialize() {
        const chatContainer = document.querySelector('.chat-container');
        chatContainer.addEventListener('click', (e) => {
            if (e.target.id === 'discussionTab') {
                this.setActiveTab(e.target, document.getElementById('discussionContent'));
            } else if (e.target.id === 'friendsTab') {
                this.setActiveTab(e.target, document.getElementById('friendsContent'));
            }
        });
        this.fetchUserData();
        this.sendMessages(); // Make sure to call sendMessages
    }

    setActiveTab(tab, content) {
        document.querySelectorAll('.nav-item button, .tab-content').forEach(el => el.classList.remove('active'));
        tab.classList.add('active');
        content.classList.add('active');
    }

    async logoutUser() {
        try {
            const csrfToken = await this.getCsrfToken();
            const response = await fetch('http://localhost:8001/api/auth/logout/', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
                    'Content-Type': 'application/json',
                    'X-CSRFToken': csrfToken
                },
                credentials: 'include'
            });

            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(`Logout failed: ${errorText}`);
            }
        } catch (error) {
            console.error('Error during logout:', error);
        }
    }
}
