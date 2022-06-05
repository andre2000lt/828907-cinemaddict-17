import AllListsWrapperView from '../view/all-lists-wrapper-view';
import MainListWrapperView from '../view/main-list-wrapper-view';
import TopListWrapperView from '../view/top-list-wrapper-view';
import MostCommentedListWrapperView from '../view/most-commented-list-wrapper-view';
import FilmsListView from '../view/films-list-view';
import NofilmsView from '../view/no-films-view';

import ShowMoreView from '../view/show-more-view';

import SortView from '../view/sort-view';

import FilterModel from '../model/filter-model';
import FilterPresenter from './filter-presenter';

import FilmCardPresenter from './film-card-presenter';

import {remove, render} from '../framework/render.js';
import {sortCardsByDate, sortCardsByRating, filterCards} from '../utils.js';
import {ListType, SortType, UpdateType, UserAction} from '../consts.js';

const FILM_COUNT_PER_STEP = 5;


export default class FilmsListPresenter {
  #container = null;

  #moviesModel = {};
  #renderedFilmCount = 0;
  #currentSortType = SortType.DEFAULT;

  #commentsModel = {};

  #filterModel = new FilterModel();


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

  #filterPresenter = null;
  #sortView = null;


  constructor(container, moviesModel, commentsModel) {
    this.#container = container;
    this.#moviesModel = moviesModel;

    this.#commentsModel = commentsModel;

    this.#moviesModel.addObserver(this.#onModelChange);
    this.#filterModel.addObserver(this.#onModelChange);
  }


  init() {
    this.#renderFilter();
    this.#renderSort();

    render(this.#allListsWrapperView, this.#container);
    render(this.#mainListWrapperView, this.#allListsWrapperView.element);
    render(this.#filmLists[ListType.MAIN], this.#mainListWrapperView.element);

    this.#renderFilmList(Math.min(this.moviesDataCards.length, FILM_COUNT_PER_STEP));

    this.#renderTopList();

    this.#renderMostCommentedList();

  }

  get moviesDataCards() {
    const filteredCards = filterCards(this.#moviesModel.moviesDataCards, this.#filterModel.filter);

    switch (this.#currentSortType) {
      case SortType.DATE:
        return sortCardsByDate(filteredCards);
      case SortType.RATING:
        return sortCardsByRating(filteredCards);
    }

    return filteredCards;
  }

  #renderFilter() {
    this.#filterPresenter = new FilterPresenter(this.#container, this.#filterModel, this.#moviesModel);
    this.#filterPresenter.init();
  }

  #renderSort() {
    this.#sortView = new SortView(this.#currentSortType);
    this.#sortView.setSortTypeChangeHandler(this.#onSortChange);
    render(this.#sortView, this.#container);
  }

  #onSortChange = (sortBy) => {
    if (sortBy === this.#currentSortType) {
      return;
    }

    this.#currentSortType = sortBy;
    this.#sortView.changeSortType(this.#currentSortType);
    this.#clearFilmList();
    this.#renderFilmList(FILM_COUNT_PER_STEP);
  };

  #renderNoFilmsElement() {
    render(new NofilmsView(this.#filterModel.filter), this.#filmLists[ListType.MAIN].element);
  }

  #handleViewAction = (actionType, updateType, update) => {
    switch (actionType) {
      case UserAction.UPDATE_CARD:
        this.#moviesModel.updateCard(updateType, update);
        break;
      case UserAction.ADD_CARD:
        this.#moviesModel.addCard(updateType, update);
        break;
      case UserAction.DELETE_CARD:
        this.#moviesModel.deleteCard(updateType, update);
        break;
    }
  };

  #onModelChange = (updateType, updatedCardData) => {
    switch (updateType) {
      case UpdateType.PATCH:
        for (const listName in this.#filmCardPresenters) {
          const cardPresenter = this.#filmCardPresenters[listName].get(updatedCardData.id);
          if(cardPresenter) {
            cardPresenter.init(updatedCardData);
          }
        }

        break;
      case UpdateType.MINOR:
        this.#clearFilmList();
        this.#renderFilmList(FILM_COUNT_PER_STEP);
        break;
      case UpdateType.MAJOR:
        // - обновить всю доску (например, при переключении фильтра)
        break;
    }
  };

  #onShowMoreButtonClick = () => {
    this.#renderFilmList(this.#renderedFilmCount + FILM_COUNT_PER_STEP);

    if (this.#renderedFilmCount >= this.moviesDataCards.length) {
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
    const filmCardPresenter = new FilmCardPresenter(this.#filmLists[list].element, this.#handleViewAction, this.#commentsModel, this.#filterModel, this.#closeAllPopups);
    filmCardPresenter.init(cardData);

    this.#filmCardPresenters[list].set(cardData.id, filmCardPresenter);
  }

  #renderFilmList(to) {
    if (this.moviesDataCards.length === 0) {
      this.#renderNoFilmsElement();
      return;
    }

    this.moviesDataCards
      .slice(this.#renderedFilmCount, to)
      .forEach((filmCard) => {
        this.#renderFilmCard(filmCard, ListType.MAIN);
      });

    this.#renderedFilmCount = to;

    if (this.#renderedFilmCount < this.moviesDataCards.length) {
      this.#renderShowMoreButton();
    }
  }

  #renderTopList() {
    render(this.#topListWrapperView, this.#allListsWrapperView.element);
    render(this.#filmLists['top'], this.#topListWrapperView.element);

    for (let i = 0; i < 2; i++) {
      this.#renderFilmCard(this.moviesDataCards[i], ListType.TOP);
    }
  }

  #renderMostCommentedList() {
    render(this.#mostCommentedListWrapperView, this.#allListsWrapperView.element);
    render(this.#filmLists[ListType.MOST_COMMENTED], this.#mostCommentedListWrapperView.element);

    for (let i = 0; i < 2; i++) {
      this.#renderFilmCard(this.moviesDataCards[i], ListType.MOST_COMMENTED);
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
