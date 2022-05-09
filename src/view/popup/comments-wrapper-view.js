import {createElement} from '../../render.js';

const createCommentsWrapperTemplate = (commentsCount) => `<section class="film-details__comments-wrap">
<h3 class="film-details__comments-title">Comments <span class="film-details__comments-count">${commentsCount}</span></h3>
</section>`;


export default class CommentsWrapperView {
  #element = null;

  constructor (commentsCount) {
    this.commentsCount = commentsCount;
  }

  get template() {
    return createCommentsWrapperTemplate(this.commentsCount);
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
