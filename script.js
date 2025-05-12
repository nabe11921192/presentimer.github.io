const timerPar = document.getElementById("timer");
const statusLbl = document.getElementById("status");
const minutesLbl = document.getElementById("minutes");
const secondsLbl = document.getElementById("seconds");

const elapsedMinutesLbl = document.getElementById("elapsed_minutes");
const elapsedSecondsLbl = document.getElementById("elapsed_seconds");

// ✅ ID名を "startButton" に修正
const startBtn = document.getElementById("startButton");

const stopBtn = document.getElementById("stop");
const resetBtn = document.getElementById("reset");
const bellBtn = document.getElementById("bell");
const wrapBtn = document.getElementById("wrap");
const limitField = document.getElementById("limitField");

const minPass1 = document.getElementById("minutesPass1");
const minRest1 = document.getElementById("minutesRest1");
const minPass2 = document.getElementById("minutesPass2");
const minRest2 = document.getElementById("minutesRest2");
const minPass3 = document.getElementById("minutesPass3");
const minRest3 = document.getElementById("minutesRest3");

const minPassArray = [minPass1, minPass2, minPass3];
const minRestArray = [minRest1, minRest2, minRest3];

let minutes = [0, 0, 0]; // minutes
let timer;
let startTime = 0;
let limitTime = 0;
let passTime = 0;
let passBackup = 0;
let wrapBackup = 0;
let wrapList = [];
let wrapListDom = document.getElementById("wrapList");

// 以下、全く同じ（省略なし）
（中略：この部分は上で出していただいたコードと同一のままでOK）

// 最後のイベントリスナーも変更なしでOK
window.addEventListener("load", () => {
  setupValues();
  setupUI();
  startBtn.addEventListener("click", startTimer, false);
  stopBtn.addEventListener("click", stopTimer, false);
  resetBtn.addEventListener("click", resetTimer, false);
  bellBtn.addEventListener("click", callBell, false);
  wrapBtn.addEventListener("click", addWrap, false);
  for (let minPass of minPassArray) {
    minPass.addEventListener("input", updatePass, false);
  }
  for (let minRest of minRestArray) {
    minRest.addEventListener("input", updateRest, false);
  }
  limitField.addEventListener("input", updateLimit, false);
});
