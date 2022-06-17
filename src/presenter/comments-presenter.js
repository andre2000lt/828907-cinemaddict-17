import CommentsWrapperView from '../view/popup/comments-wrapper-view';
import CommentsListView from '../view/popup/comments-list-view';
import CommentView from '../view/popup/comment-view';
import AddCommentView from '../view/popup/add-comment-view';

import {render, remove, replace} from '../framework/render.js';

import UiBlocker from '../framework/ui-blocker/ui-blocker.js';

const TimeLimit = {
  LOWER_LIMIT: 350,
  UPPER_LIMIT: 1000,
};

export default class CommentsPresenter {
  #commentsList = null;
  #addComment = new AddCommentView();
  #container = null;
  #commentsWrapper = null;

  #commentsModel = null;
  #comments = []; // все комменты к выьранному фильму
  #commentViews = new Map();

  #movieCard = null;

  #uiBlocker = new UiBlocker(TimeLimit.LOWER_LIMIT, TimeLimit.UPPER_LIMIT);

  constructor(container, commentsModel) {
    this.#container = container;
    this.#commentsModel = commentsModel;

    document.addEventListener('keydown', this.enterKeyDownHandler);
  }

  init(movieCard, comments) {
    this.#movieCard = movieCard;
    this.#comments = comments;


    const prevCommentsWrapper = this.#commentsWrapper;
    this.#commentsWrapper = new CommentsWrapperView(this.#comments.length);
    this.#commentsList = new CommentsListView();
    this.#commentViews.clear();

    render(this.#commentsWrapper, this.#container.element);
    render(this.#commentsList, this.#commentsWrapper.element);
    for (const comment of this.#comments) {
      const commentView = new CommentView(comment);
      commentView.setCommentDeleteHandler(this.#CommentDeleteHandler);
      this.#commentViews.set(comment.id, commentView);
      render(commentView, this.#commentsList.element);
    }

    if (prevCommentsWrapper !== null) {
      replace(this.#commentsWrapper, prevCommentsWrapper);
      remove(prevCommentsWrapper);
      return;
    }

    render(this.#addComment, this.#container.element);
  }

  #CommentDeleteHandler = async (commentId) => {
    this.#commentViews.get(commentId).updateElement({isDeleting: true});

    this.#uiBlocker.block();

    try {
      await this.#commentsModel.deleteComment(commentId, this.#movieCard.id);
    } catch(err) {
      this.#commentViews.get(commentId).updateDeleteButton({isDeleting: false});
    }

    this.#uiBlocker.unblock();
  };

  enterKeyDownHandler = async (evt) => {
    if (evt.key === 'Enter' && evt.ctrlKey) {
      evt.preventDefault();

      const comment = this.#addComment.getNewComment();
      if(!comment) {
        return;
      }

      this.#addComment.updateElement({isSaving: true});

      this.#uiBlocker.block();

      try {
        await this.#commentsModel.addComment(comment, this.#movieCard.id);
        this.#addComment.reset();
      } catch(err) {
        this.#addComment.shake(this.#abortAction);
      }

      this.#uiBlocker.unblock();
    }
  };

  #abortAction = () => {
    this.#addComment.updateElement({isSaving: false});
  };
}
