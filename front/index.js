// Your existing routes and loadView function
const routes = [
    { path: "/", view: "Home"},
    { path: "/login", view: "Login"},
    { path: "/signup", view: "Signup"},
    { path: "/home", view: "Welcome" },
    { path: "/notif", view: "Notif" },
    { path: "/profile", view: "Profile" },
    { path: "/chat", view: "Chat"},
    
];



const loadCSS = (url) => {
    return new Promise((resolve, reject) => {
        let existingLink = document.querySelector(`link[href="${url}"]`);
        if (!existingLink) {
            const link = document.createElement('link');
            link.rel = 'stylesheet';
            link.href = url;
            link.className = 'dynamic-css';
            link.onload = () => resolve();
            link.onerror = () => reject(new Error(`Failed to load CSS: ${url}`));
            document.head.appendChild(link);
        } else {
            resolve();
        }
    });
};

const unloadCSS = () => {
    document.querySelectorAll('link.dynamic-css').forEach(link => link.remove());
};





const loadedCSS = new Set();

const loadView = async (path) => {
    const route = routes.find(route => route.path === path);
    const viewName = route ? route.view : "NotFound";

    try {
        console.log(`Attempting to import ../views/${viewName}.js`);
        const module = await import(`../views/${viewName}.js`);
        console.log('Imported module:', module);
        const View = module.default;

        if (typeof View !== 'function') {
            throw new TypeError(`${viewName} is not a constructor`);
        }

        const viewInstance = new View();
        
        // Unload previously loaded CSS
        unloadCSS();

        // Load the new view's CSS and wait for it to be fully applied
        if (viewInstance.cssUrl) {
            await loadCSS(viewInstance.cssUrl);
            loadedCSS.add(viewInstance.cssUrl);
        }

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
    await loadView(location.pathname);

    document.body.addEventListener('click', event => {
        const target = event.target.closest('a');
        if (target && target.href.startsWith(window.location.origin)) {
            event.preventDefault();
            const path = target.getAttribute('href');
            navigate(path);
        }
    });
});
