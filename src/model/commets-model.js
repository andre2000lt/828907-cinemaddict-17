export default class CommentsModel{
  #commentsApiService = null;

  constructor(commentsApiService) {
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

  addComment() {

  }

  deleteComment() {

  }
}
