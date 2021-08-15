/** @format */

document.addEventListener("DOMContentLoaded", function () {
  var state = {
    timerText: "0m0s0ms",
    timerInterval: null,
    timerStarted: false,
    timesTracked: [],
  };

  function updateDOMTimer() {
    if (!state.domTimerText) {
      var domTimerText = document.getElementById("timerText");
      state.domTimerText = domTimerText;
      state.domTimerText.innerHTML = state.timerText;
    } else {
      state.domTimerText.innerHTML = state.timerText;
    }
  }

  function setTimerText(n) {
    // state.timerText=parseFloat(state.timerText);
    // state.timerText+=n;
    let timer = parseTimeString(state.timerText);

    timer += n;

    // console.log(state.timerText, timer, n)

    if (timer >= 0) {
      // state.timerText=(Math.round(state.timerText * 100) / 100).toFixed(2);
      state.timerText = convertMiliToTimeString(timer);

      updateDOMTimer();
    }
  }

  function toggleTimer() {
    if (state.timerStarted) {
      //stop timer
      state.timerStarted = false;
      clearInterval(state.timerInterval); //leave timertext
    } else {
      //start timer
      state.timerStarted = true;
      state.timerInterval = setInterval(setTimerText.bind(this, -1), 1);
    }
  }

  function resetTimer() {
    clearInterval(state.timerInterval);
    state.timerText = "0m0s0ms";
    state.timesTracked = [];
    state.timerStarted = false;
    setTimerText(0.0);
    updateDOMTimesTracked();
  }

  function updateDOMTimesTracked() {
    var domTimesTracked = document.getElementById("timesTracked");
    domTimesTracked.innerHTML = "";
    state.timesTracked.forEach((val, ind) => {
      var tempDOMdiv = document.createElement("div");
      tempDOMdiv.innerHTML = val;
      domTimesTracked.insertBefore(tempDOMdiv, domTimesTracked.firstChild);
    });
  }

  function setTimesTracked() {
    state.timesTracked.push(state.timerText);
    updateDOMTimesTracked();
  }

  function convertMiliToTimeString(time) {
    let mili = parseInt(time % 1000, 10);
    let sec = parseInt(time / 1000, 10) % 60;
    let min = parseInt(time / (1000 * 60), 10);

    return `${min}m${sec}s${mili}ms`;
  }

  function parseTimeString(string) {
    const str1 = string.split("ms");
    const str2 = str1[0].split("m");
    let min = parseInt(str2[0], 10);
    const str3 = str2[1].split("s");
    let sec = parseInt(str3[0], 10);
    let mili = parseInt(str3[1], 10);

    return min * 60 * 1000 + sec * 1000 + mili;
  }

  function initStopwatch() {
    const RKEY = 82,
      SKEY = 83,
      TKEY = 84;

    const inputSubmitButton = document.getElementById("inputButton");

    inputSubmitButton.addEventListener("click", function (event) {
      // setTimerText(0.0);
      resetTimer();

      const input = document.getElementById("inputTime");

      const time = parseTimeString(input.value);

      setTimerText(time);
    });

    var domStartStopBut = document.getElementById("startStopBut");
    var domResetBut = document.getElementById("resetBut");
    var domRecordTimeBut = document.getElementById("recordTimeBut");
    domStartStopBut.addEventListener("click", toggleTimer);
    domResetBut.addEventListener("click", resetTimer);
    domRecordTimeBut.addEventListener("click", setTimesTracked);
    document.addEventListener("keydown", function (e) {
      switch (e.keyCode) {
        case SKEY:
          toggleTimer();
          break;
        case RKEY:
          resetTimer();
          break;
        case TKEY:
          setTimesTracked();
          break;
      }
    });
    setTimerText(0.0);
  }

  initStopwatch();
});
