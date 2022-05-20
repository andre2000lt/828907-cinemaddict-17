import AbstractView from '../framework/view/abstract-view.js';
import {getUserStatus} from '../utils.js';

const createProfileTemplate = (cardsData) => {
  const status = getUserStatus(cardsData);

  return (
    `<section class="header__profile profile">
    <p class="profile__rating">${status}</p>
    <img class="profile__avatar" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">
    </section>`
  );
};


export default class ProfileView extends AbstractView {
  #cardsData = null;

  constructor(cardsData) {
    super();
    this.#cardsData = cardsData;
  }

  get template() {
    return createProfileTemplate(this.#cardsData);
  }
}
