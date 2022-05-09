import {createElement} from '../../render.js';
const monthNames = [
  'January', 'February', 'March',
  'April', 'May', 'June', 'July',
  'August', 'September', 'October',
  'November', 'December'
];

const createGenresTemplate = (genres) => {
  let temlate = '';

  genres.forEach((genre) => {
    temlate += `<span class="film-details__genre">${genre}</span>`;
  });

  return temlate;
};

const createDetailsInfoTemplate = (card) => {
  const {title, alternative_title:originalTitle, total_rating:rating, description, poster, runtime, genre, director, writers:writersArr, actors:actorsArr, age_rating:ageRating} = card.film_info;
  const writers = writersArr.join(', ');
  const actors = actorsArr.join(', ');

  const {date:isoDate, release_country:country} = card.film_info.release;
  const date = new Date(Date.parse(isoDate));
  const formattedDate = `${date.getDate()} ${monthNames[date.getMonth()]} ${date.getFullYear()}`;

  const durationH = runtime >= 60 ? `${Math.floor(runtime / 60)}h ` : '';
  const durationM = runtime % 60 ? `${runtime % 60}m` : '';
  const duration = `${durationH}${durationM}`;

  const genresTempate = createGenresTemplate(genre);

  return (
    `<div class="film-details__info-wrap">
      <div class="film-details__poster">
        <img class="film-details__poster-img" src="${poster}" alt="">

        <p class="film-details__age">${ageRating}</p>
      </div>

      <div class="film-details__info">
        <div class="film-details__info-head">
          <div class="film-details__title-wrap">
            <h3 class="film-details__title">${title}</h3>
            <p class="film-details__title-original">Original: ${originalTitle}</p>
          </div>

          <div class="film-details__rating">
            <p class="film-details__total-rating">${rating}</p>
          </div>
        </div>

        <table class="film-details__table">
          <tr class="film-details__row">
            <td class="film-details__term">Director</td>
            <td class="film-details__cell">${director}</td>
          </tr>
          <tr class="film-details__row">
            <td class="film-details__term">Writers</td>
            <td class="film-details__cell">${writers}</td>
          </tr>
          <tr class="film-details__row">
            <td class="film-details__term">Actors</td>
            <td class="film-details__cell">${actors}</td>
          </tr>
          <tr class="film-details__row">
            <td class="film-details__term">Release Date</td>
            <td class="film-details__cell">${formattedDate}</td>
          </tr>
          <tr class="film-details__row">
            <td class="film-details__term">Runtime</td>
            <td class="film-details__cell">${duration}</td>
          </tr>
          <tr class="film-details__row">
            <td class="film-details__term">Country</td>
            <td class="film-details__cell">${country}</td>
          </tr>
          <tr class="film-details__row">
            <td class="film-details__term">Genres</td>
            <td class="film-details__cell">
            ${genresTempate}
          </tr>
        </table>

        <p class="film-details__film-description">
          ${description}
        </p>
      </div>
    </div>`
  );
};


export default class DetailsInfoView {
  #element = null;
  #card = null;

  constructor(card) {
    this.#card = card;
  }

  get template() {
    return createDetailsInfoTemplate(this.#card);
  }

  get element() {
    if (!this.#element) {
      this.#element = createElement(this.template);
    }

    return this.#element;
  }

  removeElement() {
    this.#element = null;
  }
}
