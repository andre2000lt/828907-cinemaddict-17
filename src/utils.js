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
  } else if (diff < dayCount[2]) {
    return '2 days ago';
  } else if (diff < dayCount[3]) {
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

const updateItem = (items, update) => {
  const index = items.findIndex((item) => item.id === update.id);

  if (index === -1) {
    return items;
  }

  return [
    ...items.slice(0, index),
    update,
    ...items.slice(index + 1),
  ];
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
  'watchlist': cardsData.filter((cardData) => cardData.user_details['watchlist']).length,
  'history': cardsData.filter((cardData) => cardData.user_details['already_watched']).length,
  'favorites': cardsData.filter((cardData) => cardData.user_details['favorite']).length,
});

const sortCardsByDate = (cardsData) => cardsData.sort((a, b) => {
  const dateA = Date.parse(a.film_info.release.date);
  const dateB = Date.parse(b.film_info.release.date);

  return  dateB - dateA;
});

const sortCardsByRating = (cardsData) => cardsData.sort((a, b) => {
  const rateA = a.film_info.total_rating;
  const rateB = b.film_info.total_rating;

  return rateB - rateA;
});


export {getRandomInteger, getRandomDate, shuffleArray, getTimeFromIso, splitArray, emotions, updateItem, getUserStatus, getFilterStats, sortCardsByDate, sortCardsByRating};
