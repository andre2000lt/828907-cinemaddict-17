import CommentsWrapperView from '../view/popup/comments-wrapper-view';
import CommentsListView from '../view/popup/comments-list-view';
import CommentView from '../view/popup/comment-view';
import AddCommentView from '../view/popup/add-comment-view';

import {render} from '../render.js';

export default class CommentsPresenter {
  commentsList = new CommentsListView();
  addComment = new AddCommentView();

  init = (container, commentsModel, commentsIdArr) => {
    this.container = container;
    this.comments = commentsModel.getCommentsInfoByIds(commentsIdArr);
    this.commentsWrapper = new CommentsWrapperView(this.comments.length);

    render(this.commentsWrapper, this.container.getElement());
    render(this.commentsList, this.commentsWrapper.getElement());
    for (let i = 0; i < this.comments.length; i++) {
      render(new CommentView(this.comments[i]), this.commentsList.getElement());
    }
    render(this.addComment, this.container.getElement());
  };
}
