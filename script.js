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
let passBackup = 0;
let wrapBackup = 0;
let wrapList = [];

const zeroPadding = (num) => ("00" + num).slice(-2);

const setupTimer = () => {
  passTime = 0;
  passBackup = 0;
  wrapBackup = 0;
  timerPar.style.color = "white";
  minutesLbl.innerText = zeroPadding(0);
  secondsLbl.innerText = zeroPadding(0);
  elapsedMinutesLbl.innerText = zeroPadding(0);
  elapsedSecondsLbl.innerText = zeroPadding(0);
};

const getPassTime = () => {
  const currentTime = new Date().getTime();
  return passBackup + Math.floor((currentTime - startTime) / 1000);
};

const updateDisplay = () => {
  const elapsed = getPassTime();
  minutesLbl.innerText = zeroPadding(Math.floor(elapsed / 60));
  secondsLbl.innerText = zeroPadding(elapsed % 60);
  elapsedMinutesLbl.innerText = zeroPadding(Math.floor(elapsed / 60));
  elapsedSecondsLbl.innerText = zeroPadding(elapsed % 60);
};

const startTimer = () => {
  statusLbl.innerText = "経過";
  startBtn.disabled = true;
  resetBtn.disabled = false;
  wrapBtn.disabled = false;
  startTime = new Date().getTime();
  timer = setInterval(() => {
    passTime = getPassTime();
    updateDisplay();
  }, 100);
};

const resetTimer = () => {
  clearInterval(timer);
  setupTimer();
  statusLbl.innerText = "経過";
  startBtn.disabled = false;
  resetBtn.disabled = false;
  wrapBtn.disabled = true;
  wrapList = [];
  while (wrapListDom.firstChild) {
    wrapListDom.removeChild(wrapListDom.firstChild);
  }
};

const addWrap = () => {
  if (startBtn.disabled === false) return;

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
};

window.addEventListener("load", () => {
  startBtn.addEventListener("click", startTimer);
  resetBtn.addEventListener("click", resetTimer);
  wrapBtn.addEventListener("click", addWrap);
  setupTimer();
});
