'use strict';

//Elements
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

//Variables
let dice,
  scores,
  activePlayer = 0;
let accmulatedDices, accmulatedValue;

let activePlayerEl = document.querySelector(`.player--${activePlayer}`);

const diceRoll = function () {
  dice = Math.trunc(Math.random() * 6) + 1;
  diceEl.src = `dice-${dice}.png`;

  //
  diceEl.classList.remove('hidden');
  btnNewEl.classList.remove('hidden');

  const currentActivePlayerEl = document.querySelector(
    `#current--${activePlayer}`
  );

  if (dice === 1) {
    currentActivePlayerEl.textContent = 0;
    switchActivePlayer();
  } else {
    accmulatedDices.push(dice);
    accmulatedValue = accmulatedDices.reduce(
      (accumulator, currentValue) => accumulator + currentValue,
      0
    );
    currentActivePlayerEl.textContent = accmulatedValue;
  }
};

const checkActivePlayer = function () {
  activePlayer.score = document.querySelector(`#score--${activePlayer}`);
  activePlayer.current = document.querySelector(`#current--${activePlayer}`);
};

const switchActivePlayer = function () {
  accmulatedDices = [];
  accmulatedValue = 0;

  if (activePlayer === 1) {
    player0El.classList.add('player--active');
    player1El.classList.remove('player--active');
    currentPlayer1El.textContent = 0;
  } else if (activePlayer === 0) {
    player1El.classList.add('player--active');
    player0El.classList.remove('player--active');
    currentPlayer0El.textContent = 0;
  }

  activePlayer = activePlayer === 0 ? 1 : 0;
  activePlayerEl = document.querySelector(`.player--${activePlayer}`);
  //   diceEl.classList.add('hidden');
  diceEl.src = 'dice-1.png';
};

const holdPoints = function () {
  scores[activePlayer] += accmulatedValue;

  const scoreActivePlayerEl = document.querySelector(`#score--${activePlayer}`);
  scoreActivePlayerEl.textContent = scores[activePlayer];

  if (scores[activePlayer] >= 100) {
    gameWon();
  } else {
    switchActivePlayer();
  }
};

//Set initial values
const newGame = function () {
  accmulatedDices = [];
  accmulatedValue = 0;
  scores = [0, 0];

  activePlayerEl.classList.remove('player--winner');

  scorePlayer0El.textContent = 0;
  scorePlayer1El.textContent = 0;
  currentPlayer0El.textContent = 0;
  currentPlayer1El.textContent = 0;

  if (activePlayer != 0) switchActivePlayer();
  // const activePlayerEl = document.querySelector(`.player--${activePlayer}`);

  btnNewEl.classList.add('hidden');
  btnRollEl.classList.remove('hidden');
  btnHoldEl.classList.remove('hidden');
};

const gameWon = function () {
  diceEl.classList.add('hidden');
  activePlayerEl.classList.add('player--winner');
  btnRollEl.classList.add('hidden');
  btnHoldEl.classList.add('hidden');
};

// Buttons
btnNewEl.addEventListener('click', newGame);
btnRollEl.addEventListener('click', diceRoll);
btnHoldEl.addEventListener('click', holdPoints);

newGame();
