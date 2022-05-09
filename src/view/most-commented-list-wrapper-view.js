import {createElement} from '../render.js';

const createWrapperTemplate = () => `<section class="films-list films-list--extra">
<h2 class="films-list__title">Most commented</h2>
</section>`;

export default class MostCommentedListWrapperView {
  #element = null;

  get template() {
    return createWrapperTemplate();
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
