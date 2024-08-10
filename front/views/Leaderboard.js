import Abstract from './Abstract.js';

function loadCSS(url) {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = url;
    document.head.appendChild(link);
}

export default class Leaderboard extends Abstract {
    constructor(params) {
        super(params);
        this.setTitle("Leaderboard");
        loadCSS('../styles/leaderboard.css');
    }

    async getHtml() {
        return `

        <div class="first-container">
            <div class="content">
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

                <div class="container-fluid bodypage">
                    <div class="side-nav">
                        <div class="logo"></div>
                        <ul>
                            <li>
                                <a href="/">
                                    <img src="../images/sidenav-img/home.png" class="home">
                                    <p>Home</p>
                                </a>
                            </li>
                            <li>
                                <a href="/leaderboard">
                                    <img src="../images/sidenav-img/leaderboard.png" class="home">
                                    <p>Leaderboard</p>
                                </a>
                            </li>
                            <li>
                                <a>
                                    <img src="../images/sidenav-img/trophy.png" class="home">
                                    <p>Tournament</p>
                                </a>
                            </li>
                            <li>
                                <a href="/chat">
                                    <img src="../images/sidenav-img/messages.png" class="home">
                                    <p>Messages</p>
                                </a>
                            </li>
                            <li>
                                <a>
                                    <img src="../images/sidenav-img/settings.png" class="home">
                                    <p>Setting</p>
                                </a>
                            </li>

                        </ul>
                        <div class="sep"></div>
                        <ul>
                            <li>
                                <img src="../images/sidenav-img/logout.png">
                                <p>Logout</p>
                            </li>
                        </ul>
                    </div> 


                    <div class="container leader d-flex flex-column " style="width:70%; height: 90vh">
                        <table>
                            <thead>
                                <h1>Leaderboard</h1>
                                <tr>
                                    <th class="rank">Rank</th>
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
        <script>
            document.addEventListener('scroll', function() {
                const rows = document.querySelectorAll('tbody tr');
                const tableHeader = document.querySelector('thead');

                const headerRect = tableHeader.getBoundingClientRect();
                const threshold = 10; // Adjust this value as needed

                rows.forEach(row => {
                    const rowRect = row.getBoundingClientRect();

                    if (rowRect.top <= headerRect.bottom - threshold) {
                        row.style.display = 'none'; // Remove the row
                    } else {
                        row.style.display = ''; // Reset the row's display property
                    }
                });
            });
        </script>
        `;
    }

    generateRows() {
        const rows = [];
        const players = [
            { rank: 1, name: "Alice", score: 1500 },
            { rank: 2, name: "Bob", score: 1400 },
            { rank: 3, name: "wbouuuuuwach", score: 1300 },
            { rank: 3, name: "Charlie", score: 1300 },
            { rank: 3, name: "Charlie", score: 1300 },
            { rank: 3, name: "Charlie", score: 1300 },
            { rank: 3, name: "Charlie", score: 1300 },
            { rank: 3, name: "Charlie", score: 1300 },
            { rank: 3, name: "Charlie", score: 1300 },
            { rank: 3, name: "Charlie", score: 1300 },
            { rank: 3, name: "Charlie", score: 1300 },
            { rank: 3, name: "Charlie", score: 1300 },
        ];

        players.forEach(player => {
            rows.push(`
                <tr>
                    <td class="rank">${player.rank}</td>
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

    initialize() {
        // Any additional initialization code
    }
}