import FilmsListWrapperView from '../view/films-list-wrapper-view';
import TopListWrapperView from '../view/top-list-wrapper-view';
import MostCommentedListWrapperView from '../view/most-commented-list-wrapper-view';
import FilmsListView from '../view/films-list-view';
import FilmCardView from '../view/film-card-view';
import ShowMoreView from '../view/show-more-view';

import {render} from '../render.js';
import {splitArray} from '../utils.js';
import NofilmsView from '../view/no-films-view';

import DetailsPresenter from './details-presenter';

const FILM_COUNT_PER_STEP = 5;

export default class FilmsListPresenter {
  #container = null;
  #siteFooterElement = document.querySelector('.footer');

  #moviesCards = [];
  #currentFilmCardsStep = 0;
  #splittedMoviesCards = {};

  #commentsModel = {};
  #detailsPresenter = {};

  // view
  #filmsListWrapper = new FilmsListWrapperView();
  #topListWrapper = new TopListWrapperView();
  #mostCommentedListWrapper = new MostCommentedListWrapperView();
  #showMoreButton = new ShowMoreView();

  #filmsList = new FilmsListView();
  #topList = new FilmsListView();
  #mostCommentedList = new FilmsListView();

  constructor(container, moviesModel, commentsModel) {
    this.#container = container;
    this.#moviesCards = [...moviesModel.moviesInfo];
    this.#splittedMoviesCards = splitArray(this.#moviesCards, FILM_COUNT_PER_STEP );

    this.#commentsModel = commentsModel;
  }


  init() {
    render(this.#filmsListWrapper, this.#container);
    render(this.#filmsList, this.#filmsListWrapper.element);

    if(this.#moviesCards.length === 0) {
      this.#filmsListWrapper.element.querySelector('h2').remove();
      render(new NofilmsView(), this.#filmsList.element);

    } else {
      this.#renderFilmsList();

      this.#renderTopList();

      this.#renderMostCommentedList();
    }
  }


  #onShowMoreButtonClick = (evt) => {
    evt.preventDefault();

    this.#splittedMoviesCards[this.#currentFilmCardsStep].forEach((card)=>{
      this.#renderFilmCard(card, this.#filmsList);
    });

    this.#currentFilmCardsStep += 1;

    if (!this.#splittedMoviesCards[this.#currentFilmCardsStep]) {
      this.#showMoreButton.element.remove();
      this.#showMoreButton.removeElement();
    }
  };


  #renderFilmCard(card, list) {
    const filmCardView = new FilmCardView(card);
    const comments = this.#commentsModel.getCommentsInfoByIds(card.comments);

    const onCardLinkClick = () => {
      document.body.classList.add('hide-overflow');
      this.#detailsPresenter = new DetailsPresenter(this.#siteFooterElement, card, comments);
      this.#detailsPresenter.init();
    };

    filmCardView.element.querySelector('.film-card__link').addEventListener('click', onCardLinkClick);

    render(filmCardView, list.element);
  }


  #renderFilmsList() {
    this.#splittedMoviesCards[this.#currentFilmCardsStep].forEach((card)=>{
      this.#renderFilmCard(card, this.#filmsList);
    });

    this.#currentFilmCardsStep += 1;

    if (this.#splittedMoviesCards[this.#currentFilmCardsStep]) {
      render(this.#showMoreButton, this.#filmsListWrapper.element);

      this.#showMoreButton.element.addEventListener('click', this.#onShowMoreButtonClick);
    }
  }


  #renderTopList() {
    render(this.#topListWrapper, this.#container);
    render(this.#topList, this.#topListWrapper.element);

    for (let i = 0; i < 2; i++) {
      this.#renderFilmCard(this.#moviesCards[i], this.#topList);

    }
  }


  #renderMostCommentedList() {
    render(this.#mostCommentedListWrapper, this.#container);
    render(this.#mostCommentedList, this.#mostCommentedListWrapper.element);

    for (let i = 0; i < 2; i++) {
      this.#renderFilmCard(this.#moviesCards[i], this.#mostCommentedList);

    }
  }
}
