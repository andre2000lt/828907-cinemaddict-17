import AbstractView from '../framework/view/abstract-view.js';
import {getFilterStats} from '../utils.js';
import {FilterType} from '../consts.js';

const createMenuTemplate = (cardsData, currentFilter) => {
  const {watchlist, history, favorites} = getFilterStats(cardsData);

  return (
    `<nav class="main-navigation">
    <a href="#all" class="main-navigation__item ${currentFilter === FilterType.ALL? 'main-navigation__item--active' : ''}" data-filter-type=${FilterType.ALL}>All movies</a>
    <a href="#watchlist" class="main-navigation__item ${currentFilter === FilterType.WATCHLIST? 'main-navigation__item--active' : ''}" data-filter-type=${FilterType.WATCHLIST}>Watchlist <span class="main-navigation__item-count">${watchlist}</span></a>
    <a href="#history" class="main-navigation__item ${currentFilter === FilterType.HISTORY? 'main-navigation__item--active' : ''}" data-filter-type=${FilterType.HISTORY}>History <span class="main-navigation__item-count">${history}</span></a>
    <a href="#favorites" class="main-navigation__item ${currentFilter === FilterType.FAVORITES? 'main-navigation__item--active' : ''}" data-filter-type=${FilterType.FAVORITES}>Favorites <span class="main-navigation__item-count">${favorites}</span></a>
    </nav>`
  );
};


export default class FilterView extends AbstractView {
  #cardsData = null;
  #currentFilter = null;
  constructor(cardsData, currentFilter){
    super();
    this.#cardsData = cardsData;
    this.#currentFilter = currentFilter;
  }

  get template() {
    return createMenuTemplate(this.#cardsData, this.#currentFilter);
  }

  setFilterTypeChangeHandler = (callback) => {
    this._callback.filterTypeChange = callback;
    this.element.addEventListener('click', this.#filterTypeChangeHandler);
  };

  #filterTypeChangeHandler = (evt) => {
    if (evt.target.tagName !== 'A') {
      return;
    }

    evt.preventDefault();
    this._callback.filterTypeChange(evt.target.dataset.filterType);
  };
}
