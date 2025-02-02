console.log("debounce !");

function searchUsers(value) {
  console.log("api call to search users with value ", value);
}

let timer;
function debounce(func, delay) {
  return function (...args) {
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(() => {
      func(...args);
    }, delay);
  };
}

let text = document.getElementById("text");
text.addEventListener("input", (event) => {
  let debouncedSearchUsers = debounce(searchUsers, 500);
  debouncedSearchUsers(event.target.value);
});
