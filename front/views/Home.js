import Abstract from './Abstract.js';
import { fetchUserData } from './authutils.js';

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
        const user = await fetchUserData('http://localhost:8001/api/auth/user/');
        const avatarUrl = `http://localhost:8001${user.avatar}`;
        console.log('Avatar URL:', avatarUrl);

        
        

        return `
        <div class="first-container">
            <div class="content">
                <nav class="navbar navbar-expand-lg " style="height:100px;">
                    <div class="navbar-nav">
                        <a class="nav-link">
                            <div class="search"></div>
                            <input type="text" id="search-input" class="search-input" placeholder="Search users...">
                            <div id="search-results" class="search-results"></div>
                        </a>
                        <a class="nav-link" href="#">
                            <div class="notif"></div>
                        </a>
                        <p class="nav-link">Welcome, ${user.username}</p>
                        <a class="nav-link" href="/profile">
                            <div class="profile-img" style="background-image: url('${avatarUrl}');"></div>
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
                                <a href="#" id="logout-link">
                                    <img src="../images/sidenav-img/logout.png">
                                    <p>Logout</p>
                                </a>
                            </li>
                        </ul>
                    </div>   
                </div>
            </div>
            <div class="fixed-bottom text-right p-4">
                <button type="button" class="btn btn-outline-light">PLAY</button>
            </div>
        </div>
        <!-- User Info Popup -->
        <div id="user-info-popup" class="user-info-popup hidden">
            <div class="user-info-content">
                <span id="popup-close" class="popup-close">&times;</span>
                <div class="user-card">
                    <div class="user-avatar" id="popup-avatar"></div>
                    <h2 id="popup-username"></h2>
                </div>
                <div class="user-actions">
                    <!-- Friend button will be inserted here --> 
                </div>
            </div>
            <h2 class="popup-title">Stats</h2>
            <div class="user-stats">
                <div class="stat">
                    <h3>Wins</h3>
                    <p>10</p>
                </div>
                <div class="stat">
                    <h3>Losses</h3>
                    <p>5</p>
                </div>
                <div class="stat">
                    <h3>Win Rate</h3>
                    <p>66%</p>
                </div>
            </div>
            <h2 class="popup-title">Latest Matches</h2>
            <div class="latest-matches">
            <h2 class="no-match">No Matche Played</h2>
            <div class="match">
                <ul>
                    <li>
                        <div class="match-avatar"></div>
                        <p class="match-username">User123</p>
                        <p class="match-result">2-0</p>
                    </li>
                    <li>
                        <div class="match-avatar"></div>
                        <p class="match-username">User123</p>
                        <p class="match-result">2-0</p>
                    </li>
                    <li>
                        <div class="match-avatar"></div>
                        <p class="match-username">User123</p>
                        <p class="match-result">2-0</p>
                    </li>
                    <li>
                        <div class="match-avatar"></div>
                        <p class="match-username">User123</p>
                        <p class="match-result">2-0</p>
                    </li>
                    <li>
                        <div class="match-avatar"></div>
                        <p class="match-username">User123</p>
                        <p class="match-result">2-0</p>
                    </li>
                    <li>
                        <div class="match-avatar"></div>
                        <p class="match-username">User123</p>
                        <p class="match-result">2-0</p>
                    </li>
                    <li>
                        <div class="match-avatar"></div>
                        <p class="match-username">User123</p>
                        <p class="match-result">2-0</p>
                    </li>
                    <li>
                        <div class="match-avatar"></div>
                        <p class="match-username">User123</p>
                        <p class="match-result">2-0</p>
                    </li>
                    <li>
                        <div class="match-avatar"></div>
                        <p class="match-username">User123</p>
                        <p class="match-result">2-0</p>
                    </li>
                    <li>
                        <div class="match-avatar"></div>
                        <p class="match-username">User123</p>
                        <p class="match-result">2-0</p>
                    </li>
            </ul>

            </div>
            
            
            </div>
        </div>
        `;
    }

    initialize() {
        document.getElementById('logout-link').addEventListener('click', async (event) => {
            event.preventDefault();
            await this.logoutUser();
            localStorage.removeItem('access_token');
            localStorage.removeItem('refresh_token');
            window.location.href = '/login';
        });

        const searchInput = document.getElementById('search-input');
        searchInput.addEventListener('input', async (event) => {
            const searchString = event.target.value;
            if (searchString.trim()) {
                await this.searchUsers(searchString);
            } else {
                // Clear the search results if the input is empty
                document.getElementById('search-results').style.display = 'none';
            }
        });
    }

    displaySearchResults(users) {
        const searchResultsContainer = document.getElementById('search-results');
        searchResultsContainer.innerHTML = ''; // Clear previous results
        if (users.length > 0) {
            searchResultsContainer.style.display = 'block'; // Show results container
            const ul = document.createElement('ul');
            users.forEach(user => {
                const li = document.createElement('li');
                const avatarDiv = document.createElement('div');
                avatarDiv.className = 'avatar';
                avatarDiv.style.backgroundImage = `url('http://localhost:8001${user.avatar}')`;
                
                const usernameDiv = document.createElement('div');
                usernameDiv.className = 'username';
                usernameDiv.textContent = user.username;
    
                li.appendChild(avatarDiv);
                li.appendChild(usernameDiv);


                li.addEventListener('click', () => {
                    console.log('User clicked:', user.id);
                    this.showUserPopup(user);
                });
                ul.appendChild(li);
            });
            searchResultsContainer.appendChild(ul);
        } else {
            searchResultsContainer.style.display = 'none'; // Hhhhhhhhide if no users found
        }
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

    async sendFriendRequest(receiverId) {
        alert('Sending friend request...');
        try {
            const csrfToken = await this.getCsrfToken();
            const response = await fetch(`http://localhost:8001/api/friend/send-request/${receiverId}/`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('access_token')}`, // Include token if required
                    'Content-Type': 'application/json',
                    'X-CSRFToken': csrfToken // Include CSRF token
                },
                credentials: 'include'
            });
    
            if (response.ok) {
                alert('Friend request sent successfully');
                // Optionally, update the UI to reflect the new state (e.g., change button to "Requested")
                const friendButtonContainer = document.querySelector('.user-actions');
                friendButtonContainer.innerHTML = '<h2 class="request-text">Requested</h2>';
            } else {
                const errorText = await response.text();
                console.error('Error sending friend request:', errorText);
            }
        } catch (error) {
            console.error('Error during sending friend request:', error);
        }
    }
    
    async acceptFriendRequest(requestId) {
        console.log('Accepting friend request with ID:', requestId);
        try {
            const csrfToken = await this.getCsrfToken();
            const response = await fetch(`http://localhost:8001/api/friend/accept-request/${requestId}/`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('access_token')}`, // Include token if required
                    'Content-Type': 'application/json',
                    'X-CSRFToken': csrfToken // Include CSRF token
                },
                credentials: 'include'
            });
    
            if (response.ok) {
                alert('Friend request accepted successfully');
                const friendButtonContainer = document.querySelector('.user-actions');
                friendButtonContainer.innerHTML = '<button class="btn btn-outline-light unfriend-btn">Unfriend</button>';
            } else {
                const errorText = await response.text();
                console.error('Error accepting friend request:', errorText);
            }
        } catch (error) {
            console.error('Error during accepting friend request:', error);
        }
    }
    
    
    async showUserPopup(userId) {
        console.log('Showing user popup:', userId);
        console.log('---------------', userId.id);
        try {
            // Fetch the user's profile information from the backend
            const response = await fetch(`http://localhost:8001/api/auth/user/${userId.id}/`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('access_token')}`, // Ensure the token is passed
                    'Content-Type': 'application/json'
                }
            });
    
            if (!response.ok) {
                console.error('Error fetching user profile:', await response.text());
                return;
            }


            const statusResponse = await fetch(`http://localhost:8001/api/friend/check-status/${userId.id}/`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('access_token')}`, // Ensure the token is passed
                    'Content-Type': 'application/json'
                }
            });

            if (!statusResponse.ok) {
                console.error('Error fetching user profile status:', await statusResponse.text());
                return;
            }
            
            const statusRes = await statusResponse.json();
            const user = await response.json(); // Get user data including friend status
    
            const popup = document.getElementById('user-info-popup');
            const avatarDiv = document.getElementById('popup-avatar');
            const username = document.getElementById('popup-username');
            const friendButtonContainer = document.querySelector('.user-actions');
            
            // Set avatar and username in popup
            avatarDiv.style.backgroundImage = `url('http://localhost:8001${user.avatar}')`;
            username.textContent = user.username;
    
            // Clear any existing friend button content
            friendButtonContainer.innerHTML = '';
    
            // Create the friend button based on friendship status
            
            // if (user.is_friend) {
            //     // User is already a friend, show "Unfriend" button
            //     const unfriendButton = document.createElement('button');
            //     unfriendButton.className = 'btn btn-outline-light unfriend-btn';
            //     unfriendButton.textContent = 'Unfriend';
    
            //     // Add unfriend functionality (optional: add event listener for unfriend)
            //     friendButtonContainer.appendChild(unfriendButton);
            // } else if (user.is_requested) {
            //     // Friend request is already sent, show "Requested" text
            //     const requestText = document.createElement('h2');
            //     requestText.className = 'request-text';
            //     requestText.textContent = 'Requested';
            //     friendButtonContainer.appendChild(requestText);
            // }
            //  else {
            //     // Not friends, show "Add Friend" button
            //     const friendButton = document.createElement('button');
            //     friendButton.className = 'btn btn-outline-light friend-btn';
            //     friendButton.textContent = 'Add Friend';
    
            //     // Add event listener to send friend request
            //     friendButton.addEventListener('click', () => {
            //         this.sendFriendRequest(user.id); // Pass the user ID
            //     });
    
            //     friendButtonContainer.appendChild(friendButton);
            // }


            
    
            


            // Create the friend button based on friendship status
            
            if (statusRes.status === 'friends') {
                // User is already a friend, show "Unfriend" button
                const unfriendButton = document.createElement('button');
                unfriendButton.className = 'btn btn-outline-light unfriend-btn';
                unfriendButton.textContent = 'Unfriend';
    
                // Add unfriend functionality (optional: add event listener for unfriend)
                friendButtonContainer.appendChild(unfriendButton);
            }else if (statusRes.status === 'request_sent'){ 
                // Friend request is already sent, show "Requested" text
                const requestText = document.createElement('h2');
                requestText.className = 'request-text';
                requestText.textContent = 'Requested';
                friendButtonContainer.appendChild(requestText);
            }else if (statusRes.status === 'request_received') {
                // Create a container for the buttons
                const buttonContainer = document.createElement('div');
                buttonContainer.className = 'friend-request-buttons';

                // Create Accept button
                const acceptButton = document.createElement('button');
                acceptButton.className = 'btn btn-outline-light accept-btn';
                acceptButton.textContent = 'Accept';

                // Create Reject button
                const rejectButton = document.createElement('button');
                rejectButton.className = 'btn btn-outline-light reject-btn';
                rejectButton.textContent = 'Reject';

                // Append buttons to the container
                buttonContainer.appendChild(acceptButton);
                buttonContainer.appendChild(rejectButton);

                // Append the container to the friend button container
                friendButtonContainer.appendChild(buttonContainer);

                // Add event listeners to the buttons
                acceptButton.addEventListener('click', () => {
                    this.acceptFriendRequest(user.id);
                });

                rejectButton.addEventListener('click', () => {
                    this.rejectFriendRequest(user.id);
                });
            }else{
                // Not friends, show "Add Friend" button
                const friendButton = document.createElement('button');
                friendButton.className = 'btn btn-outline-light friend-btn';
                friendButton.textContent = 'Add Friend';
    
                // Add event listener to send friend request
                friendButton.addEventListener('click', () => {
                    this.sendFriendRequest(user.id); // Pass the user ID
                });
    
                friendButtonContainer.appendChild(friendButton);
            }


            console.log('status: --->', statusRes.status);

    
            popup.classList.add('show'); // Show the popup
    
            // Close popup when the close button is clicked
            document.getElementById('popup-close').addEventListener('click', () => {
                this.closeUserPopup();
            });
    
        } catch (error) {
            console.error('Error loading user profile:', error);
        }
    }
    
    
    
    
    closeUserPopup() {
        const popup = document.getElementById('user-info-popup');
        popup.classList.remove('show');
    }
    

    async logoutUser() {
        try {
            const csrfToken = await this.getCsrfToken();
            const response = await fetch('http://localhost:8001/api/auth/logout/', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('access_token')}`, // Include token if required
                    'Content-Type': 'application/json',
                    'X-CSRFToken': csrfToken // Include CSRF token
                },
                credentials: 'include'
            });

            if (!response.ok) {
                const errorText = await response.text(); // or response.json() if the response is JSON
                throw new Error(`Logout failed: ${errorText}`);
            }
        } catch (error) {
            console.error('Error during logout:', error);
        }
    }
    
    async searchUsers(searchString) {
        try {
            const csrfToken = await this.getCsrfToken();
            
            const response = await fetch(`http://localhost:8001/api/auth/search/?search=${encodeURIComponent(searchString)}`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('access_token')}`, // Include token if required
                    'Content-Type': 'application/json',
                    'X-CSRFToken': csrfToken // Include CSRF token
                },
                credentials: 'include'
            });
            
            if (response.ok) {
                const data = await response.json();
                this.displaySearchResults(data);
            } else {
                console.error('Error fetching search results:', await response.text());
            }
        } catch (error) {
            console.error('Error during search:', error);
        }
    }
}
