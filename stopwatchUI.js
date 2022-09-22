let completedLaps = 0;
let hiddenLapDivs = NUM_OF_PREPOPULATED_DIVS;
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
  const lapMarkup = `<span>Lap ${++completedLaps}</span><span>${formatTime(
    lapTime
  )}</span>`;

  if (hiddenLapDivs !== 0) {
    lapDivs[4].classList.add("hidden");
    hiddenLapDivs--;
  }

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
  let classToRemove, classToAdd;
  if (isStopwatchRunning) {
    classToAdd = "start";
    classToRemove = "stop";
  } else {
    classToAdd = "stop";
    classToRemove = "start";
  }

  stopwatchControl.classList.remove(classToRemove);
  stopwatchControl.classList.add(classToAdd);

  stopwatchButton.innerText = `${classToAdd
    .charAt(0)
    .toUpperCase()}${classToAdd.slice(1)}`;
  lapButton.innerText = "Lap";
};

const updateStopwatchDisplay = (timeLapsed) => {
  const timerText = document.querySelector(".timer-display>span");
  timerText.innerText = `${formatTime(timeLapsed)}`;
};

export { updateLap, newLap, toggleStopwatchControlUI, updateStopwatchDisplay };
