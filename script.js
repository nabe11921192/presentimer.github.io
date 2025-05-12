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
let wrapList = [];

const zeroPadding = (num) => ("00" + num).slice(-2);

const setupTimer = () => {
  passTime = 0;
  timerPar.style.color = "white";
  minutesLbl.innerText = zeroPadding(0);
  secondsLbl.innerText = zeroPadding(0);
  elapsedMinutesLbl.innerText = zeroPadding(0);
  elapsedSecondsLbl.innerText = zeroPadding(0);
};

const updateDisplay = () => {
  const elapsed = passTime;
  minutesLbl.innerText = zeroPadding(Math.floor(elapsed / 60));
  secondsLbl.innerText = zeroPadding(elapsed % 60);
  elapsedMinutesLbl.innerText = zeroPadding(Math.floor(elapsed / 60));
  elapsedSecondsLbl.innerText = zeroPadding(elapsed % 60);
};

const countUp = () => {
  passTime += 1;
  updateDisplay();
};

const startTimer = () => {
  statusLbl.innerText = "経過";
  startBtn.style.display = "none"; // 表示しないように
  resetBtn.disabled = false;
  wrapBtn.disabled = false;
  timer = setInterval(countUp, 1000);
};

const resetTimer = () => {
  clearInterval(timer);
  setupTimer();
  wrapList = [];
  while (wrapListDom.firstChild) {
    wrapListDom.removeChild(wrapListDom.firstChild);
  }
  startBtn.style.display = "none"; // 開始ボタンは使わない構成
  wrapBtn.disabled = false;
  resetBtn.disabled = false;
  startTimer(); // リセット後すぐ再開（カウントアップ型では一般的）
};

const addWrap = () => {
  const wrapMinute = zeroPadding(Math.floor(passTime / 60));
  const wrapSecond = zeroPadding(passTime % 60);
  const wrapIndex = wrapList.length + 1;
  const text = `${wrapIndex}回目 ${wrapMinute}分${wrapSecond}秒`;
  const li = document.createElement("li");
  li.className = "wrap_item";
  li.textContent = text;
  wrapListDom.appendChild(li);
  wrapList.push(text);

  // 🔁 カウントを0に戻す（ラップ後に0から再カウント）
  passTime = 0;
  updateDisplay();
};

window.addEventListener("load", () => {
  resetBtn.addEventListener("click", resetTimer);
  wrapBtn.addEventListener("click", addWrap);
  startBtn.style.display = "none";
  setupTimer();
  startTimer(); // 起動と同時に開始（スタートボタンは使用しない構成に）
});
