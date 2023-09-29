const holes = document.querySelectorAll(".hole");
const displayScore = document.getElementById("score");
const moles = document.querySelectorAll(".mole");
const displayCntdwn = document.getElementById("countdown");

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

// Start the game
function startGame() {
  let cntdwn = 20;
  timeUp = false;
  displayScore.textContent = 0;
  score = 0;
  pop();
  intervalId = setInterval(pop, 1000);

  // Set a timer
  const updateCntdwn = setInterval(() => {
    cntdwn -= 1;
    displayCntdwn.textContent = cntdwn;
    if (cntdwn <= 0) {
      cntdwn = 0;
      clearInterval(updateCntdwn);
      timeUp = true;
      alert("Game Over ! You reach the score of " + score);
    }
  }, 1000);

  setTimeout(() => {
    timeUp = true;
    clearInterval(intervalId);
  }, 20000); // the duration of the game
}

let sound = new Audio("assets/sound/hammer.mp3");

// Upgrade score and kill mole with the hammer
function hammer(e) {
  if (!gameStarted) {
    return;
  }
  this.parentNode.classList.remove("up");
  score++;
  sound.play();
  displayScore.textContent = score;
}

// Actions
document.querySelector(".start").addEventListener("click", function () {
  startGame();
  gameStarted = true;
});

moles.forEach((mole) => mole.addEventListener("click", hammer));
