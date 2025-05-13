// 要素の取得
const timerPar = document.getElementById("timer");
const statusLbl = document.getElementById("status"); // ※この行が不要なら削除可
const minutesLbl = document.getElementById("minutes");
const secondsLbl = document.getElementById("seconds");
const elapsedMinutesLbl = document.getElementById("elapsed_minutes");
const elapsedSecondsLbl = document.getElementById("elapsed_seconds");
const nowTimeLbl = document.getElementById("now_time");

const startBtn = document.getElementById("startButton");
const resetBtn = document.getElementById("reset");
const wrapBtn = document.getElementById("wrap");
const wrapListDom = document.getElementById("wrapList");

// タイマー用変数
let timer;
let startTime = 0;
let passTime = 0;
let passBackup = 0;
let wrapBackup = 0;
let wrapList = [];

// ✅ 任意桁数でゼロ埋め
const zeroPad = (num, digits) => String(num).padStart(digits, "0");

// ✅ 現在時刻の表示
const updateNowTime = () => {
  const now = new Date();
  const h = zeroPad(now.getHours(), 2);
  const m = zeroPad(now.getMinutes(), 2);
  const s = zeroPad(now.getSeconds(), 2);
  nowTimeLbl.innerText = `${h}時${m}分${s}秒`;
};
setInterval(updateNowTime, 1000);
updateNowTime();

// ✅ タイマー初期化
const setupTimer = () => {
  passTime = 0;
  passBackup = 0;
  wrapBackup = 0;
  timerPar.style.color = "white";
  minutesLbl.innerText = zeroPad(0, 3); // ← 3桁表示
  secondsLbl.innerText = zeroPad(0, 2);
  elapsedMinutesLbl.innerText = zeroPad(0, 2);
  elapsedSecondsLbl.innerText = zeroPad(0, 2);
};

// ✅ 経過秒数を取得
const getPassTime = () => {
  const currentTime = new Date().getTime();
  return passBackup + Math.floor((currentTime - startTime) / 1000);
};

// ✅ カウントアップ処理
const countUp = () => {
  passTime = getPassTime();
  const totalSeconds = passTime;
  timerPar.style.color = "white";
  minutesLbl.innerText = zeroPad(Math.floor(totalSeconds / 60), 3);
  secondsLbl.innerText = zeroPad(totalSeconds % 60, 2);
  elapsedMinutesLbl.innerText = zeroPad(Math.floor(totalSeconds / 60), 2);
  elapsedSecondsLbl.innerText = zeroPad(totalSeconds % 60, 2);
};

// ✅ スタートボタン処理
const startTimer = () => {
  // statusLbl.innerText = "経過"; // ← 表示したくなければ削除
  startBtn.disabled = true;
  resetBtn.disabled = false;
  wrapBtn.disabled = false;
  startTime = new Date().getTime();
  timer = setInterval(countUp, 100);
};

// ✅ リセット処理
const resetTimer = () => {
  clearInterval(timer);
  setupTimer();
  // statusLbl.innerText = "経過"; // ← 表示したくなければ削除
  startBtn.disabled = false;
  resetBtn.disabled = false;
  wrapBtn.disabled = true;
  wrapList = [];
  while (wrapListDom.firstChild) {
    wrapListDom.removeChild(wrapListDom.firstChild);
  }
};

// ✅ ラップ処理
const addWrap = () => {
  if (startBtn.disabled === false) return;
  const wrapTime = passTime - wrapBackup;
  wrapBackup = passTime;
  const wrapMinute = zeroPad(Math.floor(wrapTime / 60), 2);
  const wrapSecond = zeroPad(wrapTime % 60, 2);
  const wrapIndex = wrapList.length + 1;
  const text = `${wrapIndex}回目 ${wrapMinute}分${wrapSecond}秒`;
  const li = document.createElement("li");
  li.className = "wrap_item";
  li.textContent = text;
  wrapListDom.appendChild(li);
  wrapList.push(text);
};

// ✅ イベントバインド
window.addEventListener("load", () => {
  setupTimer();
  startBtn.addEventListener("click", startTimer);
  resetBtn.addEventListener("click", resetTimer);
  wrapBtn.addEventListener("click", addWrap);
});

