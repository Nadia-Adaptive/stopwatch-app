import { formatTime } from "./utils.js";

const updateLap = (latestLap, newClass) => {
  const prevBestLap = document.querySelector(`.${newClass}`);

  if (prevBestLap) {
    prevBestLap.classList.remove(`${newClass}`);
  }

  latestLap.classList.add(`${newClass}`);
};

const newLap = (lapDisplay, lapDivs, lapTime) => {
  const lapMarkup = `<span>Lap ${lapDivs.length - 4}</span><span>${formatTime(
    lapTime
  )}</span>`;

  const lap = document.createElement("div");
  lap.classList.add("lap");
  lap.innerHTML = lapMarkup;
  return lapDisplay.insertBefore(lap, lapDivs[0]);
};

const toggleStopwatchControlUI = (
  stopwatchControl,
  stopwatchButton,
  lapButton
) => {
  let stopwatchButtonText, lapButtonText;
  if (stopwatchControl.classList.toggle("start")) {
    stopwatchButton.innerText = "Start";
    lapButtonText = "Restart";
  }

  if (stopwatchControl.classList.toggle("stop")) {
    stopwatchButtonText = "Stop";
    lapButtonText = "Lap";
  }

  stopwatchButton.innerText = stopwatchButtonText;
  lapButton.innerText = lapButtonText;
};

const updateStopwatchDisplay = (timeLapsed, lapTime) => {
  const stopwatchText = document.querySelector(".timer-display>span");
  const lapDivs = document.querySelectorAll(".lap");
  const lapTimeText = lapDivs[0];

  stopwatchText.innerText = `${formatTime(timeLapsed)}`;
  lapTimeText.innerHTML = `<span>Lap ${
    lapDivs.length
  }</span> <span>${formatTime(lapTime)}</span>`;
};

const resetStopwatchUI = (lapDisplay, lapButton, stopwatchButton) => {
  const timerDisplay = document.querySelector(".timer-display>span");
  timerDisplay.innerText = "00:00.00";
  lapButton.innerText = "Lap";
  stopwatchButton.innerText = "Start";

  lapDisplay.innerHTML = "";
  const lap = document.createElement("div");
  lap.classList.add("lap");
  lapDisplay.appendChild(lap);
};
export {
  updateLap,
  newLap,
  resetStopwatchUI,
  toggleStopwatchControlUI,
  updateStopwatchDisplay,
};
