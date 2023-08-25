'use strict';

//Elements
const dice = {
  value: 0,
  img: document.querySelector('.dice'),
};

const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');

const scorePlayer0El = document.querySelector('#score--0');
const scorePlayer1El = document.querySelector('#score--1');

const currentPlayer0El = document.querySelector('#current--0');
const currentPlayer1El = document.querySelector('#current--1');

const diceRoll = function () {
  dice.value = Math.trunc(Math.random() * 6) + 1;
  //   console.log(dice.value);

  switch (dice.value) {
    case 1:
      dice.img.src = 'dice-1.png';
      break;
    case 2:
      dice.img.src = 'dice-2.png';
      break;
    case 3:
      dice.img.src = 'dice-3.png';
      break;
    case 4:
      dice.img.src = 'dice-4.png';
      break;
    case 5:
      dice.img.src = 'dice-5.png';
      break;
    case 6:
      dice.img.src = 'dice-6.png';
      break;
    default:
      break;
  }
  //   console.log(dice.img);

  dice.img.classList.remove('hidden');
  upadteAcumulatedValue();
  return dice.value;
};

let activePlayer;
let inactivePlayer;
const checkActivePlayer = function () {
  if (player0El.classList.contains('player--active')) {
    activePlayer = player0El;
    activePlayer.score = scorePlayer0El;
    activePlayer.current = currentPlayer0El;
    inactivePlayer = player1El;
    inactivePlayer.score = scorePlayer1El;
    inactivePlayer.current = currentPlayer1El;
  } else if (player1El.classList.contains('player--active')) {
    activePlayer = player1El;
    activePlayer.score = scorePlayer1El;
    activePlayer.current = currentPlayer1El;
    inactivePlayer = player0El;
    inactivePlayer.score = scorePlayer0El;
    inactivePlayer.current = currentPlayer0El;
  }
  return activePlayer;
};

let acumulatedDices = [];
let acumulatedValue;

const switchActivePlayer = function (setActive = -1) {
  checkActivePlayer();
  if (setActive === 0) {
    player0El.classList.add('player--active');
    player1El.classList.remove('player--active');
  } else if (setActive === 1) {
    player1El.classList.add('player--active');
    player0El.classList.remove('player--active');
  } else {
    activePlayer.classList.remove('player--active');
    inactivePlayer.classList.add('player--active');
  }
  checkActivePlayer();

  acumulatedDices = [];
  acumulatedValue = 0;

  currentPlayer0El.textContent = 0;
  currentPlayer1El.textContent = 0;

  //   dice.img.classList.add('hidden');
  dice.img.src = 'dice-1.png';

  return activePlayer;
};

const upadteAcumulatedValue = function () {
  if (dice.value === 1) {
    // acumulatedDices = []; TODO:
    // acumulatedValue = 0;
    switchActivePlayer();
  } else {
    acumulatedDices.push(dice.value);

    acumulatedValue = acumulatedDices.reduce(
      (accumulator, currentValue) => accumulator + currentValue,
      0
    );
    console.log(
      `Current sum: ${acumulatedValue}, Active Player: ${activePlayer.classList[1]}`
    );
    console.log(`All dices ${acumulatedDices}`);

    activePlayer.current.textContent = acumulatedValue;
  }

  return acumulatedValue;
};

const gameWon = function () {
  dice.img.classList.add('hidden');
  activePlayer.classList.add('player--winner');
};

const holdPoints = function () {
  let score = Number(activePlayer.score.textContent);
  score += acumulatedValue;
  activePlayer.score.textContent = score;

  if (score >= 100) {
    gameWon();
  } else {
    switchActivePlayer();
  }
};

//Set initial values
const newGame = function () {
  scorePlayer0El.textContent = 0;
  scorePlayer1El.textContent = 0;

  currentPlayer0El.textContent = 0;
  currentPlayer0El.textContent = 0;

  acumulatedDices = [];
  acumulatedValue = 0;

  switchActivePlayer(0);
  player0El.classList.remove('player--winner');
  player1El.classList.remove('player--winner');

  //TODO: dodać znikanie kostki przy nowej grze i pojawianie się po rzucie
  //TODO: dodać wygrywanie i zaciemnienie pola wygranej osoby
};

// Buttons
document.querySelector('.btn--roll').addEventListener('click', diceRoll);
document.querySelector('.btn--new').addEventListener('click', newGame);
document.querySelector('.btn--hold').addEventListener('click', holdPoints);

newGame();
