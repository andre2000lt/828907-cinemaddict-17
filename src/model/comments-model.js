import Observable from '../framework/observable.js';
import {UpdateType} from '../consts.js';

export default class CommentsModel extends Observable {
  #commentsApiService = null;

  constructor(commentsApiService) {
    super();
    this.#commentsApiService = commentsApiService;
  }

  async getComments(filmId) {
    let comments;
    try {
      comments = await this.#commentsApiService.getComments(filmId);
    } catch(err) {
      comments = [];
    }

    return comments;
  }

  async addComment(comment, filmId) {
    try {
      const response = await this.#commentsApiService.addComment(comment, filmId);

      this._notify(UpdateType.ADD_COMMENT, response.movie.id);
    } catch(err) {
      throw new Error(err);
    }
  }

  async deleteComment(commentId, movieId) {
    try {
      await this.#commentsApiService.deleteComment(commentId);

      this._notify(UpdateType.DELETE_COMMENT, movieId);
    } catch(err) {
      throw new Error(err);
    }
  }
}
