const NUM_OF_PREPOPULATED_DIVS = 5;
let completedLaps = 0;
let hiddenLapDivs = NUM_OF_PREPOPULATED_DIVS;
let timerID = null;
let startTime, prevLapTime, stopTime, timeLapsed;
const lapButton = document.querySelector(".default > button");
const timerControl = document.querySelector("#stopwatch-control");

lapButton.onclick = () => {
  if (!isStopwatchRunning()) {
    restartTimer();
  } else {
    newLap();
  }
};

function toggleTimer() {
  const controlBtn = document.querySelector("#stopwatch-control-btn");

  if (!isStopwatchRunning()) {
    timerControl.classList.remove("start");
    timerControl.classList.add("stop");

    controlBtn.innerText = "Stop";
    lapButton.innerText = "Lap";

    startTime = new Date();
    timerID = setInterval(startStopwatch, 10);
  } else if (timerControl.classList.contains("stop")) {
    timerControl.classList.remove("stop");
    timerControl.classList.add("start");

    controlBtn.innerText = "Start";
    lapButton.innerText = "Restart";

    clearInterval(timerID);
    stopTime = timeLapsed;
  }
}

function isStopwatchRunning() {
  return timerControl.classList.contains("stop");
}

function restartTimer() {
  const timerDisplay = document.querySelector(".timer-display>span");
  const lapDisplay = document.querySelector("#lap-display");
  const lapDivs = document.querySelectorAll(".lap");

  timerDisplay.innerText = "00:00.00";
  lapButton.innerText = "Lap";
  clearInterval(timerID);
  stopTime = null;
  hiddenLapDivs = NUM_OF_PREPOPULATED_DIVS;
  completedLaps = 0;

  for (const lap of lapDivs) {
    if (!lap.classList.contains("hidden")) {
      lapDisplay.removeChild(lap);
    } else {
      lap.classList.remove("hidden");
    }
  }
}

function startStopwatch() {
  const timerText = document.querySelector(".timer-display>span");

  let timeLapsedInSeconds = Date.now() - startTime.getTime();

  if (stopTime) {
    timeLapsedInSeconds += stopTime.getTime();
  }

  timeLapsed = new Date(timeLapsedInSeconds);

  timerText.innerText = `${formatTime(timeLapsed)}`;
}

function newLap() {
  const lapDisplay = document.querySelector("#lap-display");
  const lapDivs = document.querySelectorAll(".lap");

  if (!prevLapTime) {
    prevLapTime = startTime.getTime();
  }

  const currentTime = Date.now();
  const lapTime = new Date(currentTime - prevLapTime);
  const lapMarkup = `<span>Lap ${++completedLaps}</span><span>${formatTime(
    lapTime
  )}</span>`;

  prevLapTime = currentTime;

  if (hiddenLapDivs !== 0) {
    lapDivs[4].classList.add("hidden");
    hiddenLapDivs--;
  }

  const lap = document.createElement("div");
  lap.classList.add("lap");
  lap.innerHTML = lapMarkup;
  lapDisplay.insertBefore(lap, lapDivs[0]);
}

function formatTime(time) {
  let formattedTime = null;
  let formattedMillisecs = null;
  const millisecs = time.getMilliseconds();

  if (!millisecs || millisecs < 10) {
    formattedMillisecs = "00";
  } else if (millisecs < 99) {
    formattedMillisecs = "0" + String(millisecs).slice(0, 1);
  } else if (millisecs % 100 === 0) {
    formattedMillisecs = String(millisecs).slice(0, 1) + "0";
  } else {
    formattedMillisecs = String(millisecs).slice(0, 2);
  }

  formattedTime = `${time.toLocaleTimeString("en", {
    second: "2-digit",
    minute: "2-digit",
  })}.${formattedMillisecs}`;

  return formattedTime;
}
