import ProfileView from './view/profile-view';

import FilmsListPresenter from './presenter/films-list-presnter';
import MoviesModel from './model/movies-model.js';
import CommentsModel from './model/commets-model';


import StatsPresenter from './presenter/stats-presenter';

import {render} from './framework/render.js';

import MoviesApiService from './movies-api-service.js';
import CommentsApiService from './comments-api-service.js';

const AUTHORIZATION = 'Basic hS2sfScffcl1sa2j';
const END_POINT = 'https://17.ecmascript.pages.academy/cinemaddict';

const siteMainElement = document.querySelector('.main');
const siteHeaderElement = document.querySelector('.header');
const statsWrapperElement = document.querySelector('.footer__statistics');

const moviesModel = new MoviesModel(new MoviesApiService(END_POINT, AUTHORIZATION));
const commentsModel = new CommentsModel(new CommentsApiService(END_POINT, AUTHORIZATION));

const filmsListPresenter = new FilmsListPresenter(siteMainElement, moviesModel, commentsModel);
const statsPresenter = new StatsPresenter(statsWrapperElement, moviesModel.moviesDataCards.length);

render(new ProfileView(moviesModel.moviesDataCards), siteHeaderElement);

moviesModel.init();
filmsListPresenter.init();
statsPresenter.init(statsWrapperElement);
