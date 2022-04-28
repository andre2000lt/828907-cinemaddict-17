import {createElement} from '../../render.js';

const createDetailsBottomTemplate = () => '<div class="film-details__bottom-container"></div>';


export default class DetailsBottomView {
  getTemplate() {
    return createDetailsBottomTemplate();
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
