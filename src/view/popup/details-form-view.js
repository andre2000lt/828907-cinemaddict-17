import {createElement} from '../../render.js';

const createDetailsFormTemplate = () => '<form class="film-details__inner" action="" method="get"></form>';


export default class DetailsFormView {
  #element = null;

  get template() {
    return createDetailsFormTemplate();
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
