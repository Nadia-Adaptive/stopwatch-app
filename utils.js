export function formatTime(time) {
  let formattedTime = null;
  let formattedMillisecs = null;
  const millisecs = time.getMilliseconds();

  if (!millisecs || millisecs < 10) {
    formattedMillisecs = "00";
  } else if (millisecs < 99) {
    formattedMillisecs = "0" + String(millisecs).slice(0, 1);
  } else if (millisecs % 100 === 0) {
    formattedMillisecs = String(millisecs).slice(0, 1) + "0";
  } else {
    formattedMillisecs = String(millisecs).slice(0, 2);
  }

  formattedTime = `${time.toLocaleTimeString("en", {
    second: "2-digit",
    minute: "2-digit",
  })}.${formattedMillisecs}`;

  return formattedTime;
}
