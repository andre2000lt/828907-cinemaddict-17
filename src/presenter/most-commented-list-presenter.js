import MostCommentedListWrapperView from '../view/most-commented-list-wrapper-view';
import FilmsListView from '../view/films-list-view';
import FilmCardView from '../view/film-card-view';


import {render} from '../render.js';

export default class FilmsListPresenter {
  listWrapper = new MostCommentedListWrapperView();
  filmsList = new FilmsListView();

  init = (container) => {
    this.container = container;

    render(this.listWrapper, this.container);
    render(this.filmsList, this.listWrapper.getElement());

    for (let i = 0; i < 2; i++) {
      render(new FilmCardView(), this.filmsList.getElement());
    }
  };
}
