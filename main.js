import { formatTime, NUM_OF_PREPOPULATED_DIVS } from "./utils.js";
import { toggleStopwatchMode, resetTimes } from "./stopwatch.js";
let completedLaps = 0;
let hiddenLapDivs = NUM_OF_PREPOPULATED_DIVS;
let prevLapTime = 0;
const lapButton = document.querySelector(".default > button");
const stopwatchButton = document.querySelector("#stopwatch-control > button");

let bestLapIndex = 1;
let worstLapIndex = 1;
let bestLapTime, worstLapTime;

lapButton.onclick = () => {
  if (!prevLapTime) {
    prevLapTime = Date.now();
  }
  if (isStopwatchRunning()) {
    newLap();
  } else {
    restartStopwatch(lapButton);
  }
};

stopwatchButton.onclick = () => {
  const stopwatchButton = document.querySelector("#stopwatch-control");

  toggleStopwatchMode(stopwatchButton, stopwatchButton, lapButton);
};

function isStopwatchRunning() {
  return stopwatchButton.parentElement.classList.contains("stop");
}

function restartStopwatch(lapButton) {
  const timerDisplay = document.querySelector(".timer-display>span");
  const lapDisplay = document.querySelector("#lap-display");
  const lapDivs = document.querySelectorAll(".lap");

  timerDisplay.innerText = "00:00.00";
  lapButton.innerText = "Lap";

  resetTimes();
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

function newLap() {
  const lapDisplay = document.querySelector("#lap-display");
  const lapDivs = document.querySelectorAll(".lap");

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
