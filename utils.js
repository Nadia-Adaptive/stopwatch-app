const NUM_OF_PREPOPULATED_DIVS = 5;

function formatTime(time) {
  let formattedTime = null;
  let formattedMillisecs = null;
  const millisecs = time % 1000; // Gets the reminder of time / 1000

  if (!millisecs || millisecs < 10) {
    formattedMillisecs = millisecs;
  } else if (millisecs < 99) {
    formattedMillisecs = "0" + String(millisecs).slice(0, 1);
  } else if (millisecs % 100 === 0) {
    formattedMillisecs = String(millisecs).slice(0, 1) + "0";
  } else {
    formattedMillisecs = String(millisecs).slice(0, 2);
  }

  formattedTime = `${new Date(time).toLocaleTimeString("en", {
    second: "2-digit",
    minute: "2-digit",
  })}.${formattedMillisecs}`;

  return formattedTime;
}
export { NUM_OF_PREPOPULATED_DIVS, formatTime };
