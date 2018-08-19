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
        src: "img/three.png",
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

createTiles=()=>{
    showGrid();
    removeAllCards();
    let duplicatedNumbers = duplicateCards(cards);
    let shuffled = shuffleTable(duplicatedNumbers);
    for (let i = 0; i<shuffled.length;i++){
    let card = document.createElement("div");
    card.className= "cont";
    card.dataset.id = i;
    card.id = `card${i}`;
    card.dataset.clicked = "false";
    card.dataset.bg = shuffled[i].src;
    card.dataset.key = shuffled[i].id;
    game.appendChild(card);
    prepareBackAndFront(card);
    $(`#${card.id}`).flip({ trigger: "manual" });

    card.addEventListener("click", cardClicked.bind(this, card));
    }
}

duplicateCards=(cards)=>{
    return cards.concat(cards);
}

prepareBackAndFront = (card)=>{
    let front = document.createElement("div");
    front.className = "front";
    let back = document.createElement("div");
    back.className = "back";
    back.style.background = `url(${card.dataset.bg})`;
    card.appendChild(front);
    card.appendChild(back);
};

shuffleTable = duplicatedNumbers=>{
return duplicatedNumbers.sort(() => Math.random() - 0.5);
}

showGrid=()=>{
     game.style.visibility = "visible";
}
 
cardClicked = card=>{
$(`#${card.id}`).flip(true);
if (matchingList.length == 0)
    hideOthersContent(matchingList);


card.dataset.clicked = "true";
if(matchingList.length < 2 && matchingList[0]!=card)
    matchingList.push(card);

if(matchingList.length == 2){
    checkIfGameOver() ? (document.getElementById("par").innerHTML = "Congratulations!") : document.getElementById("score").innerHTML = ++movesCounter;
    if(matchingList[0].dataset.key == matchingList[1].dataset.key){
        matchingList[0].style.visibility = "hidden";
        matchingList[1].style.visibility = "hidden";
    }

    matchingList = [];
}
};

removeAllCards=()=>{
    document.getElementById("par").innerHTML = "Train your brain.";
    document.getElementById("start").innerText = "RESTART";
     matchingList = [];
     movesCounter = 0;
    document.getElementById("score").innerHTML ="0";
    let game = document.getElementById("game");
    while (game.firstChild) {
      game.removeChild(game.firstChild);
    }
};

hideOthersContent = (matchingList)=>{
for (var element of game.children) {
  if (element.dataset.clicked == "true"){
   $(`#${element.id}`).flip(false);
    console.log(element.id);
    element.dataset.clicked = 'false';
  }
}
};

checkIfGameOver=()=>{
    for(var cards of game.children){
        if(cards.style.visibility != "hidden")
            return false;
    }
    return true;
}