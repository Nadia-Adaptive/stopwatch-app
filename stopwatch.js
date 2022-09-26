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

const stopStopwatch = (state) => {
  cancelAnimationFrame(state.timerID);
  state.stopTime = state.timeLapsed;
};

const resetStopwatchTimes = (state) => {
  for (const property in state) {
    state[property] = null;
  }
  state.bestLapTime = Number.MAX_SAFE_INTEGER;
  state.worstLapTime = Number.MIN_SAFE_INTEGER;
};

export {
  calculateLapDifference,
  hasBestLapChanged,
  hasWorstLapChanged,
  updateTime,
  startStopwatch,
  stopStopwatch,
  resetStopwatchTimes,
};
