import AbstractView from '../framework/view/abstract-view.js';
import {getFilterStats} from '../utils.js';

const createMenuTemplate = (cardsData) => {
  const {watchlist, history, favorites} = getFilterStats(cardsData);

  return (
    `<nav class="main-navigation">
    <a href="#all" class="main-navigation__item main-navigation__item--active">All movies</a>
    <a href="#watchlist" class="main-navigation__item">Watchlist <span class="main-navigation__item-count">${watchlist}</span></a>
    <a href="#history" class="main-navigation__item">History <span class="main-navigation__item-count">${history}</span></a>
    <a href="#favorites" class="main-navigation__item">Favorites <span class="main-navigation__item-count">${favorites}</span></a>
    </nav>`
  );
};


export default class FilterView extends AbstractView {
  #cardsData = null;

  constructor(cardsData){
    super();
    this.#cardsData = cardsData;
  }

  get template() {
    return createMenuTemplate(this.#cardsData);
  }
}
