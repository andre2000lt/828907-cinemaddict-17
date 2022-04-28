import {createElement} from '../../render.js';

const createCommentsWrapperTemplate = () => `<section class="film-details__comments-wrap">
<h3 class="film-details__comments-title">Comments <span class="film-details__comments-count">4</span></h3>
</section>`;


export default class CommentsWrapperView {
  getTemplate() {
    return createCommentsWrapperTemplate();
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
