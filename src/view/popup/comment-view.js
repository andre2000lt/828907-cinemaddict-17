import {createElement} from '../../render.js';
import {getTimeFromIso} from '../../utils';

const createCommentTemplate = (comment) => {
  const {author, comment:commentText, date:isoDate, emotion} = comment;

  const dateTime = getTimeFromIso(isoDate);

  return (
    `<li class="film-details__comment">
    <span class="film-details__comment-emoji">
      <img src="./images/emoji/${emotion}.png" width="55" height="55" alt="emoji-smile">
    </span>
    <div>
      <p class="film-details__comment-text">${commentText}</p>
      <p class="film-details__comment-info">
        <span class="film-details__comment-author">${author}</span>
        <span class="film-details__comment-day">${dateTime}</span>
        <button class="film-details__comment-delete">Delete</button>
      </p>
    </div>
    </li>`
  );
};

export default class CommentView {
  constructor(comment) {
    this.comment = comment;
  }

  getTemplate() {
    return createCommentTemplate(this.comment);
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