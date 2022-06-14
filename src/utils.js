import {FilterType} from './consts.js';

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

const getTimeFromIso = (isoDate) => {
  const dayCount = {
    '1': 86400000,
    '2': 172800000,
    '3': 259200000
  };

  const dateNow = new Date();
  const commDate = new Date(Date.parse(isoDate));

  const diff = +dateNow - Date.parse(isoDate);

  if (diff < dayCount[1]) {
    return (dateNow.getDate === commDate.getDate) ? 'Today' : '1 day ago';
  }

  if (diff < dayCount[2]) {
    return '2 days ago';
  }

  if (diff < dayCount[3]) {
    return '3 days ago';
  }

  const month = (`0${commDate.getMonth() + 1}`).slice(-2);
  const day = (`0${commDate.getDate()}`).slice(-2);
  const hours = (`0${commDate.getHours()}`).slice(-2);
  const minutes = (`0${commDate.getMinutes()}`).slice(-2);


  return `${commDate.getFullYear()}/${month}/${day} ${hours}:${minutes}`;
};

const emotions = ['smile', 'sleeping', 'puke', 'angry'];

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


const RATINGS = {
  'movie buff': 21,
  'fun': 11,
  'novice': 1
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

const cropText = (text, symbolCount = 140) => {
  if (text.length > symbolCount) {
    text = `${text.slice(0, symbolCount - 1)}...`;
  }

  return text;
};


export {getRandomInteger, getRandomDate, shuffleArray, getTimeFromIso, splitArray, emotions, getUserStatus, getFilterStats, filterCards, sortCardsByDate, sortCardsByRating, cropText};
