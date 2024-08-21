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
        loadCSS('../styles/Profile.css');
    }

    async getHtml() {
        const user = await this.fetchUserProfileData();
        console.log('User:', user); // Debugging line to check the user data
        const avatarUrl = `http://localhost:8000${user.avatar}`; // Adjust based on media URL settings
        return `
        <div class="first-container">
                <nav class="navbar navbar-expand-lg " style="height:100px;">
                    <div class="navbar-nav">
                        <a class="nav-link" href="#">
                            <div class="notif"></div>
                        </a>
                        <a class="nav-link" href="#">
                            <div class="search"></div>
                        </a>
                        <a class="nav-link" href="#">
                            <div class="profile-img" style="background-image: url('${avatarUrl}');"></div>
                        </a>
                    </div>
                </nav>

                <div class="containerr">
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
                        
                        <ul>
                            <li>
                                <img src="../images/sidenav-img/logout.png">
                                <p>Logout</p>
                            </li>
                        </ul>
                        
                    </div> 


                    <div class="profile d-flex">
                        <div class="container left d-flex flex-column" style="width:60%; height: 80vh">
                            <div class="profilestate d-flex align-items-center flex-column gap-4" style="height:45%">
                                <div class="upper-div d-flex" style="width:100%">
                                    <img src="${avatarUrl}" style="width: 180px; height: 180px; object-fit: cover; border-radius: 50%; margin-left: 20px">
                                    <div class="name-rank d-flex align-items-start flex-column justify-content-center">
                                        <h2>${user.username}</h2>
                                        <h4>#100</h4>
                                    </div>
                                    <div class="message d-flex align-items-start flex-column justify-content-center" style="margin-right: 2em; gap:1rem">
                                        <a href="#" class="add-friend d-flex align-items-center justify-content-start" style="gap:0.25rem; text-decoration: none; color: inherit;">
                                            <img src="../images/addfriend.png" style="width: 30px; height: 30px;">
                                            <h4 style="position:relative; top:8px">Add friend</h4>
                                        </a>
                                        <a href="#" class="send-message d-flex align-items-center justify-content-start" style="gap:0.25rem; text-decoration: none; color: inherit;">
                                            <img src="../images/message.png" style="width: 30px; height: 30px;">
                                            <h4 style="position:relative; top:5px">Send message</h4>
                                        </a>
                                    </div>
                                    <div class="progress-circle" style="--i:85%;--clr:#5f0909;">
                                        <h3>85<span>%</span></h3>
                                    </div>
                                </div>
                                <div class="lower-div d-flex justify-content-center align-items-center flex-wrap gap-5" style="width:100%">
                                    <div class="stat-content d-flex justify-content-center align-items-center flex-column">
                                        <h2>matches</h2>
                                        <h4>30</h4>
                                    </div>
                                    <div class="stat-content d-flex justify-content-center align-items-center flex-column">
                                        <h2>Wins</h2>
                                        <h4>2</h4>
                                    </div>
                                    <div class="stat-content d-flex justify-content-center align-items-center flex-column">
                                        <h2>collectibales</h2>
                                        <h4>5</h4>
                                    </div>
                                </div>
                            </div>

                            
                            <div class="collectibale d-flex align-items-center mt-5" style="height:55%; width:100%; position: relative;">
                                <div class="carousel d-flex align-items-center mt-5">
                                    <div class="first-collectibale" style="width:250px; height:400px">
                                        <img src="../images/collectibale.png">
                                    </div>
                                    <div class="second-collectibale">
                                        <img src="../images/collectibaleblur.png">
                                    </div>
                                    <div class="third-collectibale">
                                        <img src="../images/collectibaleblur.png">
                                    </div>
                                    <div class="fourth-collectibale">
                                        <img src="../images/collectibaleblur.png">
                                    </div>
                                    <div class="fourth-collectibale">
                                        <img src="../images/collectibaleblur.png">
                                    </div>
                                    <div class="fourth-collectibale">
                                        <img src="../images/collectibaleblur.png">
                                    </div>
                                    <div class="fourth-collectibale">
                                        <img src="../images/collectibaleblur.png">
                                    </div>
                                    <div class="fourth-collectibale">
                                        <img src="../images/collectibaleblur.png">
                                    </div>
                                    <div class="fourth-collectibale">
                                        <img src="../images/collectibaleblur.png">
                                    </div>
                                    <div class="fourth-collectibale">
                                        <img src="../images/collectibaleblur.png">
                                    </div>
                                    <div class="fourth-collectibale">
                                        <img src="../images/collectibaleblur.png">
                                    </div>
                                    <div class="fourth-collectibale">
                                        <img src="../images/collectibaleblur.png">
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="container right d-flex flex-column " style="width:40%; height: 80vh">
                            <div class="scroll">
                                <table>
                                    <thead>
                                        <h1>Recent Matches</h1>
                                        <tr>
                                            <th class="name">Name</th>
                                            <th class="score">Score</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        ${this.generateRows()}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
        </div>
        `;
    }

    generateRows() {
        const rows = [];
        const matches = [
            { name: "Alice", score: "2-1" },
            { name: "Bob", score: "2-1" },
            { name: "wbouuuuuwach", score: "2-1" },
            { name: "Charlie", score: "2-1" },
            { name: "Charlie", score: "2-1" },
            { name: "Charlie", score: "2-1" },
            { name: "Charlie", score: "2-1" },
            { name: "Charlie", score: "2-1" },
        ];

        matches.forEach(player => {
            rows.push(`
                <tr class="blurred-content">
                    <td class="name d-flex align-items-center gap-2">
                        <div class="profile-img m-2"></div>
                        ${player.name}
                    </td>
                    <td class="score">${player.score}</td>
                </tr>
            `);
        });

        return rows.join('');
    }
    

    async fetchUserProfileData() {
        const token = localStorage.getItem('access_token');
        console.log('Access Token:', token); // Log the token for debugging
        try {
            const response = await fetch('http://localhost:8000/api/auth/user/', {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`
                },
                credentials: 'include'
            });

            if (response.ok) {
                return await response.json();
            } else {
                throw new Error('Failed to fetch user data');
            }
        } catch (error) {
            console.error('Error fetching user data:', error);
            return { avatar: '/path/to/default/avatar.jpg', username: 'Guest' }; // Provide fallback values
        }
    }


    initialize() {
        document.addEventListener("DOMContentLoaded", () => {
            const carousel = document.querySelector('.carousel');
            const nxtBtn = document.querySelector('.nxt-btn');
            const preBtn = document.querySelector('.pre-btn');
            
            if (carousel && nxtBtn && preBtn) {
                const containerWidth = carousel.getBoundingClientRect().width;

                nxtBtn.addEventListener('click', () => {
                    carousel.scrollLeft += containerWidth - 60; // Adjust scroll amount
                });

                preBtn.addEventListener('click', () => {
                    carousel.scrollLeft -= containerWidth - 60; // Adjust scroll amount
                });
            }
        });
    }
}
