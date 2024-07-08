import Abstract from './Abstract.js';

function loadCSS(url) {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = url;
    document.head.appendChild(link);
}

export default class Signup extends Abstract {
    constructor(params) {
        super(params);
        this.setTitle("Signup");
        loadCSS('../styles/Signup.css');
    }

    async getHtml() {
        return `

        <div class="container-f d-flex justify-content-center align-items-center position-relative" style="height:100vh">
            
                <div class="container signbg d-flex rounded flex-column justify-content-center align-items-center" style="width:500px; height:100vh">
                    <h1 class="big-text text-center display-4 mb-5 "style="margin-top: -200px;">Sign Up</h1>
                    <div class="form-container d-flex flex-column justify-content-center">
                        <form class="container">
                            <div class="form-group mb-4">
                                <input type="text" class="form-control" id="username" placeholder="Username">
                            </div>
                            <div class="form-group mb-4">
                                <input type="password" class="form-control" id="password" placeholder="Password">
                            </div>
                        </form>
                    </div>
                    <button type="submit" class="btn text-center btn-secondary">submit</button>
                    <button type="sign in" class="btn text-center btn-outline-light position-absolute" style="bottom: 250px">sign in with intra</button>
                </div>

        </div>
            

        `;
    }

    initialize() {
        // Any additional initialization code
    }
}
