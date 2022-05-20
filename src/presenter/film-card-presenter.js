import FilmCardView from '../view/film-card-view';

import DetailsPresenter from './details-presenter';

import {remove, render, replace} from '../framework/render.js';


export default class FilmCardPresenter {
  #filmCardContainer = null;
  #siteFooterElement = document.querySelector('.footer');

  #filmCardView = null;

  #cardData = {};
  #updateCard  = null;
  #commentsModel = null;
  #closeAllPopups = null;

  #detailsPresenter = null;

  constructor(filmCardContainer, updateCard, commentsModel, closeAllPopups) {
    this.#filmCardContainer = filmCardContainer;
    this.#updateCard = updateCard;
    this.#commentsModel = commentsModel;
    this.#closeAllPopups = closeAllPopups;
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

  #destroyDetailsPresenter = () => {
    this.#detailsPresenter = null;
  };

  popupClose = () => {
    if (this.#detailsPresenter !== null) {
      this.#detailsPresenter.closePopup();
      this.#destroyDetailsPresenter();
    }
  };

  #onCardLinkClick = () => {
    this.#closeAllPopups();
    document.body.classList.add('hide-overflow');

    const comments = this.#commentsModel.getCommentsInfoByIds(this.#cardData.comments);
    this.#detailsPresenter = new DetailsPresenter(this.#siteFooterElement, this.#destroyDetailsPresenter, this.#updateCard);
    this.#detailsPresenter.init(this.#cardData, comments);
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

  isPopupOpened () {
    return this.#detailsPresenter !== null;
  }

  updateDetailsPresenter() {
    const comments = this.#commentsModel.getCommentsInfoByIds(this.#cardData.comments);
    this.#detailsPresenter.init(this.#cardData, comments);
  }
}
