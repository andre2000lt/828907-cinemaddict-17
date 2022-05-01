import DetailsView from '../view/popup/details-view';
import DetailsFormView from '../view/popup/details-form-view';
import DetailsTopView from '../view/popup/details-top-view';
import DetailsBottomView from '../view/popup/details-bottom-view';
import DetailsCloseView from '../view/popup/details-close-view';
import DetailsInfoView from '../view/popup/details-info-view';
import DetailsControlsView from '../view/popup/details-controls-view';

import CommentsPresenter from './comments-presenter';
import CommentsModel from '../model/commets-model';

import {render} from '../render.js';

export default class DetailsPresenter {
  details = new DetailsView();
  detailsForm = new DetailsFormView();

  detailsTop = new DetailsTopView();
  detailsClose = new DetailsCloseView();

  detailsBottom = new DetailsBottomView();

  commentsPresenter = new CommentsPresenter();
  commentsModel = new CommentsModel();


  init = (container, moviesModel) => {
    this.container = container;
    this.moviesCards = moviesModel.getMoviesInfo();

    render(this.details, this.container, 'afterend');
    render(this.detailsForm, this.details.getElement());

    render(this.detailsTop, this.detailsForm.getElement());
    render(this.detailsClose, this.detailsTop.getElement());
    render(new DetailsInfoView(this.moviesCards[0]), this.detailsTop.getElement());
    render(new DetailsControlsView(this.moviesCards[0]), this.detailsTop.getElement());

    render(this.detailsBottom, this.detailsForm.getElement());

    this.commentsPresenter.init(this.detailsBottom, this.commentsModel, this.moviesCards[0].comments);
  };
}
