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
  const watchedFilms = cardsData.reduce((sum, curr) => sum + +(curr.user_details['already_watched']), 0);
  if (watchedFilms >= RATINGS['movie buff']) {
    return 'movie buff';
  } else if (watchedFilms >= RATINGS['fun']) {
    return 'fan';
  } else if (watchedFilms >= RATINGS['novice']) {
    return 'novice';
  } else {
    return '';
  }
};


const getFilterStats = (cardsData) => ({
  'watchlist': cardsData.reduce((sum, curr) => sum + +(curr.user_details['watchlist']), 0),
  'history': cardsData.reduce((sum, curr) => sum + +(curr.user_details['already_watched']), 0),
  'favorites': cardsData.reduce((sum, curr) => sum + +(curr.user_details['favorite']), 0),
});


export {getRandomInteger, getRandomDate, shuffleArray, getTimeFromIso, splitArray, emotions, updateItem, getUserStatus, getFilterStats};
