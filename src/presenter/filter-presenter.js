import FilterView from '../view/filter-view';
import {render, replace, remove, RenderPosition} from '../framework/render.js';
import {UpdateType} from '../consts.js';

export default class FilterPresenter {
  #filterContainer = null;
  #filterModel = null;
  #moviesModel = null;

  #filterView = null;

  constructor(filterContainer, filterModel, moviesModel) {
    this.#filterContainer = filterContainer;
    this.#filterModel = filterModel;
    this.#moviesModel = moviesModel;

    this.#moviesModel.addObserver(this.#onModelDataChange);
    this.#filterModel.addObserver(this.#onModelDataChange);
  }

  init() {
    const prevFilterView = this.#filterView;
    this.#filterView = new FilterView(this.#moviesModel.moviesDataCards, this.#filterModel.filter);
    this.#filterView.setFilterTypeChangeHandler(this.#onFilterTypeChange);

    if (prevFilterView === null) {
      render(this.#filterView, this.#filterContainer, RenderPosition.AFTERBEGIN);
    } else {
      replace(this.#filterView, prevFilterView);
      remove(prevFilterView);
    }
  }

  #onModelDataChange = () => {
    this.init();
  };

  #onFilterTypeChange = (selectedFilter) => {
    this.#filterModel.setFilter(UpdateType.MINOR, selectedFilter);
  };
}
