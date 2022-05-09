import {generateMovieInfo} from '../mock/movie.js';

export default class MoviesModel {
  #moviesInfo = Array.from({length: 25}, generateMovieInfo);

  get moviesInfo() {
    return this.#moviesInfo;
  }

}
