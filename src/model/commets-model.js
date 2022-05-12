import {randomComments} from '../mock/comment.js';

export default class CommentsModel {
  #commentsInfo = [...randomComments];

  getCommentsInfoByIds(idArr){
    return this.#commentsInfo.filter((elem) => idArr.includes(elem.id));
  }
}
