import StatsView from '../view/stats-view';

import {render} from '../framework/render.js';

export default class FilmsListPresenter {
  #stats = null;
  #container = null;


  constructor(container, counter) {
    this.#container = container;
    this.#stats = new StatsView(counter);
  }

  init() {
    render(this.#stats, this.#container);
  }
}
