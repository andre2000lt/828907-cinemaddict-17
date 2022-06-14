import AbstractStatefulView from '../framework/view/abstract-stateful-view.js';

const createProfileTemplate = (state) =>
  `<section class="header__profile profile">
  <p class="profile__rating">${state.status}</p>
  <img class="profile__avatar" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">
  </section>`;

export default class ProfileView extends AbstractStatefulView {
  constructor(status) {
    super();
    this._state = {...status};
  }

  get template() {
    return createProfileTemplate(this._state);
  }

  _restoreHandlers() {

  }
}
