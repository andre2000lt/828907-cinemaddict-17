import {createElement} from '../render.js';

const createNofilmsTemplate = () => '<h2 class="films-list__title">There are no movies in our database</h2>';

export default class NofilmsView {
  #element = null;

  get template() {
    return createNofilmsTemplate();
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
