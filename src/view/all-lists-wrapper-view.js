import AbstractView from '../framework/view/abstract-view.js';

const createContentTemplate = () => '<section class="films"></section>';


export default class AllListsWrapperView extends AbstractView {
  get template() {
    return createContentTemplate();
  }
}
