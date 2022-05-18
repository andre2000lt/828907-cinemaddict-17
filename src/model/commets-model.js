import {commentsInfo} from '../mock/comment.js';

export default class CommentsModel {
  #commentsInfo = [...commentsInfo];

  getCommentsInfoByIds(idArr) {
    return this.#commentsInfo.filter((elem) => idArr.includes(elem.id));
  }

}
