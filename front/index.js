document.addEventListener('DOMContentLoaded', () => {
    import(`./views/Profile.js`).then(module => {
        const Profile = module.Profile;
        const viewInstance = new Profile();
        viewInstance.getHtml().then(html => {
            document.querySelector('#app').innerHTML = html;
            if (typeof viewInstance.initialize === 'function') {
                viewInstance.initialize();
            }
        });
    }).catch(error => {
        console.error('Error loading wwview:', error);
        document.querySelector('#app').innerHTML = 'Error loading view zmmrer jiji';
    });
});
