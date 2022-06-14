import AllListsWrapperView from '../view/all-lists-wrapper-view';
import LoadingView from '../view/loading-view';
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

import {remove, render, RenderPosition} from '../framework/render.js';
import {sortCardsByDate, sortCardsByRating, filterCards} from '../utils.js';
import {ListType, SortType, UpdateType, UserAction} from '../consts.js';

const FILM_COUNT_PER_STEP = 5;

export default class FilmsListPresenter {
  #container = null;

  #isLoading = true;
  #isFilmListEmpty = true;

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
  #loadingView = new LoadingView();
  #mainListWrapperView = null;
  #topListWrapperView = null;
  #mostCommentedListWrapperView = null;
  #showMoreButtonView = new ShowMoreView();

  #filmLists = {
    [ListType.MAIN]: null,
    [ListType.TOP]: null,
    [ListType.MOST_COMMENTED]: null
  };

  #filterPresenter = null;
  #sortView = null;

  constructor(container, moviesModel, commentsModel) {
    this.#container = container;
    this.#moviesModel = moviesModel;

    this.#commentsModel = commentsModel;

    this.#moviesModel.addObserver(this.#onModelChange);
    this.#filterModel.addObserver(this.#onModelChange);
    this.#commentsModel.addObserver(this.#onModelChange);
  }


  init() {
    this.#renderFilter();

    render(this.#allListsWrapperView, this.#container);
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

  #renderLoading() {
    render(this.#loadingView, this.#allListsWrapperView.element, RenderPosition.AFTERBEGIN);
  }

  #renderFilter() {
    this.#filterPresenter = new FilterPresenter(this.#container, this.#filterModel, this.#moviesModel);
    this.#filterPresenter.init();
  }

  #renderSort() {
    this.#sortView = new SortView(this.#currentSortType);
    this.#sortView.setSortTypeChangeHandler(this.#onSortChange);
    render(this.#sortView, this.#allListsWrapperView.element, RenderPosition.BEFOREBEGIN);
  }

  #onSortChange = (sortBy) => {
    if (sortBy === this.#currentSortType) {
      return;
    }

    this.#currentSortType = sortBy;
    this.#clearBoard();
    this.#renderBoard(FILM_COUNT_PER_STEP);
  };

  #renderNoFilmsElement(container) {
    render(new NofilmsView(this.#filterModel.filter), container.element);
  }

  #handleViewAction =   async (actionType, updateType, update) => {
    switch (actionType) {
      case UserAction.UPDATE_CARD:
        await this.#moviesModel.updateCard(updateType, update);
        break;
      case UserAction.ADD_CARD:
        await this.#moviesModel.addCard(updateType, update);
        break;
      case UserAction.DELETE_CARD:
        await this.#moviesModel.deleteCard(updateType, update);
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
        this.#clearBoard();
        this.#renderBoard();
        break;
      case UpdateType.CHANGE_FILTER:
        this.#currentSortType = SortType.DEFAULT;
        this.#clearBoard();
        this.#renderBoard();
        break;
      case UpdateType.INIT:
        this.#isLoading = false;
        remove(this.#loadingView);
        this.#renderBoard();
        break;
      case UpdateType.DELETE_COMMENT:
      case UpdateType.ADD_COMMENT:
        this.#moviesModel.getUpdatedCard(updatedCardData);
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

  #renderBoard() {
    if (this.#isLoading) {
      this.#renderLoading();
      return;
    }

    this.#isFilmListEmpty = this.moviesDataCards.length === 0;

    this.#mainListWrapperView = new MainListWrapperView(this.#isFilmListEmpty);
    render(this.#mainListWrapperView, this.#allListsWrapperView.element);

    if (this.#isFilmListEmpty) {
      this.#renderNoFilmsElement(this.#mainListWrapperView);
      return;
    }

    this.#renderSort();

    this.#filmLists[ListType.MAIN] = new FilmsListView();
    render(this.#filmLists[ListType.MAIN], this.#mainListWrapperView.element);

    this.#renderFilmList(Math.min(this.moviesDataCards.length, FILM_COUNT_PER_STEP));

    this.#renderTopList();

    this.#renderMostCommentedList();
  }

  #renderFilmList(to) {

    this.moviesDataCards
      .slice(this.#renderedFilmCount, to)
      .forEach((filmCard) => {
        // console.log(filmCard.film_info.total_rating);
        this.#renderFilmCard(filmCard, ListType.MAIN);
      });

    this.#renderedFilmCount = to;

    if (this.#renderedFilmCount < this.moviesDataCards.length) {
      this.#renderShowMoreButton();
    }
  }

  #renderTopList() {
    this.#topListWrapperView = new TopListWrapperView();
    this.#filmLists[ListType.TOP] = new FilmsListView();
    render(this.#topListWrapperView, this.#allListsWrapperView.element);
    render(this.#filmLists['top'], this.#topListWrapperView.element);

    for (let i = 0; i < 0; i++) {
      this.#renderFilmCard(this.moviesDataCards[i], ListType.TOP);
    }
  }

  #renderMostCommentedList() {
    this.#mostCommentedListWrapperView = new MostCommentedListWrapperView();
    this.#filmLists[ListType.MOST_COMMENTED] = new FilmsListView();
    render(this.#mostCommentedListWrapperView, this.#allListsWrapperView.element);
    render(this.#filmLists[ListType.MOST_COMMENTED], this.#mostCommentedListWrapperView.element);

    for (let i = 0; i < 0; i++) {
      this.#renderFilmCard(this.moviesDataCards[i], ListType.MOST_COMMENTED);
    }
  }

  #clearBoard() {
    remove(this.#sortView);
    remove(this.#mainListWrapperView);
    remove(this.#filmLists[ListType.MAIN]);

    remove(this.#topListWrapperView);
    remove(this.#filmLists[ListType.TOP]);

    remove(this.#mostCommentedListWrapperView);
    remove(this.#filmLists[ListType.MOST_COMMENTED]);

    for (const listName in this.#filmCardPresenters) {
      this.#filmCardPresenters[listName]
        .forEach((cardPresenter) => cardPresenter.destroy());

      this.#filmCardPresenters[listName].clear();
    }

    this.#renderedFilmCount = 0;
    remove(this.#showMoreButtonView);
  }
}
