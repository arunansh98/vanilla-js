let chessboard = []; // Cache for board cells
const BOARD_LENGTH = 5; // Dynamic board size

constructChessBoard();
constructEventListeners();

/**
 * @description Constructs the chessboard and caches cells.
 */
function constructChessBoard() {
  const rows = document.getElementById("rows");
  let isBlackRowStart = false;

  for (let i = 0; i < BOARD_LENGTH; i++) {
    const row = document.createElement("div");
    row.classList.add("row");
    row.id = i;

    chessboard.push([]);

    for (let j = 0; j < BOARD_LENGTH; j++) {
      const box = document.createElement("div");
      box.id = i.toString() + j.toString();
      box.classList.add(
        j % 2 === 0
          ? isBlackRowStart
            ? "black-box"
            : "white-box"
          : isBlackRowStart
          ? "white-box"
          : "black-box"
      );
      chessboard[i].push(box);
      row.appendChild(box);
    }

    rows.appendChild(row);
    isBlackRowStart = !isBlackRowStart;
  }
}

/**
 * @description Attaches event listeners using event delegation.
 */
function constructEventListeners() {
  let rows = document.getElementById("rows");
  ["mouseover", "mouseout"].forEach((type) => {
    rows.addEventListener(type, (event) => {
      let { target } = event;
      if (
        target.classList.contains("white-box") ||
        target.classList.contains("black-box")
      ) {
        const [rowIndex, colIndex] = target.id.split("").map(Number);
        handleMouseEvent(type, target, rowIndex, colIndex);
      }
    });
  });
}

/**
 * @description Highlights the hovered cell and its attacked cells.
 */
function handleMouseEvent(type, element, rowIndex, colIndex) {
  let isAdd = type === "mouseover";
  if (isAdd) element.classList.add("highlighted");
  else element.classList.remove("highlighted");

  let directions = [
    [-1, -1],
    [-1, 1],
    [1, -1],
    [1, 1],
  ];

  directions.forEach(([rowStep, colStep]) => {
    let i = rowIndex + rowStep;
    let j = colIndex + colStep;

    while (i >= 0 && i < BOARD_LENGTH && j >= 0 && j < BOARD_LENGTH) {
      handleBoxClasses(isAdd, i, j);
      i += rowStep;
      j += colStep;
    }
  });
}

/**
 * @description Toggles the "attacked" class for a specific cell.
 */
function handleBoxClasses(isAdd, i, j) {
  let box = chessboard[i][j];
  if (box) {
    if (isAdd) box.classList.add("attacked");
    else box.classList.remove("attacked");
  }
}
