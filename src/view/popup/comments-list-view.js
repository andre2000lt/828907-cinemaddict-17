import {createElement} from '../../render.js';

const createCommentsListTemplate = () => '<ul class="film-details__comments-list"></ul>';


export default class CommentsListView {
  getTemplate() {
    return createCommentsListTemplate();
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
