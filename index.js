const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
let clickingAllowed = true;
let matchingList = [];
let movesCounter = 0;
const game = document.getElementById("game");
createTiles=()=>{
    removeAllCards();
    let duplicatedNumbers = duplicateCards(numbers);
    let shuffled = shuffleTable(duplicatedNumbers);
    for (let i = 0; i<shuffled.length;i++){
    var card = document.createElement("div");
    card.className= "cont";
    card.appendChild(
    document.createTextNode("Click me!")
    );
    card.dataset.id = i;
    card.dataset.clicked = "false";
    card.dataset.key = shuffled[i];
    card.addEventListener("click", cardClicked.bind(this, card));
    game.appendChild(card);
    }
}
duplicateCards=(cards)=>{
    return cards.concat(cards);
}

shuffleTable = duplicatedNumbers=>{
return duplicatedNumbers.sort(() => Math.random() - 0.5);
}
 
cardClicked = card=>{
console.log(card.dataset.key);
card.dataset.clicked = "true";
hideOthersContent();
card.innerHTML=card.dataset.key;
if(matchingList.length < 2 && matchingList[0]!=card){
    matchingList.push(card);
}
if(matchingList.length == 2){
    document.getElementById("score").innerHTML = ++movesCounter;
    if(matchingList[0].dataset.key == matchingList[1].dataset.key)
        {
        console.log("Matches!");
        matchingList[0].style.visibility = "hidden";
        matchingList[1].style.visibility = "hidden";
    }

    matchingList = [];
}
};

removeAllCards=()=>{
     matchingList = [];
     movesCounter = 0;
    document.getElementById("score").innerHTML ="0";
    let game = document.getElementById("game");
    while (game.firstChild) {
      game.removeChild(game.firstChild);
    }
};

hideOthersContent = ()=>{
for (var i of game.children) {
  if (i.dataset.clicked === "true"){
    i.innerHTML = "Click Me!";
}
}

};