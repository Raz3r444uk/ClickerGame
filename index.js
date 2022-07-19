const startBtn = document.querySelector("#start");
const screens = document.querySelectorAll(".screen");
const timeList = document.querySelector("#time-list");
const timeEl = document.querySelector("#time");
const board = document.querySelector("#board");

let time = 0;
let count = 0;

startBtn.addEventListener("click", (e) => {
  e.preventDefault();
  screens[0].classList.add("up");
});

timeList.addEventListener("click", (e) => {
  if (e.target.classList.contains("time-btn")) {
    time = parseInt(e.target.getAttribute("data-time"));
    screens[1].classList.add("up");
    startGame();
  }
});

board.addEventListener("click", (e) => {
  if (e.target.classList.contains("circle")) {
    count++;
    e.target.remove();
    createRaddomCircle();
  }
});

function startGame() {
  setInterval(decreaseTime, 1000);
  createRaddomCircle();
  setTime(time);
}

function decreaseTime() {
  if (time === 0) {
    finishGame();
  } else {
    let current = --time;
    if (current < 10) {
      current = `0${current}`;
    }
    setTime(current);
  }
}

function setTime(value) {
  timeEl.innerHTML = `00:${value}`;
}

function finishGame() {
  timeEl.parentNode.classList.add("hide");
  board.innerHTML = `<h1>Cчет: <span class="primary">${count}</span></h1>`;
}

function createRaddomCircle() {
  const cirlce = document.createElement("div");
  const size = getRandomNumber(10, 60);
  const { width, height } = board.getBoundingClientRect();
  const x = getRandomNumber(0, width - size);
  const y = getRandomNumber(0, height - size);

  cirlce.classList.add("circle");
  cirlce.style.width = `${size}px`;
  cirlce.style.height = `${size}px`;
  cirlce.style.left = `${x}px`;
  cirlce.style.top = `${y}px`;
  cirlce.style.background = getRandomColor();
  board.append(cirlce);
}

function getRandomNumber(min, max) {
  return Math.round(Math.random() * (max - min) + min);
}

function getRandomColor() {
  const color = "#" + (Math.random().toString(16) + "000000").substring(2, 8).toUpperCase();
  return color;
}
