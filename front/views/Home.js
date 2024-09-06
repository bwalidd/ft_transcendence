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
        console.log('Search String:--------->', searchString)
        if (searchString.trim()) {
            console.log('Search String:---44444------>', searchString)
            await this.searchUsers(searchString);
        } else {
            // Clear the search results if the input is empty
            document.getElementById('search-results').style.display = 'none';
        }
    });
    }

    displaySearchResults(users) {
        console.log('Users:---33----->', users);
        const searchResultsContainer = document.getElementById('search-results');
        searchResultsContainer.innerHTML = ''; // Clear previous results
        console.log('Users:-------->', users.length);
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
            console.log("---===========>",searchString)
            const response = await fetch(`http://localhost:8001/api/auth/search/?search=${encodeURIComponent(searchString)}`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('access_token')}`, // Include token if required
                    'Content-Type': 'application/json',
                    'X-CSRFToken': csrfToken // Include CSRF token
                },
                credentials: 'include'
            });
            console.log('Response:-------->', response.ok);
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
