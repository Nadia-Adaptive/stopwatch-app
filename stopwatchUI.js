let hiddenLapDivs = NUM_OF_PREPOPULATED_DIVS;
const LAST_LAP_DIV = NUM_OF_PREPOPULATED_DIVS;
import {
  formatTime,
  isStopwatchRunning,
  NUM_OF_PREPOPULATED_DIVS,
} from "./utils.js";

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

  // if (hiddenLapDivs !== 0) {
  //   lapDivs[LAST_LAP_DIV].classList.add("hidden");
  //   hiddenLapDivs--;
  // }

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
  let classToRemove, classToAdd, lapButtonText;
  if (isStopwatchRunning) {
    classToAdd = "stop";
    classToRemove = "start";
    lapButtonText = "Lap";
  } else {
    classToAdd = "start";
    classToRemove = "stop";
    lapButtonText = "Restart";
  }

  stopwatchControl.classList.remove(classToRemove);
  stopwatchControl.classList.add(classToAdd);

  stopwatchButton.innerText = `${classToAdd
    .charAt(0)
    .toUpperCase()}${classToAdd.slice(1)}`;
  lapButton.innerText = lapButtonText;
};

const updateStopwatchDisplay = (timeLapsed, lapTimeLapsed) => {
  const stopwatchText = document.querySelector(".timer-display>span");
  const lapDivs = document.querySelectorAll(".lap");
  const lapTimeText = lapDivs[0];

  stopwatchText.innerText = `${formatTime(timeLapsed)}`;
  lapTimeText.innerHTML = `<span>Lap ${
    lapDivs.length
  }</span> <span>${formatTime(lapTimeLapsed)}</span>`;
};

const resetStopwatchUI = (lapDisplay, lapDivs, lapButton, stopwatchButton) => {
  const timerDisplay = document.querySelector(".timer-display>span");
  timerDisplay.innerText = "00:00.00";
  lapButton.innerText = "Lap";
  stopwatchButton.innerText = "Start";
  stopwatchButton.parentNode.classList.remove("stop");
  stopwatchButton.parentNode.classList.add("start");

  hiddenLapDivs = NUM_OF_PREPOPULATED_DIVS;

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
