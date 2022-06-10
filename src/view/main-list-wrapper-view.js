import AbstractView from '../framework/view/abstract-view.js';

const createWrapperTemplate = (isEmptyList) => `<section class="films-list">
${isEmptyList? '' : '<h2 class="films-list__title visually-hidden">All movies. Upcoming</h2>'}
</section>`;

export default class MainListWrapperView extends AbstractView {
  #isEmptyList = false;

  constructor(isEmptyList) {
    super();
    this.#isEmptyList = isEmptyList;
  }

  get template() {
    return createWrapperTemplate(this.#isEmptyList);
  }
}
