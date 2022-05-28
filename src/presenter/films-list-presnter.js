import AllListsWrapperView from '../view/all-lists-wrapper-view';
import MainListWrapperView from '../view/main-list-wrapper-view';
import TopListWrapperView from '../view/top-list-wrapper-view';
import MostCommentedListWrapperView from '../view/most-commented-list-wrapper-view';
import FilmsListView from '../view/films-list-view';
import NofilmsView from '../view/no-films-view';

import ShowMoreView from '../view/show-more-view';

import FilterView from '../view/filter-view';
import SortView from '../view/sort-view';

import FilmCardPresenter from './film-card-presenter';

import {remove, render} from '../framework/render.js';
import {updateItem, sortCardsByDate, sortCardsByRating} from '../utils.js';
import {ListType, SortType} from '../consts.js';

const FILM_COUNT_PER_STEP = 5;


export default class FilmsListPresenter {
  #container = null;

  #moviesDataCards = [];
  #sourceMoviesDataCards = [];
  #renderedFilmCount = 0;
  #currentSortType = SortType.DEFAULT;

  #commentsModel = {};


  #filmCardPresenters = {
    [ListType.MAIN]: new Map(),
    [ListType.TOP]: new Map(),
    [ListType.MOST_COMMENTED]: new Map()
  };

  // view


  #allListsWrapperView = new AllListsWrapperView();
  #mainListWrapperView = new MainListWrapperView();
  #topListWrapperView = new TopListWrapperView();
  #mostCommentedListWrapperView = new MostCommentedListWrapperView();
  #showMoreButtonView = new ShowMoreView();

  #filmLists = {
    [ListType.MAIN]: new FilmsListView(),
    [ListType.TOP]: new FilmsListView(),
    [ListType.MOST_COMMENTED]: new FilmsListView()
  };

  #filterView = null;
  #sortView = null;


  constructor(container, moviesModel, commentsModel) {
    this.#container = container;
    this.#moviesDataCards = [...moviesModel.moviesInfo];
    this.#sourceMoviesDataCards = [...moviesModel.moviesInfo];

    this.#commentsModel = commentsModel;
  }


  init() {
    this.#renderFilter();
    this.#renderSort();

    render(this.#allListsWrapperView, this.#container);
    render(this.#mainListWrapperView, this.#allListsWrapperView.element);
    render(this.#filmLists[ListType.MAIN], this.#mainListWrapperView.element);

    if(this.#moviesDataCards.length === 0) {
      this.#mainListWrapperView.element.querySelector('h2').remove();
      this.#renderNoFilmsElement();

    } else {
      this.#renderFilmList(0, Math.min(this.#moviesDataCards.length, FILM_COUNT_PER_STEP));

      this.#renderTopList();

      this.#renderMostCommentedList();
    }
  }

  #renderFilter() {
    this.#filterView = new FilterView(this.#moviesDataCards);
    render(this.#filterView, this.#container);
  }

  #renderSort() {
    this.#sortView = new SortView(this.#moviesDataCards);
    this.#sortView.setSortTypeChangeHandler(this.#onSortChange);
    render(this.#sortView, this.#container);
  }

  #onSortChange = (sortBy) => {
    if (sortBy === this.#currentSortType) {
      return;
    }

    this.#clearFilmList();

    switch (sortBy) {
      case SortType.DATE:
        sortCardsByDate(this.#moviesDataCards);
        break;
      case SortType.RATING:
        sortCardsByRating(this.#moviesDataCards);
        break;
      default:
        this.#moviesDataCards = [...this.#sourceMoviesDataCards];
        break;
    }

    this.#renderFilmList(0, FILM_COUNT_PER_STEP);
    this.#currentSortType = sortBy;
  };

  #renderNoFilmsElement() {
    render(new NofilmsView(), this.#filmLists[ListType.MAIN].element);
  }

  #onFilmCardUpdate = (updatedCardData) => {
    this.#moviesDataCards = updateItem(this.#moviesDataCards, updatedCardData);

    for (const listName in this.#filmCardPresenters) {
      const cardPresenter = this.#filmCardPresenters[listName].get(updatedCardData.id);
      cardPresenter.init(updatedCardData);
    }
  };

  #onShowMoreButtonClick = () => {
    this.#renderFilmList(this.#renderedFilmCount, this.#renderedFilmCount + FILM_COUNT_PER_STEP);

    if (this.#renderedFilmCount >= this.#moviesDataCards.length) {
      remove(this.#showMoreButtonView);
    }
  };

  #renderShowMoreButton() {
    render(this.#showMoreButtonView, this.#mainListWrapperView.element);

    this.#showMoreButtonView.setClickHandler(this.#onShowMoreButtonClick);
  }

  #closeAllPopups = () => {
    for (const listName in this.#filmCardPresenters) {
      this.#filmCardPresenters[listName]
        .forEach((cardPresenter) => cardPresenter.popupClose());
    }
  };

  #renderFilmCard(cardData, list) {
    const filmCardPresenter = new FilmCardPresenter(this.#filmLists[list].element, this.#onFilmCardUpdate, this.#commentsModel, this.#closeAllPopups);
    filmCardPresenter.init(cardData);

    this.#filmCardPresenters[list].set(cardData.id, filmCardPresenter);
  }

  #renderFilmList(from, to) {
    this.#moviesDataCards
      .slice(from, to)
      .forEach((filmCard) => {
        this.#renderFilmCard(filmCard, ListType.MAIN);
      });

    this.#renderedFilmCount = to;

    if (this.#renderedFilmCount < this.#moviesDataCards.length) {
      this.#renderShowMoreButton();
    }
  }

  #renderTopList() {
    render(this.#topListWrapperView, this.#allListsWrapperView.element);
    render(this.#filmLists['top'], this.#topListWrapperView.element);

    for (let i = 0; i < 2; i++) {
      this.#renderFilmCard(this.#moviesDataCards[i], ListType.TOP);
    }
  }

  #renderMostCommentedList() {
    render(this.#mostCommentedListWrapperView, this.#allListsWrapperView.element);
    render(this.#filmLists[ListType.MOST_COMMENTED], this.#mostCommentedListWrapperView.element);

    for (let i = 0; i < 2; i++) {
      this.#renderFilmCard(this.#moviesDataCards[i], ListType.MOST_COMMENTED);
    }
  }

  #clearFilmList() {
    this.#filmCardPresenters[ListType.MAIN]
      .forEach((filmCard) => {filmCard.destroy(); });
    this.#filmCardPresenters[ListType.MAIN].clear();
    this.#renderedFilmCount = 0;
    remove(this.#showMoreButtonView);
  }
}
