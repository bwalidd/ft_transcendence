import Abstract from './Abstract.js';



export default class NotFound extends Abstract {
    constructor(params) {
        super(params);
        this.setTitle("NotFound");
        this.cssUrl = '../styles/NotFound.css';
    }

    async getHtml() {
        return `
       <div class="containerr">
            <div class="overlay"></div>
            <div class="content">
                <div class="our-logo">
                </div>
                <div>
                    <h1 class="quoate-h1">404</h1>
                    <p class="quoate-p">
                    the page you are looking for is not found
                    </p>
                </div>
            </div>
        </div>
        `;
    }

    initialize() {
        // Any additional initialization code
    }
}
