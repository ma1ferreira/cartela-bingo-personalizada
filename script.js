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
    cell.textContent = "";
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