let startTime, prevLapTime, stopTime, timeLapsed;
let timerID = null;
let bestLapTime, worstLapTime;

const startStopwatch = (callback) => {
  startTime = Date.now();
  timerID = setInterval(callback, 10);
};
const stopStopwatch = () => {
  clearInterval(timerID);
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
  resetTimes,
  calculateLapDifference,
  hasBestLapChanged,
  hasWorstLapChanged,
  startStopwatch,
  stopStopwatch,
  updateStopwatchTime,
};
