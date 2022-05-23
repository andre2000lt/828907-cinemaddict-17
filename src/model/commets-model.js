import {commentsInfo} from '../mock/comment.js';

export default class CommentsModel {
  #commentsInfo = null;

  constructor() {
    this.#commentsInfo = [...commentsInfo];
  }

  getCommentsInfoByIds(ids) {
    return this.#commentsInfo.filter((elem) => ids.includes(elem.id));
  }
}
