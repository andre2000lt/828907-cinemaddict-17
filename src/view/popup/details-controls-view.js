import AbstractView from '../../framework/view/abstract-view.js';

const createDetailsControlsTemplate = (card) => {
  const {watchlist, already_watched:alreadyWatched, favorite} = card.user_details;

  const watchlistClass = watchlist ? 'film-details__control-button--active' : '';
  const alreadyWatchedClass = alreadyWatched ? 'film-details__control-button--active' : '';
  const favoriteClass = favorite ? 'film-details__control-button--active' : '';

  return (
    `<section class="film-details__controls">
    <button type="button" class="film-details__control-button film-details__control-button--watchlist ${watchlistClass}" id="watchlist" name="watchlist">Add to watchlist</button>
    <button type="button" class="film-details__control-button film-details__control-button--watched ${alreadyWatchedClass}" id="watched" name="watched">Already watched</button>
    <button type="button" class="film-details__control-button film-details__control-button--favorite ${favoriteClass}" id="favorite" name="favorite">Add to favorites</button>
    </section>`
  );
};


export default class DetailsControlsView extends AbstractView {
  #card = null;

  constructor(card) {
    super();
    this.#card = card;
  }

  get template() {
    return createDetailsControlsTemplate(this.#card);
  }

  setAlreadyWatchedClickHandler(callback) {
    this._callback.alreadyWatchedClick = callback;
    this.element.querySelector('.film-details__control-button--watched').addEventListener('click', this.#alreadyWatchedClickHandler);
  }

  #alreadyWatchedClickHandler = (evt) => {
    evt.preventDefault();
    this._callback.alreadyWatchedClick();
  };


  setWatchlistClickHandler(callback) {
    this._callback.watchlistClick = callback;
    this.element.querySelector('.film-details__control-button--watchlist').addEventListener('click', this.#watchlistClickHandler);
  }

  #watchlistClickHandler = (evt) => {
    evt.preventDefault();
    this._callback.watchlistClick();
  };


  setFavoriteClickHandler(callback) {
    this._callback.favoriteClick = callback;
    this.element.querySelector('.film-details__control-button--favorite').addEventListener('click', this.#favoriteClickHandler);
  }

  #favoriteClickHandler = (evt) => {
    evt.preventDefault();
    this._callback.favoriteClick();
  };
}
