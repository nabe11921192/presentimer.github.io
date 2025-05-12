const minutesLbl = document.getElementById("minutes");
const secondsLbl = document.getElementById("seconds");
const elapsedMinutesLbl = document.getElementById("elapsed_minutes");
const elapsedSecondsLbl = document.getElementById("elapsed_seconds");

const startBtn = document.getElementById("startButton");
const resetBtn = document.getElementById("reset");
const wrapBtn = document.getElementById("wrap");
const wrapListDom = document.getElementById("wrapList");

let timer;
let startTime = 0;
let passTime = 0;
let wrapTime = 0;
let isRunning = false;

const zeroPadding = (num) => ("00" + num).slice(-2);

const updateTimer = () => {
  const current = new Date().getTime();
  passTime = Math.floor((current - startTime) / 1000);

  const minutes = Math.floor(passTime / 60);
  const seconds = passTime % 60;

  minutesLbl.innerText = zeroPadding(minutes);
  secondsLbl.innerText = zeroPadding(seconds);
  elapsedMinutesLbl.innerText = zeroPadding(minutes);
  elapsedSecondsLbl.innerText = zeroPadding(seconds);
};

const startTimer = () => {
  if (isRunning) return;
  startTime = new Date().getTime() - passTime * 1000;
  timer = setInterval(updateTimer, 100);
  isRunning = true;
};

const resetTimer = () => {
  clearInterval(timer);
  passTime = 0;
  wrapTime = 0;
  isRunning = false;
  minutesLbl.innerText = "00";
  secondsLbl.innerText = "00";
  elapsedMinutesLbl.innerText = "00";
  elapsedSecondsLbl.innerText = "00";
  wrapListDom.innerHTML = "";
};

const addWrap = () => {
  if (!isRunning) return;
  const now = passTime;
  const diff = now - wrapTime;
  wrapTime = now;

  const wrapMin = zeroPadding(Math.floor(diff / 60));
  const wrapSec = zeroPadding(diff % 60);
  const count = wrapListDom.children.length + 1;

  const li = document.createElement("li");
  li.className = "wrap_item";
  li.textContent = `${count}回目 ${wrapMin}分${wrapSec}秒`;
  wrapListDom.appendChild(li);
};

window.addEventListener("load", () => {
  startBtn.addEventListener("click", startTimer);
  resetBtn.addEventListener("click", resetTimer);
  wrapBtn.addEventListener("click", addWrap);
});
