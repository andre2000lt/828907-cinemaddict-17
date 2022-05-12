import {randomCards} from '../mock/movie.js';

export default class MoviesModel {
  #moviesInfo = [...randomCards];

  get moviesInfo() {
    return this.#moviesInfo;
  }

}
