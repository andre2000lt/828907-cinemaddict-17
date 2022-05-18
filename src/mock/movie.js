import {getRandomInteger, getRandomDate, shuffleArray} from '../utils.js';

const generateTitle = () => {
  const titles = [
    'The Shawshank Redemption',
    'Pulp Fiction',
    'Fight Club',
    'Forrest Gump',
    'The Matrix',
    'Cidade de Deus',
    'Se7en',
    'Whiplash',
    'The Departed',
    'Back to the Future'
  ];

  const randomIndex = getRandomInteger(0, titles.length - 1);

  return titles[randomIndex];
};

const generateRating = () => {
  const rating = getRandomInteger(10, 100);

  return rating / 10;
};

const generatePoster = () => {
  const posters = [
    'made-for-each-other.png',
    'popeye-meets-sinbad.png',
    'sagebrush-trail.jpg',
    'santa-claus-conquers-the-martians.jpg',
    'the-dance-of-life.jpg',
    'the-great-flamarion.jpg',
    'the-man-with-the-golden-arm.jpg',
  ];

  const randomIndex = getRandomInteger(0, posters.length - 1);

  return posters[randomIndex];
};

const generateDescription = () => {
  const text = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras aliquet varius magna, non porta ligula feugiat eget. Fusce tristique felis at fermentum pharetra. Aliquam id orci ut lectus varius viverra. Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante. Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum. Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui. Sed sed nisi sed augue convallis suscipit in sed felis. Aliquam erat volutpat. Nunc fermentum tortor ac porta dapibus. In rutrum ac purus sit amet tempus.';
  const randomIndex = getRandomInteger(1, 5);
  let desc = text.split('.').slice(0, randomIndex).join('.');
  desc += '.';

  return desc;
};

const generateDate = () => {
  const date = getRandomDate(new Date(1950, 0, 1), new Date(2020, 11, 28));

  const month = (`0${date.getMonth() + 1}`).slice(-2);
  const day = (`0${date.getDate()}`).slice(-2);

  return `${date.getFullYear()}-${month}-${day}T00:00:00.000Z`;
};


const generateDateTime = () => {
  const dateTime = getRandomDate(new Date(2000, 0, 1), new Date(2020, 11, 28));

  return dateTime.toISOString();
};

const generateGenres = () => {
  const allGennres = ['Musical', 'Western', 'Drama', 'Comedy', 'Cartoon'];
  const randomCount = getRandomInteger(1, 3);

  return  shuffleArray(allGennres).slice(0, randomCount);
};

const generateWriters = () => {
  const allWriters = ['Anne Wigton', 'Heinz Herald', 'Richard Weil'];
  const randomCount = getRandomInteger(1, 3);

  return  shuffleArray(allWriters).slice(0, randomCount);
};

const generateActors = () => {
  const allActors = ['Morgan Freeman', 'John Travolta', 'Bruce Willis', 'Tom Hanks', 'Brad Pitt', 'Edward Norton', 'Keanu Reeves', 'Russell Crowe', 'Leonardo DiCaprio'];
  const randomCount = getRandomInteger(2, 4);

  return  shuffleArray(allActors).slice(0, randomCount);
};

const generateDuration = () => getRandomInteger(10, 305);

let lastId = 1;

const generateMovieInfo = () => ({
  'id': lastId++,
  'comments': [
    1, 2, 5
  ],
  'film_info': {
    'title': generateTitle(),
    'alternative_title': 'Laziness Who Sold Themselves',
    'total_rating': generateRating(),
    'poster': `images/posters/${generatePoster()}`,
    'age_rating': '21+',
    'director': 'Tom Ford',
    'writers': generateWriters(),
    'actors': generateActors(),
    'release': {
      'date': generateDate(),
      'release_country': 'Finland'
    },
    'runtime': generateDuration(),
    'genre': generateGenres(),
    'description': generateDescription(),
  },
  'user_details': {
    'watchlist': Boolean(getRandomInteger(0, 1)),
    'already_watched': Boolean(getRandomInteger(0, 1)),
    'watching_date': generateDateTime(),
    'favorite': Boolean(getRandomInteger(0, 1))
  }
});

export const moviesInfo = Array.from({length: 25}, generateMovieInfo);
