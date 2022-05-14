import CommentsWrapperView from '../view/popup/comments-wrapper-view';
import CommentsListView from '../view/popup/comments-list-view';
import CommentView from '../view/popup/comment-view';
import AddCommentView from '../view/popup/add-comment-view';

import {render} from '../render.js';

export default class CommentsPresenter {
  #commentsList = new CommentsListView();
  #addComment = new AddCommentView();
  #container = null;
  #commentsWrapper = null;

  #comments = []; // все комменты к выьранному фильму

  constructor(container, comments) {
    this.#container = container;
    this.#comments = comments;
    this.#commentsWrapper = new CommentsWrapperView(this.#comments.length);
  }

  init() {


    render(this.#commentsWrapper, this.#container.element);
    render(this.#commentsList, this.#commentsWrapper.element);
    for (let i = 0; i < this.#comments.length; i++) {
      render(new CommentView(this.#comments[i]), this.#commentsList.element);
    }
    render(this.#addComment, this.#container.element);
  }
}
