const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const duplicatedNumbers = numbers.concat(numbers);
let clickingAllowed = true;
let matchingList =[];


createTiles=()=>{
    hello.remove();
    let shuffled = shuffleTable(duplicatedNumbers);
    for (let i = 0; i<shuffled.length;i++){
    var card = document.createElement("div");
    card.className= "cont";
    card.appendChild(
    document.createTextNode(shuffled[i])
    );
    card.dataset.id = i;
    card.dataset.key = shuffled[i];
    card.addEventListener("click", cardClicked.bind(this, card));
    document.getElementById("game").appendChild(card);
    }
}

shuffleTable=duplicatedNumbers=>{
return duplicatedNumbers.sort(() => Math.random() - 0.5);
}
 
cardClicked=card=>{
console.log(card.dataset.key);
if(matchingList.length < 2 && matchingList[0]!=card){
    matchingList.push(card);
}
if(matchingList.length == 2){
    if(matchingList[0].dataset.key == matchingList[1].dataset.key)
        {
        console.log("Matches!");
        matchingList[0].style.visibility = "hidden";
        matchingList[1].style.visibility = "hidden";
    }

    matchingList = [];
}
}