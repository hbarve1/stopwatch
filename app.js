/** @format */

document.addEventListener("DOMContentLoaded", function () {
  const state = {
    timerText: "0m0s0ms",
    timerInterval: null,
    timerStarted: false,
    timesTracked: [],
  };

  function updateDOMTimer() {
    if (!state.domTimerText) {
      const domTimerText = document.getElementById("timerText");
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
    const domTimesTracked = document.getElementById("timesTracked");
    domTimesTracked.innerHTML = "";
    state.timesTracked.forEach((val, ind) => {
      const tempDOMdiv = document.createElement("div");
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
    const length = string.length;
    const str = string;

    let m = 0;
    let s = 0;
    let ms = 0;
    let num = "";

    for (let i = 0; i < length; i++) {
      if (str[i] === "m" && str[i + 1] !== "s") {
        m = parseInt(num);
        num = "";
        continue;
      } else if (str[i] === "s" && str[i - 1] !== "m") {
        s = parseInt(num);
        num = "";
        continue;
      } else if (str[i] === "m" && str[i + 1] === "s") {
        ms = parseInt(num);
        num = "";
        break;
      }

      num += str[i];
    }

    return parseInt(m, 10) * 60 * 1000 + parseInt(s, 10) * 1000 + parseInt(ms);
  }

  function initStopwatch() {
    // const RKEY = "KeyR";
    // const SKEY = "KeyS";
    // const TKEY = "KeyT";

    const inputSubmitButton = document.getElementById("inputButton");

    inputSubmitButton.addEventListener("click", function () {
      resetTimer();

      const input = document.getElementById("inputTime");

      const value = input.value;

      // validate input
      if (value.includes("m") || value.includes("s") || value.includes("ms")) {
        const time = parseTimeString(value);

        setTimerText(time);
      } else {
        alert("Invalid Input");
      }
    });

    const domStartStopBut = document.getElementById("startStopBut");
    const domResetBut = document.getElementById("resetBut");
    const domRecordTimeBut = document.getElementById("recordTimeBut");

    domStartStopBut.addEventListener("click", toggleTimer);
    domResetBut.addEventListener("click", resetTimer);
    domRecordTimeBut.addEventListener("click", setTimesTracked);
    
    // NOTE: disabling this now, because while typing input with 's' or 'ms',
    // functions are getting fired.
    // document.addEventListener("keydown", function (e) {
    //   switch (e.code) {
    //     case SKEY: {
    //       toggleTimer();
    //       break;
    //     }
    //     case RKEY: {
    //       resetTimer();
    //       break;
    //     }
    //     case TKEY: {
    //       setTimesTracked();
    //       break;
    //     }
    //   }
    // });

    setTimerText(0.0);
  }

  initStopwatch();
});
