import {
  calculateLapDifference,
  hasBestLapChanged,
  hasWorstLapChanged,
  updateTime,
} from "./stopwatch.js";

import {
  resetStopwatchUI,
  toggleStopwatchControlUI,
  updateStopwatchDisplay,
} from "./stopwatchUI.js";

import { newLap, updateLap } from "./stopwatchUI.JS";
import { isStopwatchRunning, toggleIsStopwatchRunning } from "./utils.js";

const lapButton = document.querySelector(".default > button");
const stopwatchButton = document.querySelector("#stopwatch-control > button");

let timerID = null;

document.onLoad = () => {};
const state = {
  startTime: null,
  stopTime: null,
  timeLapsed: null,
  prevLapTime: null,
  bestLapTime: Number.MAX_SAFE_INTEGER,
  worstLapTime: Number.MIN_SAFE_INTEGER,
};

lapButton.onclick = () => {
  const lapDisplay = document.querySelector("#lap-display");
  const lapDivs = document.querySelectorAll(".lap");
  const { bestLapTime, worstLapTime } = state;

  if (isStopwatchRunning) {
    const lapTime = calculateLapDifference(state);
    const latestLap = newLap(lapDisplay, lapDivs, lapTime);

    if (hasBestLapChanged(lapTime, bestLapTime)) {
      state.bestLapTime = lapTime;
      updateLap(latestLap.nextElementSibling, "best-lap");
    }

    if (hasWorstLapChanged(lapTime, worstLapTime)) {
      state.worstLapTime = lapTime;
      updateLap(latestLap.nextElementSibling, "worst-lap");
    }
    state.prevLapTime += lapTime;
  } else {
    restartStopwatch(lapDisplay, lapButton, state);
  }
};

stopwatchButton.onclick = () => {
  const stopwatchControl = document.querySelector("#stopwatch-control");
  toggleIsStopwatchRunning();

  if (isStopwatchRunning) {
    startStopwatch(state);
    timerID = requestAnimationFrame(updateStopwatch);
  } else {
    stopStopwatch(timerID, state);
  }
  toggleStopwatchControlUI(stopwatchControl, stopwatchButton, lapButton);
};

const startStopwatch = (state) => {
  state.startTime = Date.now();
  state.startLapTime = Date.now();
  state.prevLapTime = state.prevLapTime || 0;
};

const stopStopwatch = (timerID, state) => {
  cancelAnimationFrame(timerID);
  state.stopTime = state.timeLapsed;
};

const updateStopwatch = () => {
  const { startTime, stopTime } = state;
  const timeLapsed = updateTime(startTime, stopTime);
  const lapTime = calculateLapDifference(state);

  updateStopwatchDisplay(timeLapsed, lapTime);

  state.timeLapsed = timeLapsed;
  timerID = requestAnimationFrame(updateStopwatch);
};

const restartStopwatch = (lapDisplay) => {
  resetStopwatchUI(lapDisplay, lapButton, stopwatchButton);
  resetStopwatchTimes(state);
};

const resetStopwatchTimes = (state) => {
  for (const property in state) {
    state[property] = null;
  }
  state.bestLapTime = Number.MAX_SAFE_INTEGER;
  state.worstLapTime = Number.MIN_SAFE_INTEGER;
};
