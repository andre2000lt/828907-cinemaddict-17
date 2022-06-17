import StatsView from '../view/stats-view';

import {render} from '../framework/render.js';

export default class StatsPresenter {
  #stats = null;
  #container = null;


  constructor(container) {
    this.#container = container;
  }

  init(counter) {
    this.#stats = new StatsView(counter);
    render(this.#stats, this.#container);
  }
}
