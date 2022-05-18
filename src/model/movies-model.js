import {moviesInfo} from '../mock/movie.js';

export default class MoviesModel {
  #moviesInfo = [...moviesInfo];

  get moviesInfo() {
    return this.#moviesInfo;
  }
}
