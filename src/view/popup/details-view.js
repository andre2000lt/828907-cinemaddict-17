import {createElement} from '../../render.js';

const createDetailsTemplate = () => '<section class="film-details"></section>';


export default class DetailsView {
  #element = null;

  get template() {
    return createDetailsTemplate();
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
