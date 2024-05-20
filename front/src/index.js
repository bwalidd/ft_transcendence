document.addEventListener('DOMContentLoaded', () => {
    import(`../views/Welcome.js`).then(module => {
        const Welcome = module.Welcome;
        const viewInstance = new Welcome();
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
