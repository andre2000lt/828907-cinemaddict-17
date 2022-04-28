import TopListWrapperView from '../view/top-list-wrapper-view';
import FilmsListView from '../view/films-list-view';
import FilmCardView from '../view/film-card-view';


import {render} from '../render.js';

export default class FilmsListPresenter {
  topListWrapper = new TopListWrapperView();
  filmsList = new FilmsListView();

  init = (container) => {
    this.container = container;

    render(this.topListWrapper, this.container);
    render(this.filmsList, this.topListWrapper.getElement());

    for (let i = 0; i < 2; i++) {
      render(new FilmCardView(), this.filmsList.getElement());
    }
  };
}
