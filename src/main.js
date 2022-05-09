import ProfileView from './view/profile-view';
import MenuView from './view/menu-view';
import SortView from './view/sort-view';
import ContentView from './view/content-view';

import FilmsListPresenter from './presenter/films-list-presnter';
import MoviesModel from './model/movies-model.js';
import CommentsModel from './model/commets-model';
import StatsPresenter from './presenter/stats-presenter';

import {render} from './render.js';

const siteMainElement = document.querySelector('.main');
const siteHeaderElement = document.querySelector('.header');
const siteContent = new ContentView();
const statsWrapperElement = document.querySelector('.footer__statistics');

const moviesModel = new MoviesModel();
const commentsModel = new CommentsModel();

const filmsListPresenter = new FilmsListPresenter(siteContent.element, moviesModel, commentsModel);
const statsPresenter = new StatsPresenter(statsWrapperElement);


render(new ProfileView(), siteHeaderElement);
render(new MenuView(), siteMainElement);
render(new SortView(), siteMainElement);
render(siteContent, siteMainElement);

filmsListPresenter.init();
statsPresenter.init(statsWrapperElement);
