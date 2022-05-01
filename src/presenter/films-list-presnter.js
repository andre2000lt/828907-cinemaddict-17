import FilmsListWrapperView from '../view/films-list-wrapper-view';
import FilmsListView from '../view/films-list-view';
import FilmCardView from '../view/film-card-view';
import ShowMoreView from '../view/show-more-view';

import {render} from '../render.js';

export default class FilmsListPresenter {
  filmsListWrapper = new FilmsListWrapperView();
  filmsList = new FilmsListView();
  showMoreButton = new ShowMoreView();

  init = (container, model) => {
    this.container = container;
    this.moviesCards = model.getMoviesInfo();

    render(this.filmsListWrapper, this.container);
    render(this.filmsList, this.filmsListWrapper.getElement());

    for (let i = 0; i < this.moviesCards.length; i++) {
      render(new FilmCardView(this.moviesCards[i]), this.filmsList.getElement());
    }

    render(this.showMoreButton, this.filmsListWrapper.getElement());
  };
}
