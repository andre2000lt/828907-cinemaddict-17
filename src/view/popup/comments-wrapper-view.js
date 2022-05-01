import {createElement} from '../../render.js';

const createCommentsWrapperTemplate = (commentsCount) => `<section class="film-details__comments-wrap">
<h3 class="film-details__comments-title">Comments <span class="film-details__comments-count">${commentsCount}</span></h3>
</section>`;


export default class CommentsWrapperView {
  constructor (commentsCount) {
    this.commentsCount = commentsCount;
  }

  getTemplate() {
    return createCommentsWrapperTemplate(this.commentsCount);
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
