let startTime, startLapTime, stopTime, timeLapsed, lapTimeLapsed;
let timerID = null;
let bestLapTime, worstLapTime;

const startStopwatch = () => {
  startTime = Date.now();
  startLapTime = Date.now();
};
const stopStopwatch = (timerID) => {
  cancelAnimationFrame(timerID);
  stopTime = timeLapsed;
};

const updateStopwatchTime = () => {
  let timeLapsedInMilliseconds = Date.now() - startTime;

  if (stopTime) {
    timeLapsedInMilliseconds += stopTime;
  }

  timeLapsed = timeLapsedInMilliseconds;
  return timeLapsed;
};

const updateLapTime = () => {
  let timeLapsedInMilliseconds = Date.now() - startLapTime;

  if (stopTime) {
    timeLapsedInMilliseconds += stopTime;
  }

  lapTimeLapsed = timeLapsedInMilliseconds;
  return lapTimeLapsed;
};

const resetStopwatchTimes = () => {
  stopTime = null;
  startTime = null;
  bestLapTime = null;
  worstLapTime = null;
  timeLapsed = null;
};

const calculateLapDifference = (prevLapTime) => {
  const currentTime = Date.now();
  startLapTime = currentTime;
  if (!prevLapTime) {
    return currentTime - startTime;
  }
  lapTimeLapsed = 0;
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

const hasWorstLapChanged = (currentTime) => {
  if (worstLapTime <= currentTime) {
    worstLapTime = currentTime;
    return true;
  } else if (!worstLapTime) {
    worstLapTime = currentTime;
  }
  return false;
};

export {
  resetStopwatchTimes,
  calculateLapDifference,
  hasBestLapChanged,
  hasWorstLapChanged,
  startStopwatch,
  stopStopwatch,
  updateStopwatchTime,
  updateLapTime,
};
