
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
let bingoArea = document.getElementById("bingo-area");

bgColorInput.addEventListener("input", () => {
  
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
    bingoTitle.style.color = fontColorInput.value;

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

/* adicionar adesivos*/

let stickerInput = document.getElementById("sticker-input");
let selectedSticker = null;

stickerInput.addEventListener("change", () => {
  let file = stickerInput.files[0];
  if (!file) return;

  let reader = new FileReader();
  
  reader.onload = () => {createSticker(reader.result);};

  reader.readAsDataURL(file);
  stickerInput.value = "";
});

function createSticker(imageSrc) {
  let sticker = document.createElement("div");
  sticker.classList.add("sticker");
  sticker.style.left = "100px";
  sticker.style.top = "100px";
  sticker.style.transform = "rotate(0deg)";

  let img = document.createElement("img");
  img.src = imageSrc;
  sticker.appendChild(img);;

  let resizeHandle = document.createElement("div");
  resizeHandle.classList.add("sticker-resize");
  sticker.appendChild(resizeHandle);

  let rotateHandle = document.createElement("div");
  rotateHandle.classList.add("sticker-rotate");
  sticker.appendChild(rotateHandle);

  bingoArea.appendChild(sticker);

  sticker.addEventListener("click", (e) => {
    e.stopPropagation();
    selectSticker(sticker);
  });

  makeStickerDraggable(sticker);
  makeStickerResizable(sticker, resizeHandle);
  makeStickerRotatable(sticker, rotateHandle);
}

function selectSticker(sticker) {
  document.querySelectorAll(".sticker").forEach(s => {
    s.classList.remove("selected");
  });

  sticker.classList.add("selected");
  selectedSticker = sticker;
}

function makeStickerDraggable(sticker) {
  let isDragging = false;
  let offsetX = 0;
  let offsetY = 0;

  sticker.addEventListener("mousedown", (e) => {
    if (e.target.classList.contains("sticker-rotate")) return;
    isDragging = true;
    offsetX = e.clientX - sticker.offsetLeft;
    offsetY = e.clientY - sticker.offsetTop;
  });

  document.addEventListener("mousemove", (e) => {
    if (!isDragging) return;

    sticker.style.left = `${e.clientX - offsetX}px`;
    sticker.style.top = `${e.clientY - offsetY}px`;
  });

  document.addEventListener("mouseup", () => {
    isDragging = false;
  });
}

function makeStickerResizable(sticker, handle) {
  let isResizing = false;
  let startX, startY, startWidth, startHeight;

  handle.addEventListener("mousedown", (e) => {
    e.stopPropagation();
    isResizing = true;

    startX = e.clientX;
    startY = e.clientY;
    startWidth = sticker.offsetWidth;
    startHeight = sticker.offsetHeight;
  });

  document.addEventListener("mousemove", (e) => {
    if (!isResizing) return;

    let newWidth = startWidth + (e.clientX - startX);
    let newHeight = startHeight + (e.clientY - startY);

    sticker.style.width = `${Math.max(40, newWidth)}px`;
    sticker.style.height = `${Math.max(40, newHeight)}px`;
  });

  document.addEventListener("mouseup", () => {
    isResizing = false;
  });
}

function makeStickerRotatable(sticker, handle) {
  let isRotating = false;

  handle.addEventListener("mousedown", (e) => {
    e.stopPropagation();
    isRotating = true;
  });

  document.addEventListener("mousemove", (e) => {
    if (!isRotating) return;

    let rect = sticker.getBoundingClientRect();
    let centerX = rect.left + rect.width / 2;
    let centerY = rect.top + rect.height / 2;

    let angle = Math.atan2(e.clientY - centerY, e.clientX - centerX);
    let degrees = angle * (180 / Math.PI);

    sticker.style.transform = `rotate(${degrees}deg)`;
  });

  document.addEventListener("mouseup", () => {
    isRotating = false;
  });
}

document.addEventListener("keydown", (e) => {
  if ((e.key === "Delete" || e.key === "Backspace") && selectedSticker) {
    selectedSticker.remove();
    selectedSticker = null;
  }
});

document.addEventListener("click", () => {
  document.querySelectorAll(".sticker").forEach(s => {
    s.classList.remove("selected");
  });
  selectedSticker = null;
});

/*botao de restaurar padrão*/
let resetButton = document.querySelector(".btn-reset");

function restoreAccessibleDefault() {

  bingoArea.style.backgroundColor = "#ffffff"
  bgColorInput.value = "#FFFFFF"
  bgColorValue.textContent = "#FFFFFF"

  gridColorInput.value = "#000000"
  gridColorValue.textContent = "#000000"

  let cells = bingoGrid.querySelectorAll(".bingo-cell");
  cells.forEach(cell => {
    cell.style.borderColor = "#000000"
  });

  document.querySelectorAll(".bingo-title").forEach(title => {
    title.style.borderColor = "#000000"
  });

  fontColorInput.value = "#000000"
  fontColorValue.textContent = "#000000"

  cells.forEach(cell => {
    cell.style.color = "#000000"
  });
  bingoTitle.style.color = "#000000"

  document.querySelectorAll(".sticker").forEach(sticker => sticker.remove());
  selectedSticker = null;
}

resetButton.addEventListener("click", restoreAccessibleDefault);


/* donwload do bingo em png*/

let downloadPngBtn = document.getElementById("download-png");

downloadPngBtn.addEventListener("click", () => {
  html2canvas(bingoArea, {
    backgroundColor: null,
    scale: 2
  }).then(canvas => {
    let pngData = canvas.toDataURL("image/png");

    let link = document.createElement("a");
    link.download = "bingo.png";
    link.href = pngData
    link.click();
  });
});


/* download do bingo em pdf*/

let downloadPdfBtn = document.getElementById("download-pdf");

downloadPdfBtn.addEventListener("click", () => {
  html2canvas(bingoArea, {
    scale: 2,
    backgroundColor: "#ffffff"
  }).then(canvas => {

    let imgData = canvas.toDataURL("image/png");

    let { jsPDF } = window.jspdf;

    let pdf = new jsPDF({
      orientation: "portrait",
      unit: "px",
      format: "a4"
  });

    let pageWidth = pdf.internal.pageSize.getWidth();
    let pageHeight = pdf.internal.pageSize.getHeight();

    let imgWidth = pageWidth;
    let imgHeight = (canvas.height * imgWidth) / canvas.width;

    let y = (pageHeight - imgHeight) / 2;

    pdf.addImage(imgData, "PNG", 0, y, imgWidth, imgHeight);
    pdf.save("bingo.pdf");
  });
});