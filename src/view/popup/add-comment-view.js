import AbstractStatefulView from '../../framework/view/abstract-stateful-view';
import {Emoji} from '../../consts';

const BLANK_COMMENT = {
  'comment': '',
  'emotion': null,
};

const createEmojiesTemplate = (emotion) => {
  let emojies = '';
  for (const key in Emoji) {
    const checked = (Emoji[key] === emotion) ? 'checked' : '';

    emojies += `<input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-${Emoji[key]}" value="${Emoji[key]}" ${checked}>
      <label class="film-details__emoji-label" for="emoji-${Emoji[key]}">
        <img src="./images/emoji/${Emoji[key]}.png" width="30" height="30" alt="emoji">
      </label>`;
  }

  return emojies;
};

const createAddCommentTemplate = (commentState) => {
  const {comment, emotion, isSaving} = commentState;
  const emotionSrc = emotion ? `<img src="images/emoji/${emotion}.png" width="55" height="55" alt="emoji-smile"></img>`: '';
  const disabled = isSaving? 'disabled' : '';
  return (`<div class="film-details__new-comment">
  <div class="film-details__add-emoji-label">${emotionSrc}</div>

  <label class="film-details__comment-label">
    <textarea class="film-details__comment-input" placeholder="Select reaction below and write comment here" name="comment" ${disabled}>${comment}</textarea>
  </label>

  <div class="film-details__emoji-list">
    ${createEmojiesTemplate(emotion)}
  </div>
  </div>`);
};


export default class AddCommentView extends AbstractStatefulView {
  constructor(comment = BLANK_COMMENT) {
    super();
    this._state = AddCommentView.parseCommentToState(comment);

    this.#setInnerHandlers();
  }

  get template() {
    return createAddCommentTemplate(this._state);
  }

  #setInnerHandlers = () => {
    this.element.querySelector('.film-details__emoji-list').addEventListener('click', this.#emotionClickHandler);
    this.element.querySelector('.film-details__comment-input').addEventListener('input', this.#commentInputHandler);
  };

  static parseCommentToState = (comment) => ({...comment, isSaving: false});

  getNewComment() {
    if(this._state.emotion === null || this._state.comment === '') {
      return false;
    }

    return {
      'comment': this._state.comment,
      'emotion': this._state.emotion,
    };
  }

  _restoreHandlers() {
    this.#setInnerHandlers();
  }

  #emotionClickHandler = (evt) => {
    if (evt.target.tagName !== 'INPUT') {
      return;
    }

    evt.preventDefault();

    this.updateElement({
      emotion: evt.target.value,
    });
  };

  #commentInputHandler = (evt) => {
    evt.preventDefault();

    this._setState({
      comment: evt.target.value,
    });
  };

  reset() {
    this.updateElement({...BLANK_COMMENT, isSaving: false});
  }
}
