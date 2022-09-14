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
