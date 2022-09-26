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

export {
  calculateLapDifference,
  hasBestLapChanged,
  hasWorstLapChanged,
  updateTime,
};
