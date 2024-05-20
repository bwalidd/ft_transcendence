// file: front/views/Abstract.js
export default class Abstract {
    constructor(params) {
        this.params = params;
    }

    setTitle(title) {
        document.title = title;
    }

    async getHtml() {
        return "";
    }

    async initialize() {
        // shared initialize logic 
    }

    redirect(path) {
        window.location = path;
    }
}
