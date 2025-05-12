const timerPar = document.getElementById("timer");
const statusLbl = document.getElementById("status");
const minutesLbl = document.getElementById("minutes");
const secondsLbl = document.getElementById("seconds");
const elapsedMinutesLbl = document.getElementById("elapsed_minutes");
const elapsedSecondsLbl = document.getElementById("elapsed_seconds");
const startBtn = document.getElementById("startButton");
const resetBtn = document.getElementById("reset");
const wrapBtn = document.getElementById("wrap");
const limitField = document.getElementById("limitField");
const wrapListDom = document.getElementById("wrapList");

let timer;
let startTime = 0;
let limitTime = 0;
let passTime = 0;
let passBackup = 0;
let wrapBackup = 0;
let wrapList = [];

const zeroPadding = (num) => ("00" + num).slice(-2);

const setupTimer = () => {
  passTime = 0;
  passBackup = 0;
  wrapBackup = 0;
  minutesLbl.innerText = zeroPadding(limitTime);
  secondsLbl.innerText = "00";
  elapsedMinutesLbl.innerText = "00";
  elapsedSecondsLbl.innerText = "00";
};

const getPassTime = () => {
  return passBackup + Math.floor((Date.now() - startTime) / 1000);
};

const countDown = () => {
  passTime = getPassTime();
  const restTime = limitTime * 60 - passTime;
  minutesLbl.innerText = zeroPadding(Math.abs(parseInt(restTime / 60)));
  secondsLbl.innerText = zeroPadding(Math.abs(restTime % 60));
  elapsedMinutesLbl.innerText = zeroPadding(parseInt(passTime / 60));
  elapsedSecondsLbl.innerText = zeroPadding(passTime % 60);
};

const startTimer = () => {
  statusLbl.innerText = "残り";
  startBtn.disabled = true;
  resetBtn.disabled = false;
  wrapBtn.disabled = false;
  limitField.disabled = true;
  startTime = Date.now();
  timer = setInterval(countDown, 100);
};

const stopTimer = () => {
  clearInterval(timer);
  passBackup = passTime;
  statusLbl.innerText = "停止中";
  startBtn.disabled = false;
  resetBtn.disabled = false;
  wrapBtn.disabled = true;
  limitField.disabled = false;
};

const resetTimer = () => {
  clearInterval(timer);
  timer = null;
  setupTimer();
  statusLbl.innerText = "残り";
  resetBtn.disabled = true;
  wrapBtn.disabled = true;
  wrapList = [];
  while (wrapListDom.firstChild) wrapListDom.removeChild(wrapListDom.firstChild);
};

const addWrap = () => {
  if (startBtn.disabled === false) return;
  const wrapTime = passTime - wrapBackup;
  wrapBackup = passTime;

  const wrapMinute = zeroPadding(parseInt(wrapTime / 60));
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

const updateLimit = () => {
  const value = parseInt(limitField.value);
  limitTime = isNaN(value) ? 0 : value;
  limitField.value = limitTime;
  setupTimer();
};

window.addEventListener("load", () => {
  startBtn.addEventListener("click", startTimer);
  resetBtn.addEventListener("click", resetTimer);
  wrapBtn.addEventListener("click", addWrap);
  limitField.addEventListener("input", updateLimit);
  updateLimit();
});
