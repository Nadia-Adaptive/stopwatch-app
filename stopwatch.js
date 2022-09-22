import { formatTime, NUM_OF_PREPOPULATED_DIVS } from "./utils.js";
let startTime, prevLapTime, stopTime, timeLapsed;
let timerID = null;
let bestLapTime, worstLapTime;

const toggleStopwatchMode = (timerControl, timerButton, lapButton) => {
  if (timerControl.classList.contains("start")) {
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
