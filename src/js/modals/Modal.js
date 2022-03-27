/* eslint-disable linebreak-style */
export default class Modal {
  constructor(type) {
    this.type = type;
    this.init();
  }

  init() {
    this.bindToDom();
    this.wrapper = document.querySelector(`div[data-type="${this.type}"]`);
  }

  bindToDom() {
    document.body.insertAdjacentHTML('beforeend', this.createMarkup());
  }

  show() {
    this.wrapper.classList.remove('hidden');
  }

  hide() {
    this.wrapper.classList.add('hidden');
    this.getForm().reset();
  }

  getForm() {
    return document.querySelector(`form[data-type=${this.type}]`);
  }
}
