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
            <div class="nav-bar navbar-expand-lg">
                <div class="logo ">
                    <img src="../images/pongx.png" alt="logoooooo" width="300px" height="200px">
                </div>

                <div class="d-flex align-items-center">
                    <button class="navbar-toggler ms-3" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                    </button>
                    <div class="collapse navbar-collapse justify-content-end" id="navbarNav">
                        <ul class="navbar-nav d-flex align-items-center gap-3">
                            <li class="nav-item">
                                <a class="nav-link active" aria-current="page" href="#">Home</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" href="#">Features</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" href="#">Pricing</a>
                            </li>
                            <li class="nav-item">
                            <a class="nav-link" href="#">
                                <img src="../images/bhazzout.jpeg" class="rounded-circle" width="50" height="50" alt="Profile Picture">
                            </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

            <!-- Sidebar 
            <div id="mySidebar" class="sidebar">
                <a href="javascript:void(0)" class="close-btn" onclick="toggleSidebar()">&times;</a>
                <a href="#">Home</a>
                <a href="#">About</a>
                <a href="#">Services</a>
                <a href="#">Contact</a>
            </div>
            -->
            <div class="hero container-fluid d-flex w-100 justify-content-center align-items-center" style="height:100%">
                <div class="row gx-3">

                    <div class="hero-content col-lg-7 d-flex justify-content-center m-auto ">
                        <h1>PONG-X</h1>
                        <h3>About PONG-X</h3>
                        <p>
                            FT_Transcendence is a project from the 42 programming school curriculum that involves building a sophisticated web application. This project is designed to help students deepen their understanding of full-stack web development, combining front-end and back-end technologies to create a complete, functional web application.
                        </p>
                        <button class="btn"></button>
                        <h3>ivii Networks</h3>
                    </div>

                    <div class="hero-image h-100 col-lg-5 d-flex justify-content-center ">
                        <img src="../images/hero3.png">
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
