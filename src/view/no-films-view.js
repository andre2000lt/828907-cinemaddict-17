import AbstractView from '../framework/view/abstract-view.js';
import {FilterType} from '../consts.js';

const text = {
  [FilterType.ALL]: 'There are no movies in our database',
  [FilterType.WATCHLIST]: 'There are no movies in your WATCHLIST',
  [FilterType.HISTORY]: 'There are no movies in your HISTORY',
  [FilterType.FAVORITES]: 'There are no movies in your FAVORITES',
};

const createNofilmsTemplate = (currentFilter) => `<h2 class="films-list__title">${text[currentFilter]}</h2>`;

export default class NofilmsView extends AbstractView {
  #currentFilter = null;

  constructor (currentFilter) {
    super();
    this.#currentFilter = currentFilter;
  }

  get template() {
    return createNofilmsTemplate(this.#currentFilter);
  }
}
