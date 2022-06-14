import ProfileView from '../view/profile-view';
import {render} from '../framework/render.js';
import {getUserStatus} from '../utils.js';

export default class FilterPresenter {

  #moviesModel = null;
  #profileContainer = null;
  #profileView = null;
  #status = null;

  constructor(profileContainer, moviesModel) {
    this.#profileContainer = profileContainer;
    this.#moviesModel = moviesModel;
  }

  init() {
    this.#profileView = new ProfileView(this.status);
    this.#moviesModel.addObserver(this.#onModelDataChange);

    render(this.#profileView, this.#profileContainer);
  }

  get status() {
    this.#status = { status: getUserStatus(this.#moviesModel.moviesDataCards)};
    return this.#status;
  }

  #onModelDataChange = () => {
    this.#profileView.updateElement(this.status);
  };
}
