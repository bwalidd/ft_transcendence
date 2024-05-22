document.addEventListener('DOMContentLoaded', () => {
    import(`../views/Home.js`).then(module => {
        const Home = module.Home;
        const viewInstance = new Home();
        viewInstance.getHtml().then(html => {
            document.querySelector('#app').innerHTML = html;
            if (typeof viewInstance.initialize === 'function') {
                viewInstance.initialize();
            }
        });
    }).catch(error => {
        console.error('Error loading wwwwwview:', error);
        document.querySelector('#app').innerHTML = 'Error loading view zmmrer jiji';
    });
});
