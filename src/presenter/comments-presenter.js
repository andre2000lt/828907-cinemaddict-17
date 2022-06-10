import CommentsWrapperView from '../view/popup/comments-wrapper-view';
import CommentsListView from '../view/popup/comments-list-view';
import CommentView from '../view/popup/comment-view';
import AddCommentView from '../view/popup/add-comment-view';

import {UserAction, UpdateType} from '../consts';

import {render, remove, replace} from '../framework/render.js';

export default class CommentsPresenter {
  #commentsList = null;
  #addComment = new AddCommentView();
  #container = null;
  #commentsWrapper = null;

  #commentsModel = null;
  #comments = []; // все комменты к выьранному фильму

  #movieCard = null;
  #updateCard = null;

  constructor(container, updateCard, commentsModel) {
    this.#container = container;
    this.#updateCard = updateCard;
    this.#commentsModel = commentsModel;

    document.addEventListener('keydown', this.onEnterKeyDown);
  }

  init(movieCard, comments) {
    this.#movieCard = movieCard;
    this.#comments = comments;


    const prevCommentsWrapper = this.#commentsWrapper;
    this.#commentsWrapper = new CommentsWrapperView(this.#comments.length);
    this.#commentsList = new CommentsListView();

    render(this.#commentsWrapper, this.#container.element);
    render(this.#commentsList, this.#commentsWrapper.element);
    for (let i = 0; i < this.#comments.length; i++) {
      const comment = new CommentView(this.#comments[i]);
      comment.setCommentDeleteHandler(this.#onCommentDelete);
      render(comment, this.#commentsList.element);
    }

    if (prevCommentsWrapper !== null) {
      replace(this.#commentsWrapper, prevCommentsWrapper);
      remove(prevCommentsWrapper);
      return;
    }

    render(this.#addComment, this.#container.element);
  }

  #onCommentDelete = (commentId) => {
    let comments = new Set(this.#movieCard.comments);
    comments.delete(commentId);
    comments = Array.from(comments);
    this.#movieCard.comments = [...comments];
    this.#updateCard(UserAction.UPDATE_CARD, UpdateType.PATCH, this.#movieCard);

    this.#commentsModel.deleteComment(commentId);
  };

  onEnterKeyDown = (evt) => {
    if (evt.key === 'Enter' && evt.ctrlKey) {
      evt.preventDefault();

      const comment = this.#addComment.getNewComment();
      if(!comment) {
        return;
      }

      const commentId = this.#commentsModel.generateNewCommentId();
      comment.id = commentId;
      this.#commentsModel.addComment(comment);
      this.#addComment.reset();

      this.#movieCard.comments.push(commentId);
      this.#updateCard(UserAction.UPDATE_CARD, UpdateType.PATCH, this.#movieCard);
    }
  };
}
