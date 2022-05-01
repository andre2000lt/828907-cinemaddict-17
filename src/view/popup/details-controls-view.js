import {createElement} from '../../render.js';

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


export default class DetailsControlsView {
  constructor(card) {
    this.card = card;
  }

  getTemplate() {
    return createDetailsControlsTemplate(this.card);
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
