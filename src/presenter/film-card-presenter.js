import FilmCardView from '../view/film-card-view';

import {remove, render, replace} from '../framework/render.js';


export default class FilmCardPresenter {
  #filmCardContainer = null;

  #filmCardView = null;

  #cardData = {};
  #updateCard  = null;
  #openPopup  = null;

  constructor(filmCardContainer, updateCard, openPopup) {
    this.#filmCardContainer = filmCardContainer;
    this.#updateCard = updateCard;
    this.#openPopup = openPopup;
  }

  init(cardData) {
    this.#cardData = cardData;

    const prevfilmCardView = this.#filmCardView;

    this.#filmCardView = new FilmCardView(cardData);


    this.#filmCardView.setLinkClickHandler(this.#onCardLinkClick);
    this.#filmCardView.setFavoriteClickHandler(this.#onFavoriteLinkClick);
    this.#filmCardView.setAlreadyWatchedClickHandler(this.#onAlreadyWatchedClick);
    this.#filmCardView.setWatchlistClickHandler(this.#onWatchlistClick);


    if (prevfilmCardView === null) {
      render(this.#filmCardView, this.#filmCardContainer);
    } else {
      replace(this.#filmCardView, prevfilmCardView);
      remove(prevfilmCardView);
    }
  }


  #onCardLinkClick = () => {
    document.body.classList.add('hide-overflow');
    this.#openPopup(this.#cardData.id);
  };

  #onFavoriteLinkClick = () => {
    this.#cardData.user_details.favorite = !this.#cardData.user_details.favorite;
    this.#updateCard(this.#cardData);
  };

  #onAlreadyWatchedClick = () => {
    this.#cardData.user_details['already_watched'] = !this.#cardData.user_details.already_watched;
    this.#updateCard(this.#cardData);
  };

  #onWatchlistClick = () => {
    this.#cardData.user_details.watchlist = !this.#cardData.user_details.watchlist;
    this.#updateCard(this.#cardData);
  };

  destroy() {
    remove(this.#filmCardView);
  }
}
