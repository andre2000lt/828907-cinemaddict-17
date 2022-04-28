import {createElement} from '../../render.js';

const createDetailsFormTemplate = () => '<form class="film-details__inner" action="" method="get"></form>';


export default class DetailsFormView {
  getTemplate() {
    return createDetailsFormTemplate();
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
