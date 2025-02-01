console.log("throttling poc !");

function apiCall() {
  console.log("api call !");
}

let lastCall = 0;
function thottle(func, delay) {
  return function (...args) {
    const now = Date.now();
    if (now - lastCall >= delay) {
      lastCall = now;
      func(...args);
    }
  };
}

document.addEventListener("scroll", () => {
  let throttledFunction = thottle(apiCall, 1000);
  throttledFunction();
});
