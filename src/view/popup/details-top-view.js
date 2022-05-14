import AbstractView from '../../framework/view/abstract-view.js';

const createDetailsTopTemplate = () => '<div class="film-details__top-container"></div>';


export default class DetailsTopView extends AbstractView {
  get template() {
    return createDetailsTopTemplate();
  }
}
