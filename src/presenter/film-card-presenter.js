import FilmCardView from '../view/film-card-view';

import DetailsPresenter from './details-presenter';

import {remove, render, replace} from '../framework/render';
import {UserAction, UpdateType, FilterType} from '../consts';


export default class FilmCardPresenter {
  #container = null;
  #siteFooterElement = document.querySelector('.footer');

  #filmCardView = null;

  #cardData = {};
  #updateCard  = null;
  #commentsModel = null;
  #filterModel = null;
  #closeAllPopups = null;

  #detailsPresenter = null;

  constructor(updateCard, commentsModel, filterModel, closeAllPopups) {
    this.#updateCard = updateCard;
    this.#commentsModel = commentsModel;
    this.#filterModel = filterModel;
    this.#closeAllPopups = closeAllPopups;
  }

  init(container, cardData, renderView = true) {
    this.#container = container;
    this.#cardData = cardData;

    if (this.#isPopupOpened()) {
      this.#updateDetailsPresenter();
    }

    if (!renderView) {
      return;
    }

    const prevfilmCardView = this.#filmCardView;

    this.#filmCardView = new FilmCardView(cardData);


    this.#filmCardView.setLinkClickHandler(this.#onCardLinkClick);
    this.#filmCardView.setFavoriteClickHandler(this.#onFavoriteLinkClick);
    this.#filmCardView.setAlreadyWatchedClickHandler(this.#onAlreadyWatchedClick);
    this.#filmCardView.setWatchlistClickHandler(this.#onWatchlistClick);


    if (prevfilmCardView === null) {
      render(this.#filmCardView, this.#container);
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
    this.#commentsModel.getComments(this.#cardData.id).then((comments) => {
      document.body.classList.add('hide-overflow');

      this.#detailsPresenter = new DetailsPresenter(this.#siteFooterElement, this.#destroyDetailsPresenter, this.#updateCard, this.#commentsModel);
      this.#detailsPresenter.init(this.#cardData, comments);
    });
  };

  #onFavoriteLinkClick = () => {
    const updateType = this.#filterModel.filter === FilterType.ALL? UpdateType.PATCH : UpdateType.MINOR;
    this.#cardData.user_details.favorite = !this.#cardData.user_details.favorite;
    this.#updateCard(UserAction.UPDATE_CARD, updateType, this.#cardData);
  };

  #onAlreadyWatchedClick = () => {
    const updateType = this.#filterModel.filter === FilterType.ALL? UpdateType.PATCH : UpdateType.MINOR;
    this.#cardData.user_details['already_watched'] = !this.#cardData.user_details.already_watched;
    this.#updateCard(UserAction.UPDATE_CARD, updateType, this.#cardData);
  };

  #onWatchlistClick = () => {
    const updateType = this.#filterModel.filter === FilterType.ALL? UpdateType.PATCH : UpdateType.MINOR;
    this.#cardData.user_details.watchlist = !this.#cardData.user_details.watchlist;
    this.#updateCard(UserAction.UPDATE_CARD, updateType, this.#cardData);
  };

  destroy() {
    remove(this.#filmCardView);
    this.#filmCardView = null;
  }

  #isPopupOpened = () => this.#detailsPresenter !== null;
  isRendered = () => this.#filmCardView !== null;

  #updateDetailsPresenter = () => {
    this.#commentsModel.getComments(this.#cardData.id).then((comments) => {
      this.#detailsPresenter.init(this.#cardData, comments);
    });
  };
}
