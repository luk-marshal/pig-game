'use strict';

//Elements
let dice = 0;
let acumulatedDices = [];
let acumulatedValue;
let activePlayer, inactivePlayer;

const diceEl = document.querySelector('.dice');
const btnNewEl = document.querySelector('.btn--new');
const btnRollEl = document.querySelector('.btn--roll');
const btnHoldEl = document.querySelector('.btn--hold');
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const scorePlayer0El = document.querySelector('#score--0');
const scorePlayer1El = document.querySelector('#score--1');
const currentPlayer0El = document.querySelector('#current--0');
const currentPlayer1El = document.querySelector('#current--1');

const diceRoll = function () {
  dice = Math.trunc(Math.random() * 6) + 1;
  diceEl.src = `dice-${dice}.png`;
  diceEl.classList.remove('hidden');
  btnNewEl.classList.remove('hidden');
  upadteAcumulatedValue();
};

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
};

const switchActivePlayer = function (setActive = -1) {
  acumulatedDices = [];
  acumulatedValue = 0;

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

  activePlayer.current.textContent = 0;
  inactivePlayer.current.textContent = 0;

  //   diceEl.classList.add('hidden');
  diceEl.src = 'dice-1.png';
};

const upadteAcumulatedValue = function () {
  if (dice === 1) {
    switchActivePlayer();
  } else {
    acumulatedDices.push(dice);
    acumulatedValue = acumulatedDices.reduce(
      (accumulator, currentValue) => accumulator + currentValue,
      0
    );
    activePlayer.current.textContent = acumulatedValue;
  }
};

const gameWon = function () {
  diceEl.classList.add('hidden');
  activePlayer.classList.add('player--winner');
  btnRollEl.classList.add('hidden');
  btnHoldEl.classList.add('hidden');
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
  switchActivePlayer(0);

  activePlayer.score.textContent = 0;
  inactivePlayer.score.textContent = 0;
  activePlayer.current.textContent = 0;
  inactivePlayer.current.textContent = 0;

  activePlayer.classList.remove('player--winner');
  // inactivePlayer.classList.remove('player--winner');

  btnNewEl.classList.add('hidden');
  btnRollEl.classList.remove('hidden');
  btnHoldEl.classList.remove('hidden');
};

// Buttons
btnNewEl.addEventListener('click', newGame);
btnRollEl.addEventListener('click', diceRoll);
btnHoldEl.addEventListener('click', holdPoints);

newGame();
