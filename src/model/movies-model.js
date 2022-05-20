import {moviesInfo} from '../mock/movie.js';

export default class MoviesModel {
  #moviesInfo = null;

  constructor() {
    this.#moviesInfo = [...moviesInfo];
  }

  get moviesInfo() {
    return this.#moviesInfo;
  }
}
