import Abstract from './Abstract.js';

function loadCSS(url) {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = url;
    document.head.appendChild(link);
}

export class NotFound extends Abstract {
    constructor(params) {
        super(params);
        this.setTitle("NotFound");
        loadCSS('../styles/NotFound.css');
    }

    async getHtml() {
        return `
        <a href="https://codepen.io/uiswarup/full/vYPxywO" target="_blank">
        <header class="top-header">
      </header>
      
      <!--dust particel-->
      <div>
        <div class="starsec"></div>
        <div class="starthird"></div>
        <div class="starfourth"></div>
        <div class="starfifth"></div>
      </div>
      <!--Dust particle end--->
      
      
      <div class="lamp__wrap">
        <div class="lamp">
          <div class="cable"></div>
          <div class="cover"></div>
          <div class="in-cover">
            <div class="bulb"></div>
          </div>
          <div class="light"></div>
        </div>
      </div>
      <!-- END Lamp -->
      <section class="error">
        <!-- Content -->
        <div class="error__content">
          <div class="error__message message">
            <h1 class="message__title">Page Not Found</h1>
            <p class="message__text">We're sorry, the page you were looking for isn't found here. The link you followed may either be broken or no longer exists. Please try again, or take a look at our.</p>
          </div>
          <div class="error__nav e-nav">
            <a href="http://www.thedresscounter.com" target="_blanck" class="e-nav__link"></a>
          </div>
        </div>
        <!-- END Content -->
      
      </section>
      
        </a>    
        `;
    }

    initialize() {
        // Any additional initialization code
    }
}
