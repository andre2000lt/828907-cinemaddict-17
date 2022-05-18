import FilmsListWrapperView from '../view/films-list-wrapper-view';
import TopListWrapperView from '../view/top-list-wrapper-view';
import MostCommentedListWrapperView from '../view/most-commented-list-wrapper-view';
import FilmsListView from '../view/films-list-view';
import NofilmsView from '../view/no-films-view';

import ShowMoreView from '../view/show-more-view';

import FilmCardPresenter from './film-card-presenter';
import DetailsPresenter from './details-presenter';

import {remove, render} from '../framework/render.js';
import {updateItem} from '../utils.js';

const FILM_COUNT_PER_STEP = 5;


export default class FilmsListPresenter {
  #container = null;
  #siteFooterElement = document.querySelector('.footer');

  #moviesDataCards = [];
  #renderedFilmCount = 0;

  #commentsModel = {};

  #detailsPresenter = null;
  #filmCardPresenters = new Map();

  // view
  #filmsListWrapperView = new FilmsListWrapperView();
  #topListWrapperView = new TopListWrapperView();
  #mostCommentedListWrapperView = new MostCommentedListWrapperView();
  #showMoreButtonView = new ShowMoreView();

  #filmsListView = new FilmsListView();
  #topListView = new FilmsListView();
  #mostCommentedListView = new FilmsListView();


  constructor(container, moviesModel, commentsModel) {
    this.#container = container;
    this.#moviesDataCards = [...moviesModel.moviesInfo];

    this.#commentsModel = commentsModel;
  }


  init() {
    render(this.#filmsListWrapperView, this.#container);
    render(this.#filmsListView, this.#filmsListWrapperView.element);

    if(this.#moviesDataCards.length === 0) {
      this.#filmsListWrapperView.element.querySelector('h2').remove();
      this.#renderNoFilmsElement();

    } else {
      this.#renderFilmList(0, Math.min(this.#moviesDataCards.length, FILM_COUNT_PER_STEP));
      if (FILM_COUNT_PER_STEP < this.#moviesDataCards.length) {
        this.#renderShowMoreButton();
      }

      this.#renderTopList();

      this.#renderMostCommentedList();
    }
  }

  #renderNoFilmsElement() {
    render(new NofilmsView(), this.#filmsListView.element);
  }

  #onFilmCardUpdate = (updatedCardData) => {
    this.#moviesDataCards = updateItem(this.#moviesDataCards, updatedCardData);
    this.#filmCardPresenters.get(updatedCardData.id)
      .forEach((filmPresenter) => filmPresenter.init(updatedCardData));

    if (this.#detailsPresenter !== null) {
      if(updatedCardData.id === this.#detailsPresenter.getId()) {
        const comments = this.#commentsModel.getCommentsInfoByIds(updatedCardData.comments);
        this.#detailsPresenter.init(updatedCardData, comments);
      }
    }
  };

  #onPopupOpen = (filmCardId) => {
    const prev = this.#detailsPresenter;
    if (prev !== null) {
      prev.closePopup();
    }

    const filmCardData = this.#moviesDataCards.find((item) => item.id === filmCardId);

    const comments = this.#commentsModel.getCommentsInfoByIds(filmCardData.comments);
    this.#detailsPresenter = new DetailsPresenter(this.#siteFooterElement, this.#onPopupClose, this.#onFilmCardUpdate);
    this.#detailsPresenter.init(filmCardData, comments);
  };

  #onPopupClose = () => {
    this.#detailsPresenter = null;
  };

  #onShowMoreButtonClick = () => {
    this.#renderFilmList(this.#renderedFilmCount, this.#renderedFilmCount + FILM_COUNT_PER_STEP);

    if (this.#renderedFilmCount >= this.#moviesDataCards.length) {
      remove(this.#showMoreButtonView);
    }
  };

  #renderShowMoreButton() {
    render(this.#showMoreButtonView, this.#filmsListWrapperView.element);

    this.#showMoreButtonView.setClickHandler(this.#onShowMoreButtonClick);
  }

  #renderFilmCard(cardData, list) {
    const filmCardPresenter = new FilmCardPresenter(list.element, this.#onFilmCardUpdate, this.#onPopupOpen);
    filmCardPresenter.init(cardData);

    if (this.#filmCardPresenters.has(cardData.id)) {
      const arr = [...this.#filmCardPresenters.get(cardData.id), filmCardPresenter];
      this.#filmCardPresenters.set(cardData.id, arr);
    } else {
      this.#filmCardPresenters.set(cardData.id, [filmCardPresenter]);
    }
  }

  #renderFilmList(from, to) {
    this.#moviesDataCards
      .slice(from, to)
      .forEach((filmCard) => {
        this.#renderFilmCard(filmCard, this.#filmsListView);
      });

    this.#renderedFilmCount = to;
  }

  #renderTopList() {
    render(this.#topListWrapperView, this.#container);
    render(this.#topListView, this.#topListWrapperView.element);

    for (let i = 0; i < 2; i++) {
      this.#renderFilmCard(this.#moviesDataCards[i], this.#topListView);

    }
  }

  #renderMostCommentedList() {
    render(this.#mostCommentedListWrapperView, this.#container);
    render(this.#mostCommentedListView, this.#mostCommentedListWrapperView.element);

    for (let i = 0; i < 2; i++) {
      this.#renderFilmCard(this.#moviesDataCards[i], this.#mostCommentedListView);
    }
  }

  #clearFilmList() {
    this.#filmCardPresenters
      .forEach((filmCard) => {filmCard.destroy(); });
    this.#filmCardPresenters.clear();
    this.#renderedFilmCount = 0;
    remove(this.#showMoreButtonView);
  }
}
