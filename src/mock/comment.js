import {getRandomInteger, getRandomDate, emotions} from '../utils.js';

const generateAuthor = () => {
  const allAuthors = ['Morgan', 'John', 'Bruce', 'Tom', 'Brad', 'Edward', 'Keanu', 'Russell', 'Leonardo'];
  const randomIndex = getRandomInteger(0, allAuthors.length - 1);

  return allAuthors[randomIndex];
};

const generateComment = () => {
  const text = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras aliquet varius magna, non porta ligula feugiat eget. Fusce tristique felis at fermentum pharetra. Aliquam id orci ut lectus varius viverra. Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante. Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum. Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui. Sed sed nisi sed augue convallis suscipit in sed felis. Aliquam erat volutpat. Nunc fermentum tortor ac porta dapibus. In rutrum ac purus sit amet tempus.';
  const randomIndex = getRandomInteger(1, 5);
  let comm = text.split('.').slice(0, randomIndex).join('.');
  comm += '.';

  return comm;
};

const generateDateTime = () => {
  const dateTime = getRandomDate(new Date(2022, 3, 25), new Date(2022, 4, 1));

  return dateTime.toISOString();
};


const generateEmotion = () => {
  const randomIndex = getRandomInteger(0, emotions.length - 1);

  return emotions[randomIndex];
};


let lastId = 1;

const generateCommentInfo = () => ({
  'id': lastId++,
  'author': generateAuthor(),
  'comment': generateComment(),
  'date': generateDateTime(),
  'emotion': generateEmotion()
});

export const commentsInfo = Array.from({length: 15}, generateCommentInfo);
