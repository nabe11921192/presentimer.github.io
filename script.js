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
let wrapList = [];

const zeroPadding = (num) => ("00" + num).slice(-2);

const setupTimer = () => {
  passTime = 0;
  passBackup = 0;
  timerPar.style.color = "white";
  minutesLbl.innerText = "00";
  secondsLbl.innerText = "00";
  elapsedMinutesLbl.innerText = "00";
  elapsedSecondsLbl.innerText = "00";
};

const getPassTime = () => {
  const currentTime = new Date().getTime();
  return passBackup + Math.floor((currentTime - startTime) / 1000);
};

const countUp = () => {
  passTime = getPassTime();
  const minutes = Math.floor(passTime / 60);
  const seconds = passTime % 60;

  minutesLbl.innerText = zeroPadding(minutes);
  secondsLbl.innerText = zeroPadding(seconds);
  elapsedMinutesLbl.innerText = zeroPadding(minutes);
  elapsedSecondsLbl.innerText = zeroPadding(seconds);
};

const startTimer = () => {
  statusLbl.innerText = "経過";
  startBtn.disabled = true;
  resetBtn.disabled = false;
  wrapBtn.disabled = false;

  startTime = new Date().getTime();
  timer = setInterval(countUp, 100);
};

const stopTimer = () => {
  clearInterval(timer);
  passBackup = passTime;
  startBtn.disabled = false;
  wrapBtn.disabled = true;
};

const resetTimer = () => {
  clearInterval(timer);
  setupTimer();

  startBtn.disabled = false;
  wrapBtn.disabled = true;
  resetBtn.disabled = false;

  // ラップリストを初期化
  wrapList = [];
  while (wrapListDom.firstChild) {
    wrapListDom.removeChild(wrapListDom.firstChild);
  }
};

const addWrap = () => {
  const minutes = Math.floor(passTime / 60);
  const seconds = passTime % 60;
  const text = `${wrapList.length + 1}回目 ${zeroPadding(minutes)}分${zeroPadding(seconds)}秒`;

  const li = document.createElement("li");
  li.className = "wrap_item";
  li.textContent = text;
  wrapListDom.appendChild(li);
  wrapList.push(text);
};

window.addEventListener("load", () => {
  setupTimer();
  startBtn.addEventListener("click", startTimer);
  resetBtn.addEventListener("click", resetTimer);
  wrapBtn.addEventListener("click", addWrap);
});
