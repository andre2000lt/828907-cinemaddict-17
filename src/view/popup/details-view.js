import {createElement} from '../../render.js';

const createDetailsTemplate = () => '<section class="film-details"></section>';


export default class DetailsView {
  getTemplate() {
    return createDetailsTemplate();
  }

  getElement() {
    if (!this.element) {
      this.element = createElement(this.getTemplate());
    }

    return this.element;
  }

  removeElement() {
    this.element = null;
  }
}
