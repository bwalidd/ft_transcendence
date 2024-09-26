const routes = [
    { path: "/", view: "Home"},
    { path: "/login", view: "Welcome"},
    { path: "/home", view: "Welcome" },
    { path: "/notif", view: "Notif" },
    { path: "/profile", view: "Profile" },
    { path: "/chat", view: "Chat" },
    { path: "/signup", view: "Signup" },
    { path: "/leaderboard", view: "leaderboard" },
];

const shouldAuthPages = ["home", "profile", "chat", "landing"];
const viewsNotRequiringAuthentication = ['', 'Login', ];

const loadView = async (path) => {
    const route = routes.find(route => route.path === path);
    const viewName = route ? route.view : "NotFound";

    try {
        console.log(`Attempting to import ./views/${viewName}.js`);
        const module = await import(`./views/${viewName}.js`);
        console.log('Imported module:', module);
        const View = module.default;

        if (typeof View !== 'function') {
            throw new TypeError(`${viewName} is not a constructor`);
        }

        const viewInstance = new View();
        const html = await viewInstance.getHtml();
        document.querySelector('#app').innerHTML = html;

        if (typeof viewInstance.initialize === 'function') {
            viewInstance.initialize();
        }
    } catch (error) {
        console.error('Error loading view:', error);
        document.querySelector('#app').innerHTML = 'Error loading view';
    }
};

export const navigate = (path) => {
    history.pushState({}, "", path);
    loadView(path);
};

window.addEventListener('popstate', () => {
    loadView(location.pathname);
});

document.addEventListener('DOMContentLoaded', async () => {
    console.log(location.pathname);
    await loadView(location.pathname);
});
