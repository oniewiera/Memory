const cards = [
  {
    id: 1,
    src: "img/one.png"
  },
  {
    id: 2,
    src: "img/two.png"
  },
  {
    id: 3,
    src: "img/three.png"
  },
  {
    id: 4,
    src: "img/four.png"
  },
  {
    id: 5,
    src: "img/five.png"
  },
  {
    id: 6,
    src: "img/six.png"
  },
  {
    id: 7,
    src: "img/seven.png"
  },
  {
    id: 8,
    src: "img/eight.png"
  },
  {
    id: 9,
    src: "img/nine.png"
  },
  {
    id: 10,
    src: "img/ten.png"
  }
];

let matchingList = [];
let movesCounter = 0;
const game = document.getElementById("game");
let timerTimeout;

startGame = () => {
  initializeGame();
  let duplicatedNumbers = duplicateCards(cards);
  let shuffledArray = shuffleTable(duplicatedNumbers);
  createCardsStructure(shuffledArray);
};

initializeGame = () => {
  startTimer();
  showGrid();
  removeAllCards();
};

createCardsStructure = shuffledArray => {
  for (let i = 0; i < shuffledArray.length; i++) {
    let card = document.createElement("div");
    addProperties(card, i, shuffledArray);
    game.appendChild(card);
    prepareBackAndFront(card);
    $(`#${card.id}`).flip({ trigger: "manual" });
    card.addEventListener("click", cardClicked.bind(this, card));
  }
};

addProperties = (card, id, shuffled) => {
  card.className = "card";
  card.id = `card${id}`;
  card.dataset.clicked = "false";
  card.dataset.bg = shuffled[id].src;
  card.dataset.key = shuffled[id].id;
};

duplicateCards = cards => {
  return cards.concat(cards);
};

prepareBackAndFront = card => {
  let front = document.createElement("div");
  front.className = "front";
  let back = document.createElement("div");
  back.className = "back";
  back.style.background = `url(${card.dataset.bg})`;
  card.appendChild(front);
  card.appendChild(back);
};

shuffleTable = duplicatedNumbers => {
  return duplicatedNumbers.sort(() => Math.random() - 0.5);
};

showGrid = () => {
  game.style.visibility = "visible";
};

cardClicked = card => {
  $(`#${card.id}`).flip(true);
  if (matchingList.length == 0) hideOthersContent(matchingList);

  card.dataset.clicked = "true";

  if (matchingList.length < 2 && matchingList[0] != card)
    matchingList.push(card);

  if (matchingList.length == 2) {
    if (matchingList[0].dataset.key == matchingList[1].dataset.key) {
      matchingList[0].style.visibility = "hidden";
      matchingList[1].style.visibility = "hidden";
    }
    matchingList = [];
    checkIfGameOver()
      ? finishGame()
      : (document.getElementById(
          "score"
        ).innerHTML = `Total moves: ${++movesCounter}`);
  }
};

removeAllCards = () => {
  document.getElementById("par").innerHTML = "Train your brain. Good luck.";
  document.getElementById("start").innerText = "RESTART";
  document.getElementById("score").innerHTML = "Total moves: 0";
  matchingList = [];
  movesCounter = 0;
  while (game.firstChild) {
    game.removeChild(game.firstChild);
  }
};

hideOthersContent = matchingList => {
  for (let element of game.children) {
    if (element.dataset.clicked == "true") {
      $(`#${element.id}`).flip(false);
      element.dataset.clicked = "false";
    }
  }
};

checkIfGameOver = () => {
  for (var cards of game.children) {
    if (cards.style.visibility != "hidden") return false;
  }
  return true;
};

startTimer = () => {
  let timer = document.getElementById("timer");
  clearTimer(timer);
  triggerTimer(timer);
};

triggerTimer = timer => {
  timerTimeout = setTimeout(nextSecond.bind(this, timer), 1000);
};

nextSecond = timer => {
  seconds++;
  if (seconds >= 60) {
    seconds = 0;
    minutes++;
  }

  timer.textContent = `${
    minutes ? (minutes > 9 ? minutes : "0" + minutes) : "00"
  }:${seconds > 9 ? seconds : "0" + seconds}`;

  triggerTimer(timer);
};

clearTimer = timer => {
  clearTimeout(timerTimeout);
  timer.innerHTML = "00:00";
  seconds = 0;
  minutes = 0;
};

stopTimer = () => {
  clearTimeout(timerTimeout);
};

finishGame = () => {
  document.getElementById("moves").innerHTML = "Congratulations! Total moves:";
  document.getElementById("timer").innerHTML = `Your time: ${
    document.getElementById("timer").innerHTML
  }`;
  stopTimer();
};
