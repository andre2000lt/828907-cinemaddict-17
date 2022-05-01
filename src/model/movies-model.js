import {generateMovieInfo} from '../mock/movie.js';

export default class MoviesModel {
  moviesInfo = Array.from({length: 5}, generateMovieInfo);

  getMoviesInfo = () => this.moviesInfo;
}
