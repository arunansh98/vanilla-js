const images = document.getElementsByTagName("img");

const hoverSrc = "star-yellow.svg"; // Hover image source
const originalSrc = "star.svg"; // Default image source
const highlighted = {}; // Stores highlighted stars
const STAR_LENGTH = 5; // Number of stars

constructStars(); // Construct star elements
constructEventListeners(); // Attach event listeners

/**
 * Constructs stars and adds them to the container
 */
function constructStars() {
  let starContainer = document.getElementById("star-container");
  for (let i = 0; i < STAR_LENGTH; i++) {
    let star = document.createElement("img");
    star.id = i + 1;
    star.src = originalSrc; // Set default image
    star.alt = "star-" + star.id;
    starContainer.appendChild(star);
  }
}

/**
 * Attaches event listeners for mouseover, mouseout, and click events
 */
function constructEventListeners() {
  let starContainer = document.getElementById("star-container");
  let eventTypes = [
    { type: "mouseover", func: handleMouseOver, isTargetArgument: true },
    { type: "mouseout", func: handleMouseOut, isTargetArgument: false },
    { type: "click", func: handleImageClick, isTargetArgument: true },
  ];
  eventTypes.forEach((eventType) => {
    starContainer.addEventListener(eventType.type, (event) => {
      let { target } = event;
      let { func, isTargetArgument } = eventType;
      if (isStarImage(target)) {
        func(isTargetArgument ? target : null);
      }
    });
  });
}

/**
 * Checks if the target is a star image
 */
function isStarImage(target) {
  return (
    target.tagName === "IMG" &&
    (target?.src?.includes("star-yellow.svg") ||
      target?.src?.includes("star.svg"))
  );
}

/**
 * Handles mouseover: highlights the stars up to the hovered one
 */
function handleMouseOver(image) {
  const { id } = image;
  for (let i = 1; i <= id; i++) {
    imagItem = document.getElementById(i);
    imagItem.src = hoverSrc; // Highlight the star
  }
  for (let i = parseInt(id) + 1; i <= STAR_LENGTH; i++) {
    imagItem = document.getElementById(i);
    imagItem.src = originalSrc; // Reset the remaining stars
  }
}

/**
 * Handles mouseout: resets all stars to original state
 */
function handleMouseOut() {
  let keys = Object.keys(highlighted);
  for (let key of keys) {
    imagItem = document.getElementById(key);
    imagItem.src = hoverSrc; // Highlight the stars that were previously hovered
  }
  let after = keys.length + 1;
  for (let i = after; i <= STAR_LENGTH; i++) {
    imagItem = document.getElementById(i);
    imagItem.src = originalSrc; // Reset the remaining stars
  }
}

/**
 * Handles click: highlights stars up to the clicked one and toggles highlighted state
 */
function handleImageClick(image) {
  const { id } = image;
  for (let i = 1; i <= id; i++) {
    imagItem = document.getElementById(i);
    imagItem.src = hoverSrc; // Highlight the clicked stars
    highlighted[i] = true; // Mark as highlighted
  }
  for (let i = parseInt(id) + 1; i <= STAR_LENGTH; i++) {
    imagItem = document.getElementById(i);
    imagItem.src = originalSrc; // Reset the remaining stars
    if (highlighted[i]) delete highlighted[i]; // Remove highlight
  }
}
