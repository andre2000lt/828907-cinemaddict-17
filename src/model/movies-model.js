import Observable from '../framework/observable.js';
import {moviesDataCards} from '../mock/movie.js';

export default class MoviesModel extends Observable {
  #moviesDataCards = null;

  constructor() {
    super();
    this.#moviesDataCards = [...moviesDataCards];
  }

  get moviesDataCards() {
    return this.#moviesDataCards;
  }


  updateCard = (updateType, update) => {
    const index = this.#moviesDataCards.findIndex((card) => card.id === update.id);

    if (index === -1) {
      throw new Error('Can\'t update unexisting card');
    }

    this.#moviesDataCards = [
      ...this.#moviesDataCards.slice(0, index),
      update,
      ...this.#moviesDataCards.slice(index + 1),
    ];

    this._notify(updateType, update);
  };

  addCard = (updateType, update) => {
    this.#moviesDataCards = [
      update,
      ...this.#moviesDataCards,
    ];

    this._notify(updateType, update);
  };

  deleteCard = (updateType, update) => {
    const index = this.#moviesDataCards.findIndex((card) => card.id === update.id);

    if (index === -1) {
      throw new Error('Can\'t delete unexisting card');
    }

    this.#moviesDataCards = [
      ...this.#moviesDataCards.slice(0, index),
      ...this.#moviesDataCards.slice(index + 1),
    ];

    this._notify(updateType);
  };
}
