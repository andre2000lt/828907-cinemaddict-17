import {generateCommentInfo} from '../mock/comment.js';

export default class CommentsModel {
  commentsInfo = Array.from({length: 15}, generateCommentInfo);

  getCommentsInfoByIds = (idArr) => this.commentsInfo.filter((elem) => idArr.includes(elem.id));
}
