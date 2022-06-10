import { UpdateType } from '../consts.js';
import Observable from '../framework/observable.js';

export default class MoviesModel extends Observable {
  #moviesDataCards = [];
  #cardsApiService = null;

  constructor(cardsApiService) {
    super();
    this.#cardsApiService = cardsApiService;
  }

  async init() {
    try {
      this.#moviesDataCards  = await this.#cardsApiService.movies;
    } catch(err) {
      this.#moviesDataCards = [];
    }

    this._notify(UpdateType.INIT);
  }

  get moviesDataCards() {
    return this.#moviesDataCards;
  }


  async updateCard (updateType, update) {
    const index = this.#moviesDataCards.findIndex((card) => card.id === update.id);


    if (index === -1) {
      throw new Error('Can\'t update unexisting card');
    }

    try {
      const card = await this.#cardsApiService.updateCard(update);
      this.#moviesDataCards = [
        ...this.#moviesDataCards.slice(0, index),
        card,
        ...this.#moviesDataCards.slice(index + 1),
      ];
      this._notify(updateType, card);
    } catch(err) {
      throw new Error(err);
    }

    this.#moviesDataCards = [
      ...this.#moviesDataCards.slice(0, index),
      update,
      ...this.#moviesDataCards.slice(index + 1),
    ];

    this._notify(updateType, update);
  }

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
