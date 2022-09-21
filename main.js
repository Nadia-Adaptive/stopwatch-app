import { formatTime } from "./utils.js";
const NUM_OF_PREPOPULATED_DIVS = 5;
let completedLaps = 0;
let hiddenLapDivs = NUM_OF_PREPOPULATED_DIVS;
let timerID = null;
let startTime, prevLapTime, stopTime, timeLapsed;
const lapButton = document.querySelector(".default > button");
const timerControl = document.querySelector("#stopwatch-control");
const timerButton = document.querySelector("#stopwatch-control > button");
let bestLapIndex = 1;
let worstLapIndex = 1;
let bestLapTime, worstLapTime;

lapButton.onclick = () => {
  if (!isStopwatchRunning()) {
    restartTimer();
  } else {
    newLap();
  }
};

timerButton.onclick = toggleTimer;

function toggleTimer() {
  if (!isStopwatchRunning()) {
    timerControl.classList.remove("start");
    timerControl.classList.add("stop");

    timerButton.innerText = "Stop";
    lapButton.innerText = "Lap";

    startTime = Date.now();
    timerID = setInterval(startStopwatch, 10);
  } else if (timerControl.classList.contains("stop")) {
    timerControl.classList.remove("stop");
    timerControl.classList.add("start");

    timerButton.innerText = "Start";
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

  let timeLapsedInSeconds = Date.now() - startTime;

  if (stopTime) {
    timeLapsedInSeconds += stopTime;
  }

  timeLapsed = timeLapsedInSeconds;

  timerText.innerText = `${formatTime(timeLapsed)}`;
}

function newLap() {
  const lapDisplay = document.querySelector("#lap-display");
  const lapDivs = document.querySelectorAll(".lap");

  if (!prevLapTime) {
    prevLapTime = startTime;
  }

  const currentTime = Date.now();
  const lapTime = currentTime - prevLapTime;
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

  calculateBestTime(lapTime);
  calculateWorstTime(lapTime);
}

const calculateBestTime = (currentTime) => {
  if (bestLapTime >= currentTime) {
    const lapDivs = document.querySelectorAll(".lap");
    bestLapTime = currentTime;

    lapDivs[0].classList.add("best-lap");
    lapDivs[bestLapIndex].classList.remove("best-lap");

    bestLapIndex = 1;
  } else if (!bestLapTime) {
    bestLapTime = currentTime;
  } else {
    bestLapIndex++;
  }
};

const calculateWorstTime = (currentTime) => {
  if (worstLapTime <= currentTime) {
    const lapDivs = document.querySelectorAll(".lap");
    worstLapTime = currentTime;

    lapDivs[0].classList.add("worst-lap");
    lapDivs[worstLapIndex].classList.remove("worst-lap");

    worstLapIndex = 1;
  } else if (!worstLapTime) {
    worstLapTime = currentTime;
  } else {
    worstLapIndex++;
  }
};
