const timerPar = document.getElementById("timer");
const statusLbl = document.getElementById("status");
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
let wrapBackup = 0;
let wrapList = [];

const zeroPadding = (num) => ("00" + num).slice(-2);

const setupTimer = () => {
  passTime = 0;
  wrapBackup = 0;
  minutesLbl.innerText = "00";
  secondsLbl.innerText = "00";
  elapsedMinutesLbl.innerText = "00";
  elapsedSecondsLbl.innerText = "00";
};

const getPassTime = () => {
  return Math.floor((Date.now() - startTime) / 1000);
};

const countUp = () => {
  passTime = getPassTime();
  minutesLbl.innerText = zeroPadding(Math.floor(passTime / 60));
  secondsLbl.innerText = zeroPadding(passTime % 60);
  elapsedMinutesLbl.innerText = zeroPadding(Math.floor(passTime / 60));
  elapsedSecondsLbl.innerText = zeroPadding(passTime % 60);
};

const startTimer = () => {
  statusLbl.innerText = "経過";
  startBtn.disabled = true;
  resetBtn.disabled = false;
  wrapBtn.disabled = false;
  startTime = Date.now() - passTime * 1000;
  timer = setInterval(countUp, 100);
};

const resetTimer = () => {
  clearInterval(timer);
  timer = null;
  startBtn.disabled = false;
  resetBtn.disabled = true;
  wrapBtn.disabled = true;
  setupTimer();
  wrapList = [];
  while (wrapListDom.firstChild) wrapListDom.removeChild(wrapListDom.firstChild);
};

const addWrap = () => {
  const wrapTime = passTime - wrapBackup;
  wrapBackup = passTime;

  const wrapMinute = zeroPadding(Math.floor(wrapTime / 60));
  const wrapSecond = zeroPadding(wrapTime % 60);
  const wrapIndex = wrapList.length + 1;
  const text = `${wrapIndex}回目 ${wrapMinute}分${wrapSecond}秒`;

  const li = document.createElement("li");
  li.className = "wrap_item";
  li.textContent = text;
  wrapListDom.appendChild(li);
  wrapList.push(text);

  minutesLbl.innerText = "00";
  secondsLbl.innerText = "00";
};

window.addEventListener("load", () => {
  startBtn.addEventListener("click", startTimer);
  resetBtn.addEventListener("click", resetTimer);
  wrapBtn.addEventListener("click", addWrap);
  setupTimer();
});
