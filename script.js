// ✅ 要素の取得
const timerPar = document.getElementById("timer");
const minutesLbl = document.getElementById("minutes");
const secondsLbl = document.getElementById("seconds");
const elapsedMinutesLbl = document.getElementById("elapsed_minutes");
const elapsedSecondsLbl = document.getElementById("elapsed_seconds");
const nowTimeLbl = document.getElementById("now_time");

const startBtn = document.getElementById("startButton");
const resetBtn = document.getElementById("reset");
const wrapBtn = document.getElementById("wrap");
const wrapListDom = document.getElementById("wrapList");

const logBox = document.createElement("textarea");
logBox.id = "logBox";
logBox.style.position = "fixed";
logBox.style.top = "2vh";
logBox.style.left = "2vw";
logBox.style.width = "30vw";
logBox.style.height = "20vh";
logBox.style.zIndex = "999";
logBox.style.backgroundColor = "#111";
logBox.style.color = "#0f0";
logBox.style.fontSize = "1.5vh";
logBox.style.border = "1px solid #888";
document.body.appendChild(logBox);

// ✅ タイマー変数
let timer = null;
let startTime = 0;
let passTime = 0;
let passBackup = 0;
let wrapBackup = 0;
let wrapList = [];

// ✅ ゼロ埋め関数
const zeroPad = (num, digits) => String(num).padStart(digits, "0");

// ✅ ブロック時間帯（24時間表記）
const blockedTimeRanges = [
  ["10:15", "10:25"],
  ["12:15", "13:00"],
  ["15:00", "15:10"],
  ["17:10", "17:20"],
  ["19:20", "19:30"],
  ["22:15", "22:25"],
  ["00:15", "01:00"],
  ["03:00", "03:10"],
  ["05:10", "05:20"],
  ["07:20", "07:30"],
];

// ✅ 現在がブロック時間か？
const isBlockedTime = () => {
  const now = new Date();
  const current = `${zeroPad(now.getHours(), 2)}:${zeroPad(now.getMinutes(), 2)}`;
  return blockedTimeRanges.some(([start, end]) => {
    if (start > end) {
      return current >= start || current < end;
    } else {
      return current >= start && current < end;
    }
  });
};

// ✅ 現在時刻を更新 & 開始ボタンを有効に
const updateNowTime = () => {
  const now = new Date();
  const h = zeroPad(now.getHours(), 2);
  const m = zeroPad(now.getMinutes(), 2);
  const s = zeroPad(now.getSeconds(), 2);
  nowTimeLbl.innerText = `${h}時${m}分${s}秒`;

  if (!timer) {
    startBtn.disabled = false;
  }
};
setInterval(updateNowTime, 1000);
updateNowTime();

// ✅ タイマー初期化
const setupTimer = () => {
  passTime = 0;
  passBackup = 0;
  wrapBackup = 0;
  timerPar.style.color = "white";
  minutesLbl.innerText = zeroPad(0, 3);
  secondsLbl.innerText = zeroPad(0, 2);
  elapsedMinutesLbl.innerText = zeroPad(0, 2);
  elapsedSecondsLbl.innerText = zeroPad(0, 2);
};

// ✅ 経過時間取得
const getPassTime = () => {
  const currentTime = new Date().getTime();
  return passBackup + Math.floor((currentTime - startTime) / 1000);
};

// ✅ カウントアップ処理
const countUp = () => {
  passTime = getPassTime();
  const totalSeconds = passTime;
  minutesLbl.innerText = zeroPad(Math.floor(totalSeconds / 60), 3);
  secondsLbl.innerText = zeroPad(totalSeconds % 60, 2);
  elapsedMinutesLbl.innerText = zeroPad(Math.floor(totalSeconds / 60), 2);
  elapsedSecondsLbl.innerText = zeroPad(totalSeconds % 60, 2);
};

// ✅ タイマー開始（ボタンが効かない問題を修正）
const startTimer = () => {
  if (timer) {
    clearInterval(timer);
    timer = null;
  }

  startBtn.disabled = true;
  resetBtn.disabled = false;
  wrapBtn.disabled = false;
  startTime = new Date().getTime();

  timer = setInterval(() => {
    if (isBlockedTime()) {
      clearInterval(timer);
      timer = null;
      wrapBtn.disabled = false;
      startBtn.disabled = false;
      return;
    }
    countUp();
  }, 100);
  logBox.value += "▶️ タイマー開始\n";
};

// ✅ タイマーリセット
const resetTimer = () => {
  clearInterval(timer);
  timer = null;
  setupTimer();
  startBtn.disabled = false;
  resetBtn.disabled = false;
  wrapBtn.disabled = true;
  wrapList = [];
  while (wrapListDom.firstChild) {
    wrapListDom.removeChild(wrapListDom.firstChild);
  }
  logBox.value += "🔁 リセット実行\n";
};

// ✅ ラップ処理（停止中は再開のみ、記録しない）
const addWrap = () => {
  // タイマー停止中でpassTimeがあれば再開、ラップは記録しない
  if (!timer && passTime > 0 && !isBlockedTime()) {
    startTime = new Date().getTime() - passTime * 1000;
    timer = setInterval(() => {
      if (isBlockedTime()) {
        clearInterval(timer);
        timer = null;
        wrapBtn.disabled = false;
        startBtn.disabled = false;
        return;
      }
      countUp();
    }, 100);
    logBox.value += "🔄 タイマー再開（停止中にラップ押下）\n";
    return; // 再開のみ、記録はしない
  }

  // タイマーが無効 or 0秒の場合は何もしない
  if (!timer || passTime === 0) return;

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
  passBackup = passTime;
  logBox.value += `📌 ラップ記録：${text}\n`;
};

// ✅ イベント登録
window.addEventListener("load", () => {
  setupTimer();
  startBtn.addEventListener("click", startTimer);
  resetBtn.addEventListener("click", resetTimer);
  wrapBtn.addEventListener("click", addWrap);
});

console.log("✅ script.js 読み込まれました");

startBtn.addEventListener("click", () => {
  console.log("▶️ 開始ボタン押されました");
  startTimer();
});
