const ListType = {
  'MAIN': 'main',
  'TOP': 'top',
  'MOST_COMMENTED': 'most commented'
};

const SortType = {
  'DEFAULT': 'default',
  'DATE': 'date',
  'RATING': 'rating'
};

const Emoji = {
  'SMILE': 'smile',
  'SLEEPING': 'sleeping',
  'PUKE': 'puke',
  'ANGRY': 'angry'
};

const UserAction = {
  UPDATE_CARD: 'UPDATE_CARD',
  ADD_CARD: 'ADD_CARD',
  DELETE_CARD: 'DELETE_CARD',
  ADD_COMMENT: 'ADD_COMMENT',
  DELETE_COMMENT: 'DELETE_COMMENT',
};

const UpdateType = {
  PATCH: 'PATCH',
  MINOR: 'MINOR',
  MAJOR: 'MAJOR',
  INIT: 'INIT',
  DELETE_COMMENT: 'DELETE_COMMENT',
  ADD_COMMENT: 'ADD_COMMENT',
  CHANGE_FILTER: 'CHANGE_FILTER',
};

const FilterType = {
  ALL: 'all',
  WATCHLIST: 'watchlist',
  HISTORY: 'history',
  FAVORITES: 'favorites',
};

export {ListType, SortType, Emoji, UserAction, UpdateType, FilterType};
