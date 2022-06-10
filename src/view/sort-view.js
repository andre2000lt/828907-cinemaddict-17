import AbstractStatetfulView from '../framework/view/abstract-stateful-view.js';
import {SortType} from '../consts.js';

const createSortTemplate = (state) => `<ul class="sort">
<li><a href="#" class="sort__button ${state.sortType === SortType.DEFAULT ? 'sort__button--active' : ''}" data-sort-type=${SortType.DEFAULT}>Sort by default</a></li>
<li><a href="#" class="sort__button ${state.sortType === SortType.DATE ? 'sort__button--active' : ''}" data-sort-type=${SortType.DATE}>Sort by date</a></li>
<li><a href="#" class="sort__button ${state.sortType === SortType.RATING ? 'sort__button--active' : ''}" data-sort-type=${SortType.RATING}>Sort by rating</a></li>
</ul>`;

export default class SortView extends AbstractStatetfulView {
  constructor(currentSortType) {
    super();
    this._state = SortView.parseParamsToState(currentSortType);
  }

  get template() {
    return createSortTemplate(this._state);
  }

  static parseParamsToState = (sortType) => ({sortType: sortType});

  setSortTypeChangeHandler = (callback) => {
    this._callback.sortTypeChange = callback;
    this.element.addEventListener('click', this.#sortTypeChangeHandler);
  };

  #sortTypeChangeHandler = (evt) => {
    if (evt.target.tagName !== 'A') {
      return;
    }

    evt.preventDefault();

    this._callback.sortTypeChange(evt.target.dataset.sortType);
  };

  _restoreHandlers() {
    this.setSortTypeChangeHandler(this._callback.sortTypeChange);
  }

  changeSortType(currentSortType) {
    const update = SortView.parseParamsToState(currentSortType);
    this.updateElement(update);
  }
}
