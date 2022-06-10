import AbstractStatetfulView from '../framework/view/abstract-stateful-view.js';
import {getFilterStats} from '../utils.js';
import {FilterType} from '../consts.js';

const createMenuTemplate = (state) => {
  const {watchlist, history, favorites, currentFilter} = state;

  return (
    `<nav class="main-navigation">
    <a href="#all" class="main-navigation__item ${currentFilter === FilterType.ALL? 'main-navigation__item--active' : ''}" data-filter-type=${FilterType.ALL}>All movies</a>
    <a href="#watchlist" class="main-navigation__item ${currentFilter === FilterType.WATCHLIST? 'main-navigation__item--active' : ''}" data-filter-type=${FilterType.WATCHLIST}>Watchlist <span class="main-navigation__item-count">${watchlist}</span></a>
    <a href="#history" class="main-navigation__item ${currentFilter === FilterType.HISTORY? 'main-navigation__item--active' : ''}" data-filter-type=${FilterType.HISTORY}>History <span class="main-navigation__item-count">${history}</span></a>
    <a href="#favorites" class="main-navigation__item ${currentFilter === FilterType.FAVORITES? 'main-navigation__item--active' : ''}" data-filter-type=${FilterType.FAVORITES}>Favorites <span class="main-navigation__item-count">${favorites}</span></a>
    </nav>`
  );
};


export default class FilterView extends AbstractStatetfulView {
  constructor(cardsData, currentFilter){
    super();
    this._state = FilterView.parseParamsToState(cardsData, currentFilter);
  }

  get template() {
    return createMenuTemplate(this._state);
  }

  static parseParamsToState = (cardsData, currentFilter) => {
    const state = {...getFilterStats(cardsData)};
    state.currentFilter = currentFilter;
    return state;
  };

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

  _restoreHandlers() {
    this.setFilterTypeChangeHandler(this._callback.filterTypeChange);
  }

  updateFilter(cardsData, currentFilter) {
    const update = FilterView.parseParamsToState(cardsData, currentFilter);
    this.updateElement(update);
  }
}
