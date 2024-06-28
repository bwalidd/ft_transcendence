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
        <div class="overlay"></div>
        <div class="content">
            <div class="nav-bar navbar-expand-lg">
            <div class="logo"></div>
            <div class="d-flex align-items-center">
                <button class="navbar-toggler ms-3" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse justify-content-end" id="navbarNav">
                    <ul class="navbar-nav d-flex align-items-center gap-3">
                        <li class="nav-item">
                            <a class="nav-link" aria-current="page" href="#">Tournament</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="#">Chat</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="#">Search</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="#">
                                <div class="profile-img"></div>
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
    </div>
    <div class="hero container-fluid d-flex w-100 justify-content-center align-items-center" style="height:100%">
        <div class="row gx-3">
            <div class="hero-content col-lg-7 d-flex justify-content-center m-auto ">
                <h1 class="font-of-logo" class="title-1">PONG-X</h1>
                <h3>About PONG-X</h3>
                <p>
                    FT_Transcendence is a project from the 42 programming school curriculum that involves building a sophisticated web application. This project is designed to help students deepen their understanding of full-stack web development, combining front-end and back-end technologies to create a complete, functional web application.
                </p>
                <button class="btn"></button>
                <h3 class="font-of-logo">ivii Networks</h3>
            </div>
            <div class="hero-image h-100 col-lg-5 d-flex justify-content-center ">
                <img id="hero" src="../images/hero3.png" alt="Hero Image">
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
