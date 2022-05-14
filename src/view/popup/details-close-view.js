import AbstractView from '../../framework/view/abstract-view.js';

const createDetailsCloseTemplate = () => `<div class="film-details__close">
<button class="film-details__close-btn" type="button">close</button>
</div>`;


export default class DetailsCloseView extends AbstractView {
  get template() {
    return createDetailsCloseTemplate();
  }

  setClickHandler = (callback) => {
    this._callback.click = callback;
    this.element.addEventListener('click', this.#clickHandler);
  };

  #clickHandler = (evt) => {
    evt.preventDefault();
    this._callback.click();
  };
}
