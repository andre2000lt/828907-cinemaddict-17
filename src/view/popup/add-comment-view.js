import AbstractStatefulView from '../../framework/view/abstract-stateful-view';
import {emoji} from '../../consts';

const BLANK_COMMENT = {
  'comment': '',
  'emotion': null
};

const createEmojiesTemplate = (emotion) => {
  let emojies = '';
  for (const key in emoji) {
    const checked = (emoji[key] === emotion) ? 'checked' : '';

    emojies += `<input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-${emoji[key]}" value="${emoji[key]}" ${checked}>
      <label class="film-details__emoji-label" for="emoji-${emoji[key]}">
        <img src="./images/emoji/${emoji[key]}.png" width="30" height="30" alt="emoji">
      </label>`;
  }

  return emojies;
};

const createAddCommentTemplate = (commentState) => {
  const {comment, emotion} = commentState;
  const emotionSrc = emotion ? `<img src="images/emoji/${emotion}.png" width="55" height="55" alt="emoji-smile"></img>`: '';

  return (`<div class="film-details__new-comment">
  <div class="film-details__add-emoji-label">${emotionSrc}</div>

  <label class="film-details__comment-label">
    <textarea class="film-details__comment-input" placeholder="Select reaction below and write comment here" name="comment">${comment}</textarea>
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

  static parseCommentToState = (comment) => ({...comment});

  _restoreHandlers = () => {
    this.#setInnerHandlers();
  };

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
}
