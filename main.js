const completedLaps = ["00:00.00"];

function toggleTimer() {
  const timerControl = document.querySelector("#stopwatch-control");
  const controlBtn = document.querySelector("#stopwatch-control-btn");

  if (timerControl.classList.contains("start")) {
    timerControl.classList.remove("start");
    timerControl.classList.add("stop");

    controlBtn.innerText = "Stop";
  } else if (timerControl.classList.contains("stop")) {
    timerControl.classList.remove("stop");
    timerControl.classList.add("start");

    controlBtn.innerText = "Start";
  }
}

function newLap() {
  const lapDisplay = document.querySelector("#lap-display");
  const lapDivs = document.querySelectorAll(".lap");
  const lapMarkup = `<span>Lap ${
    completedLaps.length
  }</span><span>${completedLaps.at(-1)}</span>`;

  for (const lap of lapDivs) {
    if (!lap.innerHTML) {
      lap.innerHTML = lapMarkup;
      isDisplayFull = false;
      break;
    }
  }

  if (completedLaps.length === lapDivs.length) {
    const lap = document.createElement("div");
    lap.classList.add("lap");
    lapDisplay.appendChild(lap);
  }
}
