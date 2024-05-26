document.addEventListener('DOMContentLoaded', () => {
    import(`../views/Chat.js`).then(module => {
        const Chat = module.Chat;
        const viewInstance = new Chat();
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
