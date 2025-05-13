// 要素の取得
const timerPar = document.getElementById("timer");
const statusLbl = document.getElementById("status");
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

// ✅ ブロック時間帯（24時間形式）
const blockedTimeRanges = [
  ["10:15", "10:25"],
  ["12:15", "13:00"],
  ["15:00", "15:10"],
  ["17:10", "17:20"],
  ["19:20", "19:30"],
  ["22:15", "22:25"],
  ["00:15", "00:00"],
  ["03:00", "03:10"],
  ["05:10", "05:20"],
  ["07:20", "07:30"],
];

// ✅ 現在がブロック時間か判定（数値比較）
const isBlockedTime = () => {
  const now = new Date();
  const currentMinutes = now.getHours() * 60 + now.getMinutes();

  return blockedTimeRanges.some(([startStr, endStr]) => {
    const [sh, sm] = startStr.split(":").map(Number);
    const [eh, em] = endStr === "00:00" ? [24, 0] : endStr.split(":").map(Number);

    const start = sh * 60 + sm;
    const end = eh * 60 + em;

    if (start < end) {
      return currentMinutes >= start && currentMinutes < end;
    } else {
      return currentMinutes >= start || currentMinutes < end;
    }
  });
};

// ✅ 現在時刻の表示 & ボタン有効化制御
const updateNowTime = () => {
  const now = new Date();
  const h = zeroPad(now.getHours(), 2);
  const m = zeroPad(now.getMinutes(), 2);
  const s = zeroPad(now.getSeconds(), 2);
  nowTimeLbl.innerText = `${h}時${m}分${s}秒`;

  if (isBlockedTime()) {
    startBtn.disabled = true;
    wrapBtn.disabled = true;
  } else if (!timer) {
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

// ✅ スタート処理（ブロック中なら不可）
const startTimer = () => {
  if (isBlockedTime()) {
    alert("現在の時間帯ではタイマーを開始できません。");
    return;
  }

  startBtn.disabled = true;
  resetBtn.disabled = false;
  wrapBtn.disabled = false;
  startTime = new Date().getTime();

  timer = setInterval(() => {
    if (isBlockedTime()) {
      clearInterval(timer);
      timer = null;
      alert("ブロック時間に入ったため、タイマーを停止しました。");
      wrapBtn.disabled = true;
      startBtn.disabled = true;
      return;
    }
    countUp();
  }, 100);
};

// ✅ リセット処理
const resetTimer = () => {
  clearInterval(timer);
  timer = null;
  setupTimer();
  startBtn.disabled = isBlockedTime();
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
