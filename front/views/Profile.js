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
                            <div class="profile-img"></div>
                        </a>
                    </div>
                </nav>

                <div class="containerr">
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


                    <div class="profile d-flex">
                        <div class="container left d-flex flex-column" style="width:60%; height: 80vh">
                            <div class="profilestate d-flex align-items-center flex-column gap-4" style="height:45%">
                                <div class="upper-div d-flex" style="width:100%">
                                    <img src="../images/bhazzout.jpeg" style="width: 180px; height: 180px; object-fit: cover; border-radius: 50%; margin-left: 20px">
                                    <div class="name-rank d-flex align-items-start flex-column justify-content-center">
                                        <h2>bhazzout</h2>
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

                            
                            <div class="slider-container">
                                <div class="slider">
                                    <div class="slide"><img src="../images/collectibale.png"></div>
                                    <div class="slide"><img src="../images/collectibaleblur.png" alt="Image 2"></div>
                                    <div class="slide"><img src="../images/collectibaleblur.png" alt="Image 3"></div>
                                    <div class="slide"><img src="../images/collectibaleblur.png" alt="Image 4"></div>
                                    <div class="slide"><img src="../images/collectibaleblur.png" alt="Image 5"></div>
                                    <!-- Cloned slides for continuous effect -->
                                    <div class="slide"><img src="../images/collectibale.png alt="Image 1"></div>
                                    <div class="slide"><img src="../images/collectibaleblur.png" alt="Image 2"></div>
                                    <div class="slide"><img src="../images/collectibaleblur.png" alt="Image 3"></div>
                                </div>
                                <button id="prevBtn" class="slider-btn">&lt;</button>
                                <button id="nextBtn" class="slider-btn">&gt;</button>
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

    initializeSlider() {
        const slider = document.querySelector('.slider');
        const slides = document.querySelectorAll('.slide');
        const prevBtn = document.getElementById('prevBtn');
        const nextBtn = document.getElementById('nextBtn');
        const slideWidth = 100 / 4;
        let currentIndex = 0;
    
        function updateSlider(smooth = true) {
            if (!smooth) {
                slider.style.transition = 'none';
            }
            slider.style.transform = `translateX(-${currentIndex * slideWidth}%)`;
            if (!smooth) {
                slider.offsetHeight; // Trigger reflow
                slider.style.transition = '';
            }
        }
    
        function nextSlide() {
            currentIndex++;
            updateSlider();
            if (currentIndex >= slides.length - 4) {
                setTimeout(() => {
                    currentIndex = 0;
                    updateSlider(false);
                }, 500);
            }
        }
    
        function prevSlide() {
            currentIndex--;
            updateSlider();
            if (currentIndex < 0) {
                setTimeout(() => {
                    currentIndex = slides.length - 6;
                    updateSlider(false);
                }, 500);
            }
        }
    
        nextBtn.addEventListener('click', nextSlide);
        prevBtn.addEventListener('click', prevSlide);
    
        // Initialize
        updateSlider();
    }

    initialize() {
        this.initializeSlider();
    }
}
