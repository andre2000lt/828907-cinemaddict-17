import FilterView from '../view/filter-view';
import {render, RenderPosition} from '../framework/render.js';
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
    this.#filterView = new FilterView(this.#moviesModel.moviesDataCards, this.#filterModel.filter);
    this.#filterView.setFilterTypeChangeHandler(this.#onFilterTypeChange);

    render(this.#filterView, this.#filterContainer, RenderPosition.AFTERBEGIN);
  }

  #onModelDataChange = () => {
    this.#filterView.updateFilter(this.#moviesModel.moviesDataCards, this.#filterModel.filter);
  };

  #onFilterTypeChange = (selectedFilter) => {
    this.#filterModel.setFilter(UpdateType.CHANGE_FILTER, selectedFilter);
  };
}
