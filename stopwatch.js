import {
  formatTime,
  isStopwatchRunning,
  NUM_OF_PREPOPULATED_DIVS,
} from "./utils.js";
let startTime, prevLapTime, stopTime, timeLapsed;
let timerID = null;
let bestLapTime, worstLapTime;

const toggleStopwatchMode = () => {
  if (isStopwatchRunning) {
    startTime = Date.now();
    timerID = setInterval(startStopwatch, 10);
  } else {
    clearInterval(timerID);
    stopTime = timeLapsed;
  }
};

const startStopwatch = () => {
  const timerText = document.querySelector(".timer-display>span");

  let timeLapsedInSeconds = Date.now() - startTime;

  if (stopTime) {
    timeLapsedInSeconds += stopTime;
  }

  timeLapsed = timeLapsedInSeconds;

  timerText.innerText = `${formatTime(timeLapsed)}`;
};

const resetTimes = () => {
  stopTime = null;
};

const calculateLapDifference = (prevLapTime) => {
  const currentTime = Date.now();
  return currentTime - prevLapTime;
};

const hasBestLapChanged = (currentTime) => {
  if (bestLapTime >= currentTime) {
    bestLapTime = currentTime;
    return bestLapTime;
  } else if (!bestLapTime) {
    bestLapTime = currentTime;
  }
  return null;
};

const hasWorstLapChanged = (currentTime, latestLap) => {
  if (worstLapTime <= currentTime) {
    worstLapTime = currentTime;
    return true;
  } else if (!worstLapTime) {
    worstLapTime = currentTime;
  }
  return false;
};

export {
  toggleStopwatchMode,
  resetTimes,
  calculateLapDifference,
  hasBestLapChanged,
  hasWorstLapChanged,
};
