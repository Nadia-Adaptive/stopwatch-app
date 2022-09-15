const completedLaps = ["00:00.00"];
let timerID = null;
let startTime, lapTime, currentTime;

function toggleTimer() {
  const timerControl = document.querySelector("#stopwatch-control");
  const controlBtn = document.querySelector("#stopwatch-control-btn");

  if (timerControl.classList.contains("start")) {
    timerControl.classList.remove("start");
    timerControl.classList.add("stop");

    controlBtn.innerText = "Stop";

    startTime = new Date();
    timerID = setInterval(startStopwatch, 10);
  } else if (timerControl.classList.contains("stop")) {
    timerControl.classList.remove("stop");
    timerControl.classList.add("start");

    controlBtn.innerText = "Start";

    clearInterval(timerID);
  }
}

function startStopwatch() {
  const timerText = document.querySelector(".timer-display>span");
  currentTime = new Date();

  const timeLapsedInSeconds = currentTime.getTime() - startTime.getTime();

  const timeLapsed = new Date(timeLapsedInSeconds);

  let millisecs = timeLapsed.getMilliseconds();
  if (!millisecs || millisecs < 10) {
    millisecs = "00";
  } else if (millisecs < 99) {
    millisecs = "0" + String(millisecs).slice(0, 1);
  } else if (millisecs % 100 === 0) {
    millisecs = String(millisecs).slice(0, 1) + "0";
  } else {
    millisecs = String(millisecs).slice(0, 2);
  }

  timerText.innerText = `${timeLapsed.toLocaleTimeString("en", {
    second: "2-digit",
    minute: "2-digit",
  })}.${millisecs}`;
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
      break;
    }
  }

  if (completedLaps.length === lapDivs.length) {
    const lap = document.createElement("div");
    lap.classList.add("lap");
    lapDisplay.appendChild(lap);
  }
}
