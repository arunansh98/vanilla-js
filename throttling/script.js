console.log("throttling poc !");

function apiCall() {
  console.log("api call !");
}

let lastCall = 0;
function throttle(func, delay) {
  return function (...args) {
    const now = Date.now();
    if (now - lastCall >= delay) {
      lastCall = now;
      func(...args);
    }
  };
}

// document.addEventListener("scroll", () => {
//   let throttledFunction = throttle(apiCall, 1000);
//   throttledFunction();
// });

handleButtonClick();

function handleButtonClick() {
  let submitButton = document.getElementById("submit");
  submitButton.addEventListener("click", () => {
    let throttledFunction = throttle(apiCall, 500);
    throttledFunction();
  });
}
