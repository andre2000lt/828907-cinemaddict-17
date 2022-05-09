import {createElement} from '../../render.js';

const createDetailsTopTemplate = () => '<div class="film-details__top-container"></div>';


export default class DetailsTopView {
  #element = null;

  get template() {
    return createDetailsTopTemplate();
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
