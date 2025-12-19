/* titulo do bingo */
let titleInput = document.getElementById("title-input");
let bingoTitle = document.getElementById("bingo-title");

titleInput.addEventListener("input", () => {
    bingoTitle.textContent = titleInput.value || "título";
});


/* tamanho da grade do bingo */
let bingoGrid = document.getElementById('bingo-grid');

let gridSizeInputs = document.querySelectorAll(
  'input[name="grid-size"]'
);

function createBingoGrid(size) {
  bingoGrid.innerHTML = "";

  bingoGrid.style.display = "grid";
  bingoGrid.style.gridTemplateColumns = `repeat(${size}, 1fr)`;
  bingoGrid.style.gridTemplateRows = `repeat(${size}, 1fr)`; 
  bingoGrid.style.padding = "5px";

  let totalCells = size * size;

  for (let i = 0; i < totalCells; i++) {
    let cell = document.createElement("div");
    cell.classList.add("bingo-cell");
    cell.contentEditable = true;
    bingoGrid.appendChild(cell);
  }
}

gridSizeInputs.forEach((input) => {
  input.addEventListener("change", (event) => {
    let size = Number(event.target.value);
    createBingoGrid(size);
  });
});

createBingoGrid(3);

/* escolha das cores */
let bgColorInput = document.getElementById("bingo-bg-color");
let gridColorInput = document.getElementById("bingo-grid-color");
let fontColorInput = document.getElementById("bingo-font-color");

bgColorInput.addEventListener("input", () => {
  let bingoArea = document.getElementById("bingo-area");
  bingoArea.style.backgroundColor = bgColorInput.value;
});

let bgColorValue = document.getElementById("bg-color-value");

bgColorInput.addEventListener("input", () => {
  bgColorValue.textContent = bgColorInput.value.toUpperCase();
});

gridColorInput.addEventListener("input", () => {
  let titleMargin = document.querySelectorAll(".bingo-title");
  titleMargin.forEach((title) => {
    title.style.borderColor = gridColorInput.value;
  });
  
  let cells = bingoGrid.querySelectorAll(".bingo-cell");
  cells.forEach((cell) => {
    cell.style.borderColor = gridColorInput.value;
  });
});

let gridColorValue = document.getElementById("grid-color-value");

gridColorInput.addEventListener("input", () => {
  gridColorValue.textContent = gridColorInput.value.toUpperCase();
});

fontColorInput.addEventListener("input", () => {
  let cells = bingoGrid.querySelectorAll(".bingo-cell");
  cells.forEach((cell) => {
    cell.style.color = fontColorInput.value;
  });
});

let fontColorValue = document.getElementById("font-color-value");

fontColorInput.addEventListener("input", () => {
  fontColorValue.textContent = fontColorInput.value.toUpperCase();
});


/* escolha do tamanho da fonte */
let fontSizeSelect = document.getElementById("font-size");

fontSizeSelect.addEventListener("change", () => {

  let size;

  if (fontSizeSelect.value === "small") {
    size = "16px";
  } else if (fontSizeSelect.value === "medium") {
    size = "24px";
  } else if (fontSizeSelect.value === "large") {
    size = "32px";
  }

  let cells = bingoGrid.querySelectorAll(".bingo-cell");
  cells.forEach((cell) => {
    cell.style.fontSize = size;
  });
});