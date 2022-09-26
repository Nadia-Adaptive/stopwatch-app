const updateTime = (startTime, stopTime) => {
  return Date.now() - startTime + stopTime;
};

const calculateLapDifference = (state) => {
  return state.timeLapsed - state.prevLapTime;
};

const hasBestLapChanged = (currentTime, bestLapTime) => {
  return bestLapTime >= currentTime;
};

const hasWorstLapChanged = (currentTime, worstLapTime) => {
  return worstLapTime <= currentTime;
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

export {
  calculateLapDifference,
  hasBestLapChanged,
  hasWorstLapChanged,
  updateTime,
  startStopwatch,
  stopStopwatch,
};
