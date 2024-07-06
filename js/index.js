"use strict";

const playerBoxs = document.getElementsByClassName("box");
const playerSavedScores = document.getElementsByClassName(
  "box__save__score-number"
);
const playerTotalScores = document.getElementsByClassName("box__total-score");
const [newGameBtn] = document.getElementsByClassName("btns-img__new-game");
const [rollDiceBtn] = document.getElementsByClassName("btns-img__roll-dice");
const [saveScoreBtn] = document.getElementsByClassName("btns-img__save");
const [diceImg] = document.getElementsByClassName("btns-img__dice-img");

const rollDice = function () {
  return Math.trunc(Math.random() * 6 + 1);
};

const initialization = function () {
  activeplayer = 0;
  playerBoxs[0].classList.add("active");
  playerBoxs[1].classList.remove("active");
  diceImg.classList.add("hidden");
  for (let i = 0; i < 2; i++) {
    playerBoxs[i].classList.remove("winner");
    playerTotalScores[i].textContent = 0;
    playerSavedScores[i].textContent = 0;
    totalScore[i] = 0;
    tempScore[i] = 0;
  }
  gameIsOn = true;
};

const changePlayer = function () {
  activeplayer = activeplayer === 0 ? 1 : 0;
  playerBoxs[0].classList.toggle("active");
  playerBoxs[1].classList.toggle("active");
};

let gameIsOn;
let activeplayer;
const totalScore = [0, 0];
const tempScore = [0, 0];

initialization();

newGameBtn.addEventListener("click", function () {
  initialization();
});

rollDiceBtn.addEventListener("click", function () {
  if (gameIsOn === true) {
    const diceOutcome = rollDice();
    diceImg.src = `./img/dice-${diceOutcome}.png`;
    diceImg.classList.remove("hidden");
    if (diceOutcome !== 1) {
      tempScore[activeplayer] += diceOutcome;
      playerSavedScores[activeplayer].textContent = tempScore[activeplayer];
    } else {
      tempScore[activeplayer] = 0;
      playerSavedScores[activeplayer].textContent = 0;
      changePlayer();
    }
  }
});

saveScoreBtn.addEventListener("click", function () {
  totalScore[activeplayer] += tempScore[activeplayer];
  playerTotalScores[activeplayer].textContent = totalScore[activeplayer];
  tempScore[activeplayer] = 0;
  playerSavedScores[activeplayer].textContent = 0;
  if (totalScore[activeplayer] >= 100) {
    playerBoxs[activeplayer].classList.add("winner");
    gameIsOn = false;
  } else {
    changePlayer();
  }
});
