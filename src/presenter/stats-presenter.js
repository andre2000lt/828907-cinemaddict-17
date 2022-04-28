import StatsView from '../view/stats-view';

import {render} from '../render.js';

export default class FilmsListPresenter {
  stats = new StatsView();

  init = (container) => {
    this.container = container;

    render(this.stats, this.container);
  };
}
