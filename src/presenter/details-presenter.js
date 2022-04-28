import DetailsView from '../view/popup/details-view';
import DetailsFormView from '../view/popup/details-form-view';
import DetailsTopView from '../view/popup/details-top-view';
import DetailsBottomView from '../view/popup/details-bottom-view';
import DetailsCloseView from '../view/popup/details-close-view';
import DetailsInfoView from '../view/popup/details-info-view';
import DetailsControlsView from '../view/popup/details-controls-view';

import CommentsWrapperView from '../view/popup/comments-wrapper-view';
import CommentsListView from '../view/popup/comments-list-view';
import CommentView from '../view/popup/comment-view';
import AddCommentView from '../view/popup/add-comment-view';

import {render} from '../render.js';

export default class FilmsListPresenter {
  details = new DetailsView();
  detailsForm = new DetailsFormView();

  detailsTop = new DetailsTopView();
  detailsClose = new DetailsCloseView();
  detailsInfo = new DetailsInfoView();
  detailsControls = new DetailsControlsView();

  detailsBottom = new DetailsBottomView();
  commentsWrapper = new CommentsWrapperView();
  commentsList = new CommentsListView();
  addComment = new AddCommentView();

  init = (container) => {
    this.container = container;

    render(this.details, this.container, 'afterend');
    render(this.detailsForm, this.details.getElement());

    render(this.detailsTop, this.detailsForm.getElement());
    render(this.detailsClose, this.detailsTop.getElement());
    render(this.detailsInfo, this.detailsTop.getElement());
    render(this.detailsControls, this.detailsTop.getElement());

    render(this.detailsBottom, this.detailsForm.getElement());
    render(this.commentsWrapper, this.detailsBottom.getElement());
    render(this.commentsList, this.detailsBottom.getElement());
    for (let i = 0; i < 4; i++) {
      render(new CommentView(), this.commentsList.getElement());
    }
    render(this.addComment, this.detailsBottom.getElement());
  };
}
