import AbstractView from '../../framework/view/abstract-view.js';

const createDetailsFormTemplate = () => '<form class="film-details__inner" action="" method="get"></form>';

export default class DetailsFormView extends AbstractView {
  get template() {
    return createDetailsFormTemplate();
  }
}
