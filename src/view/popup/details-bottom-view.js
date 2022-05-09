import {createElement} from '../../render.js';

const createDetailsBottomTemplate = () => '<div class="film-details__bottom-container"></div>';


export default class DetailsBottomView {
  #element = null;

  get template() {
    return createDetailsBottomTemplate();
  }

  get element() {
    if (!this.#element) {
      this.#element = createElement(this.template);
    }

    return this.#element;
  }

  removeElement() {
    this.#element = null;
  }
}
