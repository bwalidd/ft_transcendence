import { navigate } from '../index.js';
import Abstract from './Abstract.js';

function loadCSS(url) {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = url;
    document.head.appendChild(link);
}

export default class Enable2Fa extends Abstract {
    constructor(params) {
        loadCSS('../styles/Enable2Fa.css');
        super(params);
        this.setTitle("2Fa Enable");
        this.cssSelector = '../styles/Enable2Fa.css';
    }

    async getHtml() {
        return `
        <div class="container-f d-flex justify-content-center align-items-center position-relative" style="height:100vh">
        <div class="overlay"></div>    
        <div class="fa-container">
            <h1 class="big-text text-center display-4 mb-5" style="margin-top: -90px;">Enable 2FA</h1>
            <div class="qr-code"></div>
            <input type="text" class="form-control" id="2fa-code" placeholder="Enter 2FA Code" required>
            <button type="submit" class="btn btn-secondary text-center">Login</button>
        </div>

        </div>
        `;
    }

   

    initialize() {
       this.Enable2Fa();
    }

    async Enable2Fa() {
        try {
            const response = await fetch(`http://localhost:8001/api/auth/user/`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('access_token')}`, // Include token if required
                    'Content-Type': 'application/json'

                },
                credentials: 'include'
            }
            );
            const res = await response.json();
            console.log(res);
        }catch (error) {
            console.error('Error fetching opponent pic:', error);

        }
    }
    

    cleanup() {
        

       
        const cssLink = document.querySelector(`link[href="${this.cssSelector}"]`);
        if (cssLink) {
            cssLink.remove();
        }

    }
}
