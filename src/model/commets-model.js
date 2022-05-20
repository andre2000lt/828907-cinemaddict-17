import {commentsInfo} from '../mock/comment.js';

export default class CommentsModel {
  #commentsInfo = null;

  constructor() {
    this.#commentsInfo = [...commentsInfo];
  }

  getCommentsInfoByIds(idArr) {
    return this.#commentsInfo.filter((elem) => idArr.includes(elem.id));
  }

}
