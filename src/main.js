import ProfileView from './view/profile-view';
import MenuView from './view/menu-view';
import SortView from './view/sort-view';
import ContentView from './view/content-view';

import FilmsListPresenter from './presenter/films-list-presnter';
import MoviesModel from './model/movies-model.js';
import TopListPresenter from './presenter/top-list-presenter';
import MostCommentedListPresenter from './presenter/most-commented-list-presenter';
import StatsPresenter from './presenter/stats-presenter';
import DetailsPresenter from './presenter/details-presenter';

import {render} from './render.js';

const siteMainElement = document.querySelector('.main');
const siteHeaderElement = document.querySelector('.header');
const siteFooterElement = document.querySelector('.footer');
const siteContent = new ContentView();
const statsWrapperElement = document.querySelector('.footer__statistics');

const filmsListPresenter = new FilmsListPresenter();
const moviesModel = new MoviesModel();
const topListPresenter = new TopListPresenter();
const mostCommentedListPresenter = new MostCommentedListPresenter();
const statsPresenter = new StatsPresenter();
const detailsPresenter = new DetailsPresenter();


render(new ProfileView(), siteHeaderElement);
render(new MenuView(), siteMainElement);
render(new SortView(), siteMainElement);
render(siteContent, siteMainElement);

filmsListPresenter.init(siteContent.getElement(), moviesModel);
topListPresenter.init(siteContent.getElement(), moviesModel);
mostCommentedListPresenter.init(siteContent.getElement(), moviesModel);
statsPresenter.init(statsWrapperElement);
detailsPresenter.init(siteFooterElement, moviesModel);


