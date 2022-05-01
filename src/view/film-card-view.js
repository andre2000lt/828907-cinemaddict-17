import {createElement} from '../render.js';

const createFilmCardTemplate = (card) => {
  const {title, total_rating:rating, description, poster, runtime, genre} = card.film_info;
  const {watchlist, already_watched:alreadyWatched, favorite} = card.user_details;

  const {date} = card.film_info.release;
  const year = new Date(Date.parse(date)).getFullYear();

  const durationH = runtime >= 60 ? `${Math.floor(runtime / 60)}h ` : '';
  const durationM = runtime % 60 ? `${runtime % 60}m` : '';
  const duration = `${durationH}${durationM}`;

  const watchlistClass = watchlist ? 'film-card__controls-item--active' : '';
  const alreadyWatchedClass = alreadyWatched ? 'film-card__controls-item--active' : '';
  const favoriteClass = favorite ? 'film-card__controls-item--active' : '';

  const commentsCount = card.comments.length;

  return (
    `<article class="film-card">
        <a class="film-card__link">
          <h3 class="film-card__title">${title}</h3>
          <p class="film-card__rating">${rating}</p>
          <p class="film-card__info">
            <span class="film-card__year">${year}</span>
            <span class="film-card__duration">${duration}</span>
            <span class="film-card__genre">${genre[0]}</span>
          </p>
          <img src="${poster}" alt="" class="film-card__poster">
          <p class="film-card__description">${description}</p>
          <span class="film-card__comments">${commentsCount} comments</span>
        </a>
        <div class="film-card__controls">
          <button class="film-card__controls-item film-card__controls-item--add-to-watchlist ${watchlistClass}" type="button">Add to watchlist</button>
          <button class="film-card__controls-item film-card__controls-item--mark-as-watched ${alreadyWatchedClass}" type="button">Mark as watched</button>
          <button class="film-card__controls-item film-card__controls-item--favorite ${favoriteClass}" type="button">Mark as favorite</button>
        </div>
    </article>`
  );
};


export default class FilmCardView {
  constructor(card) {
    this.card = card;
  }

  getTemplate() {
    return createFilmCardTemplate(this.card);
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
