import { navigate } from '../index.js';
import Abstract from './Abstract.js';
import { fetchUserData } from './authutils.js';

function loadCSS(url) {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = url;
    document.head.appendChild(link);
}

export default class Profile extends Abstract {
    constructor(params) {
        loadCSS('../styles/Profile.css');
        super(params);
        this.setTitle("Profile");
        this.cssSelector = '../styles/Profile.css';
        this.user = null;
        this.winRate = 0;
    }

    async getHtml() {
        this.user = await fetchUserData('http://localhost:8001/api/auth/user/');
        const avatarUrl = `http://localhost:8001${this.user.avatar}`;
        console.log('Avatar URL:', avatarUrl);
    
        return `
        <div class="first-container">
            <nav class="navbar navbar-expand-lg" style="height:100px;">
                <div class="navbar-nav"></div>
            </nav>
            <div class="containerr">
                <div class="overlay"></div>
                <div class="side-nav">
                    <div class="logo"></div>
                    <ul>
                        <li>
                            <a href="/"> <img src="../images/sidenav-img/home.png" class="home">
                                <p>Home</p>
                            </a>
                        </li>
                        <li>
                            <a href="/leaderboard"> <img src="../images/sidenav-img/leaderboard.png" class="home">
                                <p>Leaderboard</p>
                            </a>
                        </li>
                        <li>
                            <a> <img src="../images/sidenav-img/trophy.png" class="home">
                                <p>Tournament</p>
                            </a>
                        </li>
                        <li>
                            <a href="/chat"> <img src="../images/sidenav-img/messages.png" class="home">
                                <p>Messages</p>
                            </a>
                        </li>
                        <li>
                            <a href="/settings"> <img src="../images/sidenav-img/settings.png" class="home">
                                <p>Setting</p>
                            </a>
                        </li>
                    </ul>
                    <ul>
                        <li>
                            <a href="#" id="logout-link"> <img src="../images/sidenav-img/logout.png">
                                <p>Logout</p>
                            </a>
                        </li>
                    </ul>
                </div>
                <div class="center-rectangle">
                    <div id="first-container">
                        <div id="right-part">
                            <div class="profile-img"></div>
                            <div class="profile-name">${this.user.username}</div>
                        </div>
                        <div id="left-part">
                            <div class="wrapper">
                                <div class="c100 red over50" style="--p:80;">
                                    <span id="win-rate-percentage">80%</span>
                                    <div class="slice">
                                        <div class="bar"></div>
                                        <div class="fill"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div id="second-container">
                        <div id="first-part">
                            <h1>Total Matches</h1>
                            <h2 id="total-match-played">0</h2> <!-- Added -->
                        </div>
                        <div id="second-part">
                            <h1>total Wins</h1>
                            <h2 id="total-match-wins">0</h2> <!-- Added -->
                        </div>
                        <div id="third-part">
                            <h1>total Losses</h1>
                            <h2 id="total-match-losses">0</h2> <!-- Added -->
                        </div>
                    </div>
                    <div id="third-container">
                        <div class="match" id="matches-card">
                            <ul id="all-match-cards">
                                <li>
                                    <div class="match-avatar"></div>
                                    <p class="match-username">User123</p>
                                    <p class="match-result">2-0</p>
                                </li>
                            </ul>
                        </div>
                        <div class="no-matches-message" style="display: none;">No matches found.</div>
                    </div>
                </div>
            </div>
        </div>
        `;
    }
    
    

    initialize() {
        this.putProfileImage();
        this.getDataofProfile(this.user.id);
        document.getElementById('logout-link').addEventListener('click', async (event) => {
            event.preventDefault();
            await this.logoutUser();
            localStorage.removeItem('access_token');
            localStorage.removeItem('refresh_token');
            navigate('/welcome');
        });

        // this.animateWinRate(this.winRate);
    }

   /**
 * Animate the win rate percentage from 0 to the target value.
 * @param {number} targetPercentage - The final win rate percentage.
 */
animateWinRate(targetPercentage) {
    const element = document.getElementById('win-rate-percentage');
    let currentPercentage = 0;
    const duration = 4000; // 4 seconds total animation time
    const startTime = performance.now();

    const animate = (currentTime) => {
        const elapsedTime = currentTime - startTime;
        const progress = Math.min(elapsedTime / duration, 1);

        // Use an easing function for smooth acceleration and deceleration
        const easeInOutQuad = progress < 0.5 
            ? 2 * progress * progress 
            : -1 + (4 - 2 * progress) * progress;

        currentPercentage = targetPercentage * easeInOutQuad;

        element.textContent = `${currentPercentage.toFixed(1)}%`;

        if (progress < 1) {
            requestAnimationFrame(animate);
        } else {
            // Ensure we end exactly at the target percentage
            element.textContent = `${targetPercentage}%`;
        }
    };

    requestAnimationFrame(animate);
}


