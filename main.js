let completedLaps = 0;
let timerID = null;
let startTime, prevLapTime, stopTime, timeLapsed;

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
    stopTime = timeLapsed;
  }
}

function startStopwatch() {
  const timerText = document.querySelector(".timer-display>span");
  const currentTime = new Date();

  let timeLapsedInSeconds = currentTime.getTime() - startTime.getTime();

  if (stopTime) {
    timeLapsedInSeconds += stopTime.getTime();
  }

  timeLapsed = new Date(timeLapsedInSeconds);

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

function formatMilliseconds(millisecs) {
  let formattedMillisecs = null;
  if (!millisecs || millisecs < 10) {
    formattedMillisecs = "00";
  } else if (millisecs < 99) {
    formattedMillisecs = "0" + String(millisecs).slice(0, 1);
  } else if (millisecs % 100 === 0) {
    formattedMillisecs = String(millisecs).slice(0, 1) + "0";
  } else {
    formattedMillisecs = String(millisecs).slice(0, 2);
  }
  return formattedMillisecs;
}

function newLap() {
  const lapDisplay = document.querySelector("#lap-display");
  const lapDivs = document.querySelectorAll(".lap");

  const currentTime = new Date();

  if (!prevLapTime) {
    prevLapTime = startTime;
  }

  const lapTime = new Date(currentTime.getTime() - prevLapTime.getTime());
  const lapMarkup = `<span>Lap ${++completedLaps}</span><span>${lapTime.toLocaleTimeString(
    "en",
    {
      second: "2-digit",
      minute: "2-digit",
    }
  )}.${formatMilliseconds(lapTime.getMilliseconds())}</span>`;

  prevLapTime = currentTime;

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
