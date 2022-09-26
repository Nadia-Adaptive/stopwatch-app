import {
  calculateLapDifference,
  hasBestLapChanged,
  hasWorstLapChanged,
  updateTime,
  startStopwatch,
  stopStopwatch,
  resetStopwatchTimes,
} from "./stopwatch.js";

import {
  resetStopwatchUI,
  toggleStopwatchControlUI,
  updateStopwatchDisplay,
} from "./stopwatchUI.js";

import { newLap, updateLap } from "./stopwatchUI.JS";
import { isStopwatchRunning, toggleIsStopwatchRunning } from "./utils.js";

window.onload = () => {
  const state = {
    startTime: null,
    stopTime: null,
    timeLapsed: null,
    prevLapTime: null,
    bestLapTime: Number.MAX_SAFE_INTEGER,
    worstLapTime: Number.MIN_SAFE_INTEGER,
    timerID: null,
  };

  const lapButton = document.querySelector(".default > button");
  const stopwatchButton = document.querySelector("#stopwatch-control > button");

  lapButton.onclick = () => {
    const lapDisplay = document.querySelector("#lap-display");
    const lapDivs = document.querySelectorAll(".lap");
    const { bestLapTime, worstLapTime, prevLapTime } = state;

    if (isStopwatchRunning) {
      const lapTime = calculateLapDifference(state);
      const latestLap = newLap(lapDisplay, lapDivs, lapTime);
      if (lapDivs.length === 2) {
        //const priorLapTime = prevLapTime-lap
        if (prevLapTime > lapTime) {
          lapDivs[1].classList.add("worst-lap");
          lapDivs[0].classList.add("best-lap");
          state.bestLapTime = lapTime;
          state.worstLapTime = prevLapTime;
        }
        if (lapTime > prevLapTime) {
          lapDivs[1].classList.add("best-lap");
          lapDivs[0].classList.add("worst-lap");

          state.bestLapTime = prevLapTime;
          state.worstLapTime = lapTime;
        }
      } else if (lapDivs.length > 2) {
        if (hasBestLapChanged(lapTime, bestLapTime)) {
          state.bestLapTime = lapTime;
          updateLap(latestLap.nextElementSibling, "best-lap");
        }

        if (hasWorstLapChanged(lapTime, worstLapTime)) {
          state.worstLapTime = lapTime;
          updateLap(latestLap.nextElementSibling, "worst-lap");
        }
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
      state.timerID = requestAnimationFrame(updateStopwatch);
    } else {
      stopStopwatch(state);
    }
    toggleStopwatchControlUI(stopwatchControl, stopwatchButton, lapButton);
  };

  const updateStopwatch = () => {
    const { startTime, stopTime } = state;
    const timeLapsed = updateTime(startTime, stopTime);
    const lapTime = calculateLapDifference(state);

    updateStopwatchDisplay(timeLapsed, lapTime);

    state.timeLapsed = timeLapsed;
    state.timerID = requestAnimationFrame(updateStopwatch);
  };

  const restartStopwatch = (lapDisplay) => {
    resetStopwatchUI(lapDisplay, lapButton, stopwatchButton);
    resetStopwatchTimes(state);
  };
};
