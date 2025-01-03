import Abstract from './Abstract.js';

function loadCSS(url) {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = url;
    document.head.appendChild(link);
}

export default class Settings extends Abstract {
    constructor(params) {
        super(params);
        this.setTitle("Settings");
        loadCSS('../styles/settings.css');
    }

    async getHtml() {
        return `
            <div class="container">
                <div class="mini-container">
                <ul class="list">
                    <li class="big-li" id="active"><a href="">PLAY</a></li>
                    <li class="big-li"><a href="">LEADERBOARD</a></li>
                    <li class="big-li"><a href="">CAREER</a></li>
                    <li class="big-li"><a href="">CHAT</a></li>
                    <li class="small-li"><a href="">SETTINGS</a></li>
                    <li class="small-li"><a href="">SOCIAL</a></li>
                    <li class="small-li"><a href="">LOGOUT</a></li>
                </ul>
                </div>
                <div class="mini-container-2">
                        <div class="upper"></div>
                        <div class="lower">
                            <a href="">WBOUWACH</a>
                        </div>
                </div>
            </div>
        `;
    }

    initialize() {
        // Any additional initialization code
    }
}
