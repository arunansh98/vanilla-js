constructChessBoard();
constructEventListeners();

function constructChessBoard() {
  const rows = document.getElementById("rows");
  let boolean = false;
  for (let i = 0; i < 8; i++) {
    const row = document.createElement("div");

    row.classList.add("row");
    row.id = i;

    for (let j = 0; j < 8; j++) {
      const box = document.createElement("div");
      box.id = i.toString() + j.toString();
      box.classList.add(
        j % 2 === 0
          ? boolean
            ? "black-box"
            : "white-box"
          : boolean
          ? "white-box"
          : "black-box"
      );
      row.appendChild(box);
    }
    rows.appendChild(row);
    boolean = !boolean;
  }
}

function constructEventListeners() {
  for (let rowIndex = 0; rowIndex < 8; rowIndex++) {
    for (let colIndex = 0; colIndex < 8; colIndex++) {
      let element = document.getElementById(
        rowIndex.toString() + colIndex.toString()
      );
      element.addEventListener("mouseover", () => {
        handleMouseEvent("mouseover", element, rowIndex, colIndex);
      });
      element.addEventListener("mouseout", () => {
        handleMouseEvent("mouseout", element, rowIndex, colIndex);
      });
    }
  }
}

function handleMouseEvent(type, element, rowIndex, colIndex) {
  let isAdd = type === "mouseover";
  if (isAdd) element.classList.add("highlighted");
  else element.classList.remove("highlighted");
  for (let i = rowIndex - 1, j = colIndex - 1; i >= 0, j >= 0; i--, j--) {
    handleBoxClasses(isAdd, i, j);
  }
  for (let i = rowIndex - 1, j = colIndex + 1; i >= 0, j < 8; i--, j++) {
    handleBoxClasses(isAdd, i, j);
  }
  for (let i = rowIndex + 1, j = colIndex - 1; i < 8, j >= 0; i++, j--) {
    handleBoxClasses(isAdd, i, j);
  }
  for (let i = rowIndex + 1, j = colIndex + 1; i < 0, j < 8; i++, j++) {
    handleBoxClasses(isAdd, i, j);
  }
}

function handleBoxClasses(isAdd, i, j) {
  let box = document.getElementById(i.toString() + j.toString());
  if (box) {
    if (isAdd) box.classList.add("attacked");
    else box.classList.remove("attacked");
  }
}
