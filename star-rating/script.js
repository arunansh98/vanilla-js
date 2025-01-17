const images = document.getElementsByTagName("img");

const hoverSrc = "star-yellow.svg";

const originalSrc = "star.svg";

const highlighted = {};

for (let image of images) {
  image.addEventListener("mouseover", () => {
    handleMouseOver(image);
  });
  image.addEventListener("mouseout", () => {
    handleMouseOut();
  });
  image.addEventListener("click", () => {
    handleImageClick(image);
  });
}

function handleMouseOver(image) {
  const { id } = image;
  for (let i = 1; i <= id; i++) {
    imagItem = document.getElementById(i);
    imagItem.src = hoverSrc;
  }
  for (let i = parseInt(id) + 1; i <= 5; i++) {
    imagItem = document.getElementById(i);
    imagItem.src = originalSrc;
  }
}

function handleMouseOut() {
  let keys = Object.keys(highlighted);
  for (let key of keys) {
    imagItem = document.getElementById(key);
    imagItem.src = hoverSrc;
  }
  let after = keys.length + 1;
  for (let i = after; i <= 5; i++) {
    imagItem = document.getElementById(i);
    imagItem.src = originalSrc;
  }
}

function handleImageClick(image) {
  const { id } = image;
  for (let i = 1; i <= id; i++) {
    imagItem = document.getElementById(i);
    imagItem.src = hoverSrc;
    highlighted[i] = true;
  }
  for (let i = parseInt(id) + 1; i <= 5; i++) {
    imagItem = document.getElementById(i);
    imagItem.src = originalSrc;
    if (highlighted[i]) delete highlighted[i];
  }
}
