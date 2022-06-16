import {FilterType} from './consts.js';

const RATINGS = {
  'movie buff': 21,
  'fun': 11,
  'novice': 1
};

const EXTRA_LIST_CARD_COUNT = 2;

const DESCRIPTION_SYNBOL_COUNT = 140;

// const emotions = ['smile', 'sleeping', 'puke', 'angry'];

const getRandomInteger = (a = 0, b = 1) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));

  return Math.floor(lower + Math.random() * (upper - lower + 1));
};


const getRandomDate = (start, end) => new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));


const shuffleArray = (arr) => {

  const array = arr.slice(0);

  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }

  return array;
};


const splitArray = (array, childArrayLength) => {
  if (childArrayLength >= array.length) {
    return [array.slice()];
  }

  const newArray = [];
  let n = 0;
  while(n <= array.length - 1) {
    newArray.push(array.slice(n, n + childArrayLength));
    n += childArrayLength;
  }

  return newArray;
};


const getUserStatus = (cardsData) => {
  const watchedFilms = cardsData.filter((cardData) => cardData.user_details['already_watched']).length;

  if (watchedFilms >= RATINGS['movie buff']) {
    return 'movie buff';
  }
  if (watchedFilms >= RATINGS['fun']) {
    return 'fan';
  }
  if (watchedFilms >= RATINGS['novice']) {
    return 'novice';
  }

  return '';
};


const getFilterStats = (cardsData) => ({
  [FilterType.WATCHLIST]: cardsData.filter((cardData) => cardData.user_details['watchlist']).length,
  [FilterType.HISTORY]: cardsData.filter((cardData) => cardData.user_details['already_watched']).length,
  [FilterType.FAVORITES]: cardsData.filter((cardData) => cardData.user_details['favorite']).length,
});


const filterCards = (cards, selectedFilter) => {
  const filteredCards = [...cards];

  switch (selectedFilter) {
    case FilterType.ALL:
      return filteredCards;
    case FilterType.WATCHLIST:
      return filteredCards.filter((cardData) => cardData.user_details['watchlist']);
    case FilterType.HISTORY:
      return filteredCards.filter((cardData) => cardData.user_details['already_watched']);
    case FilterType.FAVORITES:
      return filteredCards.filter((cardData) => cardData.user_details['favorite']);
  }
};


const sortCardsByDate = (cardsData) => {
  const sortedCardsData = [...cardsData];

  sortedCardsData.sort((a, b) => {
    const dateA = Date.parse(a.film_info.release.date);
    const dateB = Date.parse(b.film_info.release.date);

    return  dateB - dateA;
  });

  return sortedCardsData;
};


const sortCardsByRating = (cardsData) => {
  const sortedCardsData = [...cardsData];

  sortedCardsData.sort((a, b) => {
    const rateA = a.film_info.total_rating;
    const rateB = b.film_info.total_rating;

    return rateB - rateA;
  });

  return sortedCardsData;
};


const sortCardsByCommentCount = (cardsData) => {
  const sortedCardsData = [...cardsData];

  sortedCardsData.sort((a, b) => b.comments.length - a.comments.length);

  return sortedCardsData;
};


const getTopCards = (cardsData, cardCount = EXTRA_LIST_CARD_COUNT) => {
  if (cardsData.length === 0) {
    return [];
  }

  const topDataCards = sortCardsByRating([...cardsData]).filter((card) => card.film_info.total_rating > 0);

  return topDataCards.slice(0, Math.min(topDataCards.length, cardCount));
};


const getMostCommentedCards = (cardsData) => {
  if (cardsData.length === 0) {
    return [];
  }

  const mostCommentedCards  = sortCardsByCommentCount([...cardsData]);

  return mostCommentedCards;
};


const cropText = (text, symbolCount = DESCRIPTION_SYNBOL_COUNT) => {
  if (text.length > symbolCount) {
    text = `${text.slice(0, symbolCount - 1)}...`;
  }

  return text;
};


export {getRandomInteger, getRandomDate, shuffleArray, splitArray, getUserStatus, getFilterStats, filterCards, sortCardsByDate, sortCardsByRating, cropText, getTopCards, getMostCommentedCards};
