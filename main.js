import { formatTime, NUM_OF_PREPOPULATED_DIVS } from "./utils.js";
import {
  toggleStopwatchMode,
  resetTimes,
  calculateLapDifference,
} from "./stopwatch.js";
let completedLaps = 0;
let hiddenLapDivs = NUM_OF_PREPOPULATED_DIVS;
let prevLapTime = 0;
const lapButton = document.querySelector(".default > button");
const stopwatchButton = document.querySelector("#stopwatch-control > button");

let bestLapTime, worstLapTime;

lapButton.onclick = () => {
  const lapDisplay = document.querySelector("#lap-display");
  const lapDivs = document.querySelectorAll(".lap");
  if (!prevLapTime) {
    prevLapTime = Date.now();
  }
  if (isStopwatchRunning()) {
    const lapTime = calculateLapDifference(prevLapTime);
    const latestLap = newLap(lapDisplay, lapDivs, lapTime);
    calculateBestTime(lapTime, latestLap);
    calculateWorstTime(lapTime, latestLap);
  } else {
    restartStopwatch(lapDisplay, lapDivs, lapButton);
  }
};

stopwatchButton.onclick = () => {
  const stopwatchControl = document.querySelector("#stopwatch-control");

  toggleStopwatchMode(stopwatchControl, stopwatchButton, lapButton);
};

const isStopwatchRunning = () => {
  return stopwatchButton.parentElement.classList.contains("stop");
};

const restartStopwatch = (lapDisplay, lapDivs, lapButton) => {
  const timerDisplay = document.querySelector(".timer-display>span");
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
};

const newLap = (lapDisplay, lapDivs, lapTime) => {
  const lapMarkup = `<span>Lap ${++completedLaps}</span><span>${formatTime(
    lapTime
  )}</span>`;

  prevLapTime = Date.now();

  if (hiddenLapDivs !== 0) {
    lapDivs[4].classList.add("hidden");
    hiddenLapDivs--;
  }

  const lap = document.createElement("div");
  lap.classList.add("lap");
  lap.innerHTML = lapMarkup;
  return lapDisplay.insertBefore(lap, lapDivs[0]);
};

const calculateBestTime = (currentTime, latestLap) => {
  if (bestLapTime >= currentTime) {
    bestLapTime = currentTime;
    const prevBestLap = document.querySelector(".best-lap");

    if (prevBestLap) {
      prevBestLap.classList.remove("best-lap");
    }

    latestLap.classList.add("best-lap");
  } else if (!bestLapTime) {
    bestLapTime = currentTime;
  }
};

const calculateWorstTime = (currentTime, latestLap) => {
  if (worstLapTime <= currentTime) {
    worstLapTime = currentTime;
    const prevWorstLap = document.querySelector(".worst-lap");

    if (prevWorstLap) {
      prevWorstLap.classList.remove("worst-lap");
    }

    latestLap.classList.add("worst-lap");
  } else if (!worstLapTime) {
    worstLapTime = currentTime;
  }
};
