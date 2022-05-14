import AbstractView from '../../framework/view/abstract-view.js';

const createDetailsBottomTemplate = () => '<div class="film-details__bottom-container"></div>';


export default class DetailsBottomView extends AbstractView {
  get template() {
    return createDetailsBottomTemplate();
  }
}
