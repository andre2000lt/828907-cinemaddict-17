import AbstractView from '../framework/view/abstract-view.js';

const createWrapperTemplate = () => `<section class="films-list films-list--extra">
<h2 class="films-list__title">Most commented</h2>
</section>`;

export default class MostCommentedListWrapperView extends AbstractView {
  get template() {
    return createWrapperTemplate();
  }
}
