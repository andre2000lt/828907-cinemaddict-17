import {commentsInfo} from '../mock/comment.js';

export default class CommentsModel{
  #commentsInfo = null;

  constructor() {
    this.#commentsInfo = [...commentsInfo];
  }

  get comments() {
    return this.#commentsInfo;
  }

  getCommentsInfoByIds(ids) {
    return this.#commentsInfo.filter((elem) => ids.includes(elem.id));
  }

  generateNewCommentId() {
    const lastId =  this.#commentsInfo[this.#commentsInfo.length - 1].id;
    return (+lastId + 1).toString();
  }

  addComment(comment) {
    this.#commentsInfo.push(comment);
  }

  deleteComment(commentId) {
    const index = this.#commentsInfo
      .findIndex((comment) => comment.id === commentId);

    this.#commentsInfo = [
      ...this.#commentsInfo.slice(0, index),
      ...this.#commentsInfo.slice(index + 1),
    ];
  }
}
