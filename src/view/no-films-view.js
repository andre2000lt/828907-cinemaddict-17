import AbstractView from '../framework/view/abstract-view.js';

const createNofilmsTemplate = () => '<h2 class="films-list__title">There are no movies in our database</h2>';

export default class NofilmsView extends AbstractView {
  get template() {
    return createNofilmsTemplate();
  }
}
