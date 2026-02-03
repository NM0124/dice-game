//step 1 get all instances of all the required elements
const player1=document.querySelector(".player--0");
const player2=document.querySelector(".player--1");

const score1=document.querySelector("#score--0");
const score2=document.querySelector("#score--1");

const current1=document.querySelector("#current--0");
const current2=document.querySelector("#current--1");

const dice=document.querySelector(".dice");
const btnNew=document.querySelector(".btn--new");
const btnRoll=document.querySelector(".btn--roll");
const btnHold=document.querySelector(".btn--hold");

//step 2: declare all the required variables
let scores1, scores2, currentScore, activePlayer, playing;

//step 3: new game button functionality

const init=function(){
    scores1=0;
    scores2=0;
    currentScore=0;
    playing=true;
    activePlayer=0;

    score1.textContent=0;
    score2.textContent=0;
    current1.textContent=0;
    current2.textContent=0;
    dice.classList.add("hidden");
    player1.classList.remove("player--winner");
    player2.classList.remove("player--winner");
    player1.classList.add("player--active");
    player2.classList.remove("player--active");
};
init();

const changePlayer = () => {
  document.querySelector(`#current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  document.querySelector(`#current--${activePlayer}`).textContent = 0;
  player1.classList.toggle("player--active");
  player2.classList.toggle("player--active");
};

//step 4: roll dice button functionality
let rollDice=()=>{
    //step 4.1: we are playing or not
    if(playing){
        //step 4.1.1 generate a random number between 1-6
        let randomNumber=Math.trunc(Math.random()*6)+1;
        console.log(randomNumber);

        //step 4.1.2 display the dice
        dice.src = `./die/dice-${randomNumber}.png`;
        dice.classList.remove("hidden");

        if(randomNumber==1){
            //step 4.1.3 check for rolled 1: if true switch to next player
            changePlayer();
        }
        else{
            //step 4.1.4 if false add dice to current score
            currentScore = currentScore + randomNumber;
            document.querySelector(`#current--${activePlayer}`).textContent=currentScore;
        }
    }
}

let btnHolding=()=>{
    //step 1: check if we are playing
    if(playing){
        //step 2: add current score of that active player to hi total score
        if (activePlayer === 0) {
            scores1 += currentScore;
            score1.textContent = scores1;
        }
        else {
            scores2 += currentScore;
            score2.textContent = scores2;
        }
        currentScore=0;
        
        //step 3: check if score is equal or greater than 20
        if ((activePlayer === 0 && scores1 >= 20) || (activePlayer === 1 && scores2 >= 20)) {
            //if true finish the game
            playing=false;
            document.querySelector(`.player--${activePlayer}`).classList.add("player--winner");
            document.querySelector(`.player--${activePlayer}`).classList.remove("player--active");
            dice.classList.add("hidden");
        }
        else {
        //if false switch to next player
        changePlayer();
        }
    }
};    
    
btnRoll.addEventListener("click",rollDice);
btnNew.addEventListener("click",init);
btnHold.addEventListener("click",btnHolding);