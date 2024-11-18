import { navigate } from '../index.js';
import Abstract from './Abstract.js';

function loadCSS(url) {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = url;
    document.head.appendChild(link);
}

export default class Tournaments extends Abstract {
    constructor(params) {
        loadCSS('../styles/Tournaments.css');
        super(params);
        this.setTitle("Tournaments");
    }

    async getHtml() {
        return `
        <div>
            hi from Tournaments
        </div>
        `;
    }

    initialize() {
    }
    
}


