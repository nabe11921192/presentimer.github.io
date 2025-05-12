<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>プレゼンタイマー</title>
    <link href="./style.css" rel="stylesheet" type="text/css" />
    <script type="text/javascript" src="./script.js" defer></script>
  </head>
  <body>
    <section id="main">
      <div class="inner">
        <p id="status">残り</p>
        <p id="timer"><span id="minutes">00</span>分 <span id="seconds">00</span>秒</p>
        <p id="elapsed_timer">
          経過時間 <span id="elapsed_minutes">00</span>分 <span id="elapsed_seconds">00</span>秒
        </p>
      </div>
    </section>

    <section id="controller">
      <button id="startButton">開始</button>
      &emsp;
      <button id="reset">リセット</button>
      &emsp;
      <button id="wrap">ラップ</button>
      <table>
        <tr>
          <td>発表時間</td>
          <td class="limit">
            <input type="tel" maxlength="3" placeholder="0" id="limitField" />分
          </td>
        </tr>
      </table>
    </section>

    <section id="wrapWrapper">
      <h1>ラップタイム</h1>
      <ol id="wrapList"></ol>
    </section>

    <section id="githubLinkWrapper">
      <a href="https://github.com/presentimer/presentimer.github.io" target="_blank">
        <img src="images/github-mark-white.svg" id="githubMarkSVG" />
      </a>
    </section>

    <footer>
      <p class="copyright">© 2019-2024 kyome22, tkkrr</p>
    </footer>
  </body>
</html>
