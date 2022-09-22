const NUM_OF_PREPOPULATED_DIVS = 5;
let isStopwatchRunning = false;

const toggleIsStopwatchRunning = () =>
  (isStopwatchRunning = !isStopwatchRunning);

const formatTime = (time) => {
  let formattedTime = null;

  let centiseconds = Math.floor((time % 1000) / 10).toString();

  centiseconds = centiseconds.padStart(2, "0");

  formattedTime = `${new Date(time).toLocaleTimeString("en", {
    second: "2-digit",
    minute: "2-digit",
  })}.${centiseconds}`;

  return formattedTime;
};
export {
  NUM_OF_PREPOPULATED_DIVS,
  isStopwatchRunning,
  toggleIsStopwatchRunning,
  formatTime,
};
