import {createElement} from '../../render.js';

const createDetailsCloseTemplate = () => `<div class="film-details__close">
<button class="film-details__close-btn" type="button">close</button>
</div>`;


export default class DetailsCloseView {
  #element = null;

  get template() {
    return createDetailsCloseTemplate();
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
