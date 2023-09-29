const holes = document.querySelectorAll(".hole");
const displayScore = document.getElementById("score");
const moles = document.querySelectorAll(".mole");

let timeUp = false;
let score = 0;
let lastHole;
let gameStarted = false;
let displayMole = null;
let intervalId;

// Return a random hole
let randomHole = (holes) => {
  const index = Math.floor(Math.random() * holes.length);
  const hole = holes[index];
  if (hole === lastHole) {
    return randomHole(holes);
  }
  lastHole = hole;
  return hole;
};

// Make the mole pop
function pop() {
  if (timeUp) {
    return;
  }
  if (displayMole) {
    displayMole.classList.remove("up");
  }

  const hole = randomHole(holes);
  hole.classList.add("up");
  displayMole = hole;

  setTimeout(() => {
    hole.classList.remove("up");
    if (!timeUp) pop();
  }, 1000);
}

function startGame() {
  timeUp = false;
  displayScore.textContent = 0;
  score = 0;
  pop();
  intervalId = setInterval(pop, 1000);

  const displayCntdwn = document.getElementById("countdown");
  let cntdwn = 20;

  const updateCntdwn = setInterval(() => {
    cntdwn -= 1;
    displayCntdwn.textContent = cntdwn;
    if (cntdwn <= 0) {
      cntdwn = 0;
      clearInterval(updateCntdwn);
      timeUp = false;
      alert("Game Over ! You reach the score of " + score);
    }
  }, 1000);

  setTimeout(() => {
    timeUp = true;
    clearInterval(intervalId);
    alert("Game Over ! You reach the score of " + score);
  }, 20000); // the duration of the game
}

// Upgrade score and kill mole with the hammer
function hammer(e) {
  this.parentNode.classList.remove("up");
  score++;
  displayScore.textContent = score;
}

// Actions
document.querySelector(".start").addEventListener("click", function () {
  if (!gameStarted) {
    startGame();
    gameStarted = true;
  }
});

document.querySelector(".stop").addEventListener("click", function () {
  clearInterval(intervalId);
  score = 0;
  gameStarted = false;
  timeUp = true;
  displayScore.textContent = 0;
  moles.forEach((mole) => mole.classList.remove("up"));
  alert("Here we go again !");
});

moles.forEach((mole) => mole.addEventListener("click", hammer));
