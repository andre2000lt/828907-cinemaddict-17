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
import {sortCardsByDate, sortCardsByRating, filterCards, getTopCards, getMostCommentedCards} from '../utils.js';
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

    this.#moviesModel.addObserver(this.#modelChangeHandler);
    this.#filterModel.addObserver(this.#modelChangeHandler);
    this.#commentsModel.addObserver(this.#modelChangeHandler);
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

  get topDataCards() {
    return getTopCards(this.moviesDataCards);
  }

  get mostCommentedDataCards() {
    return getMostCommentedCards(this.moviesDataCards);
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
    this.#sortView.setSortTypeChangeHandler(this.#SortChangeHandler);
    render(this.#sortView, this.#allListsWrapperView.element, RenderPosition.BEFOREBEGIN);
  }

  #SortChangeHandler = (sortBy) => {
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
    }
  };

  #modelChangeHandler = (updateType, updatedCardData) => {
    switch (updateType) {
      case UpdateType.PATCH:
        for (const listName in this.#filmCardPresenters) {
          const cardPresenter = this.#filmCardPresenters[listName].get(updatedCardData.id);
          if(cardPresenter) {
            if(cardPresenter.isRendered()) {
              cardPresenter.init(this.#filmLists[listName].element, updatedCardData);
            }
          }
        }

        break;
      case UpdateType.MINOR:
        this.#clearBoard();
        this.#renderBoard();
        break;
      case UpdateType.MAJOR:
        for (const listName in this.#filmCardPresenters) {
          if (listName !== ListType.MOST_COMMENTED) {
            const cardPresenter = this.#filmCardPresenters[listName].get(updatedCardData.id);
            if(cardPresenter) {
              cardPresenter.init(this.#filmLists[listName].element, updatedCardData);
            }
          }
        }

        this.#updateMostCommentedList();
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

  #showMoreButtonClickHandler = () => {
    this.#renderFilmList(this.#renderedFilmCount + FILM_COUNT_PER_STEP);

    if (this.#renderedFilmCount >= this.moviesDataCards.length) {
      remove(this.#showMoreButtonView);
    }
  };

  #renderShowMoreButton() {
    render(this.#showMoreButtonView, this.#mainListWrapperView.element);

    this.#showMoreButtonView.setClickHandler(this.#showMoreButtonClickHandler);
  }

  #closeAllPopups = () => {
    for (const listName in this.#filmCardPresenters) {
      this.#filmCardPresenters[listName]
        .forEach((cardPresenter) => cardPresenter.popupClose());
    }
  };

  #createFilmCard(cardData, list, init = true) {

    const filmCardPresenter = new FilmCardPresenter(this.#handleViewAction, this.#commentsModel, this.#filterModel, this.#closeAllPopups);

    this.#filmCardPresenters[list].set(cardData.id, filmCardPresenter);

    if (init) {
      filmCardPresenter.init(this.#filmLists[list].element, cardData);
    }
  }

  #renderFilmCard(list, cardPresenter, cardData, renderCard) {
    cardPresenter.init(this.#filmLists[list].element, cardData, renderCard);
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
        this.#createFilmCard(filmCard, ListType.MAIN);
      });

    this.#renderedFilmCount = to;

    if (this.#renderedFilmCount < this.moviesDataCards.length) {
      this.#renderShowMoreButton();
    }
  }

  #renderTopList() {
    if (this.topDataCards.length === 0) {
      return;
    }

    this.#topListWrapperView = new TopListWrapperView();
    this.#filmLists[ListType.TOP] = new FilmsListView();
    render(this.#topListWrapperView, this.#allListsWrapperView.element);
    render(this.#filmLists['top'], this.#topListWrapperView.element);

    for (const topDataCard of this.topDataCards) {
      this.#createFilmCard(topDataCard, ListType.TOP);
    }
  }

  #renderMostCommentedList(update = false) {
    if (this.mostCommentedDataCards[0].comments.length === 0) {
      return;
    }

    this.#mostCommentedListWrapperView = new MostCommentedListWrapperView();
    this.#filmLists[ListType.MOST_COMMENTED] = new FilmsListView();
    render(this.#mostCommentedListWrapperView, this.#allListsWrapperView.element);
    render(this.#filmLists[ListType.MOST_COMMENTED], this.#mostCommentedListWrapperView.element);

    let i = 0;
    for (const mostCommentedDataCard of this.mostCommentedDataCards) {
      let renderCard = true;

      if (mostCommentedDataCard.comments.length === 0 || i > 1) {
        renderCard = false;
      }

      if (update) {

        const cardPresenter = this.#filmCardPresenters[ListType.MOST_COMMENTED].get(mostCommentedDataCard.id);
        if(cardPresenter) {
          this.#renderFilmCard(ListType.MOST_COMMENTED, cardPresenter, mostCommentedDataCard, renderCard);
        }
      } else {
        this.#createFilmCard(mostCommentedDataCard, ListType.MOST_COMMENTED, renderCard);
      }

      i++;
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

  #updateMostCommentedList() {
    this.#filmCardPresenters[ListType.MOST_COMMENTED]
      .forEach((cardPresenter) => {
        cardPresenter.destroy();
      });

    remove(this.#mostCommentedListWrapperView);
    remove(this.#filmLists[ListType.MOST_COMMENTED]);

    this.#renderMostCommentedList(true);
  }
}
