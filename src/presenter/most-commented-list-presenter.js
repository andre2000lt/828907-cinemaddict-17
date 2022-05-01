import MostCommentedListWrapperView from '../view/most-commented-list-wrapper-view';
import FilmsListView from '../view/films-list-view';
import FilmCardView from '../view/film-card-view';


import {render} from '../render.js';

export default class FilmsListPresenter {
  listWrapper = new MostCommentedListWrapperView();
  filmsList = new FilmsListView();

  init = (container, model) => {
    this.container = container;
    this.moviesCards = model.getMoviesInfo();

    render(this.listWrapper, this.container);
    render(this.filmsList, this.listWrapper.getElement());

    for (let i = 2; i < 4; i++) {
      render(new FilmCardView(this.moviesCards[i]), this.filmsList.getElement());
    }
  };
}
