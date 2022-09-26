const updateTime = (startTime, stopTime) => {
  let timeLapsedInMilliseconds = Date.now() - startTime;

  if (stopTime) {
    timeLapsedInMilliseconds += stopTime;
  }
  return timeLapsedInMilliseconds;
};

const updateLapTime = (startLapTime, stopTime) => {
  let timeLapsedInMilliseconds = Date.now() - startLapTime;

  if (stopTime) {
    timeLapsedInMilliseconds += stopTime;
  }

  return timeLapsedInMilliseconds;
};

const calculateLapDifference = (startTime, prevLapTime) => {
  const currentTime = Date.now();

  if (!prevLapTime) {
    return currentTime - startTime;
  }

  return currentTime - prevLapTime;
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
  updateLapTime,
};
