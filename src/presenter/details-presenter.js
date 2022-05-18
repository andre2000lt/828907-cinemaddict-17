import DetailsView from '../view/popup/details-view';
import DetailsFormView from '../view/popup/details-form-view';
import DetailsTopView from '../view/popup/details-top-view';
import DetailsBottomView from '../view/popup/details-bottom-view';
import DetailsCloseView from '../view/popup/details-close-view';
import DetailsInfoView from '../view/popup/details-info-view';
import DetailsControlsView from '../view/popup/details-controls-view';

import CommentsPresenter from './comments-presenter';


import {render, remove, replace} from '../framework/render.js';

export default class DetailsPresenter {
  //view
  #details = new DetailsView();
  #detailsForm = new DetailsFormView();
  #detailsTop = new DetailsTopView();
  #detailsClose = new DetailsCloseView();
  #detailsBottom = new DetailsBottomView();

  #detailsInfoElement = null;
  #detailsControlsElement = null;
  #destroyDetailsPresenter = null;
  #updateCard = null;

  // dom
  #container = null;

  // data
  #movieCard = null;
  #movieComments = [];

  // presener
  #commentsPresenter = null;

  constructor(container, destroyDetailsPresenter, updateCard) {
    this.#destroyDetailsPresenter = destroyDetailsPresenter;
    this.#updateCard = updateCard;
    this.#container = container;
  }

  init(movieCard, movieComments) {
    this.#movieCard = movieCard;
    this.#movieComments = movieComments;

    const prevDetailsControlsElement = this.#detailsControlsElement;

    this.#detailsInfoElement = new DetailsInfoView(this.#movieCard);
    this.#detailsControlsElement = new DetailsControlsView(this.#movieCard);

    this.#detailsControlsElement.setFavoriteClickHandler(this.#onFavoriteLinkClick);
    this.#detailsControlsElement.setAlreadyWatchedClickHandler(this.#onAlreadyWatchedClick);
    this.#detailsControlsElement.setWatchlistClickHandler(this.#onWatchlistClick);

    if (prevDetailsControlsElement !== null) {
      replace(this.#detailsControlsElement, prevDetailsControlsElement);
      remove(prevDetailsControlsElement);
    } else {
      this.#commentsPresenter = new CommentsPresenter(this.#detailsBottom, this.#movieComments);

      render(this.#details, this.#container, 'afterend');
      render(this.#detailsForm, this.#details.element);

      render(this.#detailsTop, this.#detailsForm.element);
      render(this.#detailsClose, this.#detailsTop.element);
      render(this.#detailsInfoElement, this.#detailsTop.element);
      render(this.#detailsControlsElement, this.#detailsTop.element);

      render(this.#detailsBottom, this.#detailsForm.element);

      this.#commentsPresenter.init();

      this.#detailsClose.setClickHandler(this. #onClosecButtonClick);
      document.addEventListener('keydown', this.#onEscKeyDown);
    }
  }

  #onFavoriteLinkClick = () => {
    this.#movieCard.user_details.favorite = !this.#movieCard.user_details.favorite;
    this.#updateCard(this.#movieCard);
  };

  #onAlreadyWatchedClick = () => {
    this.#movieCard.user_details['already_watched'] = !this.#movieCard.user_details.already_watched;
    this.#updateCard(this.#movieCard);
  };

  #onWatchlistClick = () => {
    this.#movieCard.user_details.watchlist = !this.#movieCard.user_details.watchlist;
    this.#updateCard(this.#movieCard);
  };

  #onClosecButtonClick = () => {
    this.closePopup();
  };

  #onEscKeyDown = (evt) => {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      this.closePopup();
    }
  };

  closePopup() {
    document.body.classList.remove('hide-overflow');

    this.#detailsClose.element.removeEventListener('click',  this.#onClosecButtonClick);
    document.removeEventListener('keydown', this.#onEscKeyDown);

    remove(this.#details);
    this.#destroyDetailsPresenter();
  }

  getId() {
    return this.#movieCard.id;
  }
}
