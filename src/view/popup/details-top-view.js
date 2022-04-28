import {createElement} from '../../render.js';

const createDetailsTopTemplate = () => '<div class="film-details__top-container"></div>';


export default class DetailsTopView {
  getTemplate() {
    return createDetailsTopTemplate();
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
