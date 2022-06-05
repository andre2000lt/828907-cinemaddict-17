import AbstractView from '../../framework/view/abstract-view.js';
import {getTimeFromIso} from '../../utils';
import he from 'he';

const createCommentTemplate = (comment) => {
  const {author, comment:commentText, date:isoDate, emotion, id:commentId} = comment;

  const dateTime = getTimeFromIso(isoDate);

  return (
    `<li class="film-details__comment">
    <span class="film-details__comment-emoji">
      <img src="./images/emoji/${emotion}.png" width="55" height="55" alt="emoji-smile">
    </span>
    <div>
      <p class="film-details__comment-text">${he.encode(commentText)}</p>
      <p class="film-details__comment-info">
        <span class="film-details__comment-author">${author}</span>
        <span class="film-details__comment-day">${dateTime}</span>
        <button class="film-details__comment-delete" data-comment-id="${commentId}">Delete</button>
      </p>
    </div>
    </li>`
  );
};

export default class CommentView extends AbstractView {
  #comment = null;

  constructor(comment) {
    super();
    this.#comment = comment;
  }

  get template() {
    return createCommentTemplate(this.#comment);
  }

  setCommentDeleteHandler(callback) {
    this._callback.commentDelete = callback;
    this.element.querySelector('.film-details__comment-delete').addEventListener('click', this.#commentDeleteHandler);
  }

  #commentDeleteHandler = (evt) => {
    evt.preventDefault();
    this._callback.commentDelete(evt.target.dataset.commentId);
  };
}
