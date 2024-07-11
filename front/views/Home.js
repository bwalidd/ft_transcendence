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

                <div class="hero container-fluid d-flex w-100 bg-warning justify-content-center align-items-center" style="height:100vh">
                    <button class="btn battle container d-flex bg-danger justify-content-center align-items-center" style="width:350px; height:550px">
                    </button>
                    <button class="btn training container d-flex bg-success justify-content-center align-items-center" style="width:350px; height:550px">
                    </button>
                </div>
        
        </div>
            

        `;
    }

    initialize() {
        // Any additional initialization code
    }
}
