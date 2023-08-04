customElements.define('disclosure-element',
  class extends HTMLElement {
    constructor() {
      super();
      const template = document
        .getElementById('disclosure-element')
        .content;
      const shadowRoot = this.attachShadow({mode: 'open'})
        .appendChild(template.cloneNode(true));
  }
});