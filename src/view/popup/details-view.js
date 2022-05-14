import AbstractView from '../../framework/view/abstract-view.js';

const createDetailsTemplate = () => '<section class="film-details"></section>';


export default class DetailsView extends AbstractView {
  get template() {
    return createDetailsTemplate();
  }
}
