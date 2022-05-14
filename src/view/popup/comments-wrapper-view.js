import AbstractView from '../../framework/view/abstract-view.js';

const createCommentsWrapperTemplate = (commentsCount) => `<section class="film-details__comments-wrap">
<h3 class="film-details__comments-title">Comments <span class="film-details__comments-count">${commentsCount}</span></h3>
</section>`;


export default class CommentsWrapperView extends AbstractView {
  #commentsCount = 0;

  constructor (commentsCount = 0) {
    super();
    this.#commentsCount = commentsCount;
  }

  get template() {
    return createCommentsWrapperTemplate(this.#commentsCount);
  }
}
