import AbstractView from '../framework/view/abstract-view.js';

const createStatsTemplate = () => '<p>130 291 movies inside</p>';

export default class StatsView extends AbstractView {
  get template() {
    return createStatsTemplate();
  }
}
