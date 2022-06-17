import AbstractStatefulView from '../../framework/view/abstract-stateful-view.js';
import he from 'he';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

dayjs.extend(relativeTime);

const createCommentTemplate = (comment) => {
  const {author, comment:commentText, date:isoDate, emotion, id:commentId, isDeleting} = comment;

  const dateTime = dayjs(isoDate).toNow();
  const buttonText = isDeleting? 'Deleting...' : 'Delete';
  const disabled = isDeleting? 'disabled' : '';

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
        <button class="film-details__comment-delete" data-comment-id="${commentId}" ${disabled}>${buttonText}</button>
      </p>
    </div>
    </li>`
  );
};

export default class CommentView extends AbstractStatefulView {
  constructor(comment) {
    super();
    this._state = CommentView.parseCommentToState(comment);
  }

  get template() {
    return createCommentTemplate(this._state);
  }

  _restoreHandlers() {
    this.setCommentDeleteHandler(this._callback.commentDelete);
  }

  updateDeleteButton(update) {
    this.updateElement(update);
  }

  setCommentDeleteHandler(callback) {
    this._callback.commentDelete = callback;
    this.element.querySelector('.film-details__comment-delete').addEventListener('click', this.#commentDeleteHandler);
  }

  #commentDeleteHandler = (evt) => {
    evt.preventDefault();
    this._callback.commentDelete(evt.target.dataset.commentId);
  };

  static parseCommentToState = (comment) => (
    {
      ...comment,
      isDeleting: false,
    }
  );
}
