import {createElement} from '../../render.js';

const createDetailsCloseTemplate = () => `<div class="film-details__close">
<button class="film-details__close-btn" type="button">close</button>
</div>`;


export default class DetailsCloseView {
  getTemplate() {
    return createDetailsCloseTemplate();
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
