import StatsView from '../view/stats-view';

import {render} from '../framework/render.js';

export default class FilmsListPresenter {
  #stats = new StatsView();
  #container = null;


  constructor(container) {
    this.#container = container;
  }

  init() {
    render(this.#stats, this.#container);
  }
}
