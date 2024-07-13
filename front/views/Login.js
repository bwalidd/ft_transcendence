import Abstract from './Abstract.js';

function loadCSS(url) {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = url;
    document.head.appendChild(link);
}

export default class Login extends Abstract {
    constructor(params) {
        super(params);
        this.setTitle("Login");
        loadCSS('../styles/Login.css');
    }

    async getHtml() {
        return `

        <div class="container-f d-flex justify-content-center align-items-center position-relative" style="height:100vh">
            <div class="container signbg d-flex rounded flex-column justify-content-center align-items-center" style="width:500px; height:100vh">
                <h1 class="big-text text-center display-4 mb-5" style="margin-top: -90px;">Login</h1>
                <div class="form-container d-flex flex-column justify-content-center">
                    <form class="container">
                        <div class="form-group mb-4">
                            <input type="text" class="form-control" id="username" placeholder="Username">
                        </div>
                        <div class="form-group mb-4">
                            <input type="password" class="form-control" id="password" placeholder="Password">
                        </div>
                        <a href="/" type="submit" class="btn btn-secondary text-center">Submit</a>
                    </form>
                    <div class="parag">
                        <p id="login">Don't have an account? <a href="/signup">Sign Up here</a></p>
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