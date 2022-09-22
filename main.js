import {
  toggleStopwatchMode,
  resetTimes,
  calculateLapDifference,
  hasBestLapChanged,
  hasWorstLapChanged,
} from "./stopwatch.js";
import { toggleStopwatchControlUI } from "./stopwatchUI.js";

import { newLap, updateLap } from "./stopwatchUI.JS";
import { isStopwatchRunning, toggleIsStopwatchRunning } from "./utils.js";

let prevLapTime = 0;
const lapButton = document.querySelector(".default > button");
const stopwatchButton = document.querySelector("#stopwatch-control > button");

lapButton.onclick = () => {
  const lapDisplay = document.querySelector("#lap-display");
  const lapDivs = document.querySelectorAll(".lap");

  if (!prevLapTime) {
    prevLapTime = Date.now();
  }
  if (isStopwatchRunning) {
    const lapTime = calculateLapDifference(prevLapTime);
    const latestLap = newLap(lapDisplay, lapDivs, lapTime);
    if (hasBestLapChanged(lapTime)) {
      updateLap(latestLap, "best-lap");
    }

    if (hasWorstLapChanged(lapTime)) {
      updateLap(latestLap, "worst-lap");
    }
  } else {
    restartStopwatch(lapDisplay, lapDivs, lapButton);
  }
  prevLapTime = Date.now();
};

stopwatchButton.onclick = () => {
  const stopwatchControl = document.querySelector("#stopwatch-control");
  toggleIsStopwatchRunning();
  toggleStopwatchMode();
  toggleStopwatchControlUI(stopwatchControl, stopwatchButton, lapButton);
};

const restartStopwatch = (lapDisplay, lapDivs, lapButton) => {
  const timerDisplay = document.querySelector(".timer-display>span");
  timerDisplay.innerText = "00:00.00";
  lapButton.innerText = "Lap";

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
