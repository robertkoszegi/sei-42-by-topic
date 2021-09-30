const rpsImg =
  "https://image.shutterstock.com/image-vector/rps-letter-original-monogram-logo-260nw-1778482382.jpg";

//WHAT ARE THE ELEMENTS WE NEED?
const winScore = document.querySelector(".win > span");
const loseScore = document.querySelector(".lose > span");
const tieScore = document.querySelector(".tie > span");

const playerBox = document.querySelector(".player > img");
const computerBox = document.querySelector(".computer > img");
const countdownBox = document.querySelector(".countdown > h2");

const selections = document.querySelector(".selection-wrapper");
const rockBtn = document.querySelector(".rock");
const paperBtn = document.querySelector(".paper");
const scissorsBtn = document.querySelector(".scissors");

//STATE FOR THE GAME?
// An array for r p s options
const rps = [
  { name: "rock", img: "../imgs/rock.png", beats: "scissors" },
  { name: "scissors", img: "../imgs/scissors.png", beats: "paper" },
  { name: "paper", img: "../imgs/paper.png", beats: "rock" },
];

// selection state (players selection and computers selection)
// index 0 is the players selection and index 1 is the computers selection
const selection = ["", ""];

//WLT state
// index 0 = win, index 1 = lose, index 2 = tie
const wlt = [0, 0, 0];

//result message
let resultMsg = "";

init();

//INIT function
function init() {
  //rock is our default selection by default
  selection[0] = "";
  selection[1] = "";

  //set win lose tie score to 0;
  //   wlt[0] = 0;
  //   wlt[1] = 0;
  //   wlt[2] = 0;

  //set result msg to empty;
  resultMsg = "";
}

//WHAT EVENT LISTENERS DO WE NEED?
/* 
    selection click event
        - which button was clicked? rock, paper, or scissors? 
            - set the selection for the selection chosen
        - generate a random number for the computer to choose r p or s (between 0 and 2)
            - set the selection for the selection chosen 
        - decide who the winner is
            - did the player win? Add score
            - did the player lose? Add score
            - did the player tie? Add score
*/

selections.addEventListener("click", function (evt) {
  selection[0] = evt.target.getAttribute("class");
  selection[1] = getComputerChoice();
  isWinner();
});

function getComputerChoice() {
  //generate the random number
  let ranNum = Math.floor(Math.random() * 3);
  //pick the choice out of the array
  //return that choice
  return rps[ranNum].name;
}

function isWinner() {
  //const playerChoiceObj = rps.find((choice) => choice.name === selection[0]);
  const playerChoiceObj = getChoiceObj(selection[0]);
  if (selection[0] === selection[1]) {
    resultMsg = "TIE";
    wlt[2]++;
  } else if (playerChoiceObj.beats === selection[1]) {
    resultMsg = "WIN";
    wlt[0]++;
  } else {
    resultMsg = "LOSE";
    wlt[1]++;
  }

  render();
}

function getChoiceObj(selection) {
  const rpsChoiceObj = rps.find((choice) => choice.name === selection);
  return rpsChoiceObj;
}

function render() {
  //if selection[0] is "" FALSE
  if (selection[0]) {
    const playerObj = getChoiceObj(selection[0]);
    playerBox.setAttribute("src", playerObj.img);
  } else {
    playerBox.setAttribute("src", rpsImg);
  }

  if (selection[1]) {
    const computerObj = getChoiceObj(selection[1]);
    computerBox.setAttribute("src", computerObj.img);
  } else {
    computerBox.setAttribute("src", rpsImg);
  }

  winScore.textContent = wlt[0];
  loseScore.textContent = wlt[1];
  tieScore.textContent = wlt[2];

  countdownBox.textContent = resultMsg;
}

render();
