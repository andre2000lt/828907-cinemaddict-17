import ProfileView from './view/profile-view';

import FilmsListPresenter from './presenter/films-list-presnter';
import MoviesModel from './model/movies-model.js';
import CommentsModel from './model/commets-model';
import StatsPresenter from './presenter/stats-presenter';

import {render} from './framework/render.js';

const siteMainElement = document.querySelector('.main');
const siteHeaderElement = document.querySelector('.header');
const statsWrapperElement = document.querySelector('.footer__statistics');

const moviesModel = new MoviesModel();
const commentsModel = new CommentsModel();

const filmsListPresenter = new FilmsListPresenter(siteMainElement, moviesModel, commentsModel);
const statsPresenter = new StatsPresenter(statsWrapperElement, moviesModel.moviesInfo.length);


render(new ProfileView(moviesModel.moviesInfo), siteHeaderElement);

filmsListPresenter.init();
statsPresenter.init(statsWrapperElement);
