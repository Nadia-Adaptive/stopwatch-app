import {
  resetStopwatchTimes,
  calculateLapDifference,
  hasBestLapChanged,
  hasWorstLapChanged,
  stopStopwatch,
  startStopwatch,
  updateStopwatchTime,
  updateLapTime,
} from "./stopwatch.js";

import {
  resetStopwatchUI,
  toggleStopwatchControlUI,
  updateStopwatchDisplay,
} from "./stopwatchUI.js";

import { newLap, updateLap } from "./stopwatchUI.JS";
import { isStopwatchRunning, toggleIsStopwatchRunning } from "./utils.js";

let prevLapTime = 0;
const lapButton = document.querySelector(".default > button");
const stopwatchButton = document.querySelector("#stopwatch-control > button");

lapButton.onclick = () => {
  const lapDisplay = document.querySelector("#lap-display");
  const lapDivs = document.querySelectorAll(".lap");

  if (isStopwatchRunning) {
    const lapTime = calculateLapDifference(prevLapTime);
    const latestLap = newLap(lapDisplay, lapDivs, lapTime);

    if (hasBestLapChanged(lapTime)) {
      updateLap(latestLap.nextElementSibling, "best-lap");
    }

    if (hasWorstLapChanged(lapTime)) {
      updateLap(latestLap.nextElementSibling, "worst-lap");
    }
  } else {
    restartStopwatch(lapDisplay, lapDivs, lapButton);
  }
  prevLapTime = Date.now();
};

stopwatchButton.onclick = () => {
  const stopwatchControl = document.querySelector("#stopwatch-control");
  toggleIsStopwatchRunning();

  if (isStopwatchRunning) {
    startStopwatch(updateStopwatch);
  } else {
    stopStopwatch();
  }

  toggleStopwatchControlUI(stopwatchControl, stopwatchButton, lapButton);
};

const updateStopwatch = () => {
  const timeLapsed = updateStopwatchTime();
  const lapTimeLapsed = updateLapTime();
  updateStopwatchDisplay(timeLapsed, lapTimeLapsed);
};

const restartStopwatch = (lapDisplay, lapDivs) => {
  resetStopwatchUI(lapDisplay, lapDivs, lapButton, stopwatchButton);
  resetStopwatchTimes();
};
