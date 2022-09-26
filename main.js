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
  startLapTime: null,
  stopTime: null,
  timeLapsed: null,
  lapTimeLapsed: null,
  prevLapTime: null,
  bestLapTime: Number.MAX_SAFE_INTEGER,
  worstLapTime: Number.MIN_SAFE_INTEGER,
};

lapButton.onclick = () => {
  const lapDisplay = document.querySelector("#lap-display");
  const lapDivs = document.querySelectorAll(".lap");
  const { startTime, prevLapTime, bestLapTime, worstLapTime } = state;

  if (isStopwatchRunning) {
    const lapTime = calculateLapDifference(startTime, prevLapTime);
    const latestLap = newLap(lapDisplay, lapDivs, lapTime);

    if (hasBestLapChanged(lapTime, bestLapTime)) {
      state.bestLapTime = lapTime;
      updateLap(latestLap.nextElementSibling, "best-lap");
    }

    if (hasWorstLapChanged(lapTime, worstLapTime)) {
      state.worstLapTime = lapTime;
      updateLap(latestLap.nextElementSibling, "worst-lap");
    }
    state.startLapTime = Date.now();
    state.lapTimeLapsed = 0;
  } else {
    restartStopwatch(lapDisplay, lapButton, state);
  }
  state.prevLapTime = Date.now();
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
};

const stopStopwatch = (timerID, state) => {
  cancelAnimationFrame(timerID);
  state.stopTime = state.timeLapsed;
};

const updateStopwatch = () => {
  const { startTime, startLapTime, stopTime } = state;
  state.timeLapsed = updateTime(startTime, stopTime);
  state.lapTimeLapsed = updateTime(startLapTime, stopTime);
  updateStopwatchDisplay(state);
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
};
