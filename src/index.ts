import './styles/index.scss';
import dotenv from 'dotenv';
import Board from './scripts/Board';
const sound = require('./sound/click.wav');

window.addEventListener('DOMContentLoaded', (): void => {
  document.addEventListener('click', (): void => {
    new Audio(sound).play();
  });
});

enum test {
  A = 1,
  B = 5,
  C,
  D = 0
}
console.log(test);
