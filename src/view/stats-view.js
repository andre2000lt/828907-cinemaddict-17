import {createElement} from '../render.js';

const createStatsTemplate = () => '<p>130 291 movies inside</p>';


export default class StatsView {
  #element = null;

  get template() {
    return createStatsTemplate();
  }

  get element() {
    if (!this.#element) {
      this.#element = createElement(this.template);
    }

    return this.#element;
  }

  removeElement() {
    this.#element = null;
  }
}