    putProfileImage() {
        const profileImage = document.querySelector('.profile-img');
        profileImage.style.backgroundImage = `url('http://localhost:8001${this.user.avatar}')`;
    }

    async fetchOpponentPic(userId) {
        try {
            const response = await fetch(`http://localhost:8001/api/auth/user/${userId}/`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('access_token')}`, // Include token if required
                    'Content-Type': 'application/json'

                }}
            );
            const res = await response.json();
            return res;
        }catch (error) {
            console.error('Error fetching opponent pic:', error);

        }
    }

    async getDataofProfile(userId) {
        console.log('Fetching user matches of user:', userId);
        try {
            const response = await fetch(`http://localhost:8001/api/game/allmygames/${userId}/`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
                    'Content-Type': 'application/json'
                },
            });
            const data = await response.json();
            console.log('Data length:', data.length);
    
            const noMatchesMessage = document.querySelector('.no-matches-message');
            const matchesCard = document.getElementById('matches-card');
            const allMatchCards = document.getElementById('all-match-cards');
    
            if (data.length === 0) {
                console.log('No matches played');
                noMatchesMessage.style.display = 'block';
                noMatchesMessage.style.marginTop = '120px';
                noMatchesMessage.style.textAlign = 'center';
                noMatchesMessage.style.fontSize = '40px';
                noMatchesMessage.style.fontfamily = 'Diablo';
                matchesCard.style.display = 'none';
            } else {
                console.log('Matches played');
                noMatchesMessage.style.display = 'none';
                matchesCard.style.display = 'block';
    
                // Clear existing match cards
                allMatchCards.innerHTML = '';
                let winningMatches = 0;
                let losingMatches = 0;
    
                for (let i = 0; i < data.length; i++) {
                    const match = data[i];
                    console.log('---> userId ', userId, 'match.player_one ', match.player_one);
    
                    let dataOfOpponent;
    
                    if (userId === match.player_one) {
                        console.log('Match ', i, ' I am Player One');
                        dataOfOpponent = await this.fetchOpponentPic(match.player_two);
                        console.log('Opponent data of Player Two:', dataOfOpponent);
                    } else {
                        console.log('Match ', i, ' I am Player Two');
                        dataOfOpponent = await this.fetchOpponentPic(match.player_one);
                        console.log('Opponent data of Player One:', dataOfOpponent);
                    }
    
                    const matchCard = document.createElement('li');
    
                    const matchAvatar = document.createElement('div');
                    matchAvatar.className = 'match-avatar';
                    matchAvatar.style.backgroundImage = `url('http://localhost:8001${dataOfOpponent.avatar}')`;
    
                    const matchUsername = document.createElement('p');
                    matchUsername.className = 'match-username';
                    matchUsername.textContent = dataOfOpponent.username;
    
                    const matchResult = document.createElement('p');
                    matchResult.className = 'match-result';
                    matchResult.textContent = `${match.score_player_1}  -  ${match.score_player_2}`;
    
                    matchCard.appendChild(matchAvatar);
                    matchCard.appendChild(matchUsername);
                    matchCard.appendChild(matchResult);
                    allMatchCards.appendChild(matchCard);
    
                    if ((userId === match.player_one && match.score_player_1 > match.score_player_2) ||
                        (userId === match.player_two && match.score_player_2 > match.score_player_1)) {
                        matchCard.style.border = '2px solid green';
                        winningMatches++;
                    } else {
                        matchCard.style.border = '2px solid red';
                        losingMatches++;
                    }
                }
                document.getElementById('total-match-played').textContent = data.length;
                document.getElementById('total-match-wins').textContent = winningMatches;
                document.getElementById('total-match-losses').textContent = losingMatches;
                this.winRate = Math.round((winningMatches / data.length) * 100);
                this.animateWinRate(this.winRate);
                // document.getElementById('win-rate-percentage').textContent = `${Math.round((winningMatches / data.length) * 100)}%`;
            }
        } catch (error) {
            console.error('Error fetching user matches:', error);
        }
    }
    


    async cleanup() {
        console.log('Cleaning up Welcome view');

        // Remove the dynamically added CSS
        const cssLink = document.querySelector(`link[href="${this.cssSelector}"]`);
        if (cssLink) {
            cssLink.remove();
        }
    }

    async  getCsrfToken() {
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
            const csrfToken = getCsrfToken();
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
}
