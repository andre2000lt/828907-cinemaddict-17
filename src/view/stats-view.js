import AbstractView from '../framework/view/abstract-view.js';

const createStatsTemplate = (counter) => `<p>${counter} movies inside</p>`;

export default class StatsView extends AbstractView {
  #counter = null;

  constructor(counter) {
    super();
    this.#counter = counter;
  }

  get template() {
    return createStatsTemplate(this.#counter);
  }
}
