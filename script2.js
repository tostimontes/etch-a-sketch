// global variables
let isMouseDown = false;
document.addEventListener("mousedown", () => {
  isMouseDown = true;
});
document.addEventListener("mouseup", () => {
  isMouseDown = false;
});
let hover = true;
if (hover) {
    document.querySelector("#hover_span").style.fontWeight = "bold";
    document.querySelector("#active_span").style.fontWeight = "normal";
  } else {
    document.querySelector("#active_span").style.fontWeight = "bold";
    document.querySelector("#hover_span").style.fontWeight = "normal";
  }
let rainbowColors = [
  "rgba(255, 0, 0, 1.0)",
  "rgba(255, 165, 0, 1.0)",
  "rgba(255, 255, 0, 1.0)",
  "rgba(0, 128, 0, 1.0)",
  "rgba(0, 0, 255, 1.0)",
  "rgba(75, 0, 130, 1.0)",
  "rgba(238, 130, 238, 1.0)",
];
let rainbowIndex = 0;
let currentColor = document.querySelector("#colorDropdown").style.backgroundColor;


// TODO: add restrictions to input
function setGridSize(inputNumber) {
  const container = document.querySelector(".container");
  container.innerHTML = "";
  for (let index = 0; index < inputNumber; index++) {
    const row = document.createElement("div");
    row.classList.add("row");
    row.setAttribute(
      "style",
      `width: 100%; height: calc(100%/${inputNumber});`
    );
    for (let index = 0; index < inputNumber; index++) {
      const tile = document.createElement("div");
      tile.classList.add("tile");
      tile.setAttribute(
        "style",
        `width: calc(100% / ${inputNumber}); height: 100%;`
      );
      row.appendChild(tile);
    }
    container.appendChild(row);
  }
}

function choosePaintMode(event) {
  if (!event.target.classList.contains("tile")) return;

  let shoulPaint = hover
    ? event.type === "mouseover"
    : (isMouseDown && event.type === "mouseover") || event.type === "click";

  if (shoulPaint) {
    event.target.style.backgroundColor = getColorForTile();
  }
}

// So paintTile should be the color selection function, so that first
// the code evaluates and then the paintTile function evaluates which color to use
function getColorForTile() {
  switch (colorModeButton.value) {
    case "Rainbow":
      const color = rainbowColors[rainbowIndex];
      rainbowIndex = (rainbowIndex + 1) % rainbowColors.length;
      return color;

    case "Progressive":
      // Assuming the color is in a format that can be manipulated for opacity
      return addOpacityToColor(currentColor, 0.1);

    default: // Default mode
      return currentColor;
  }
}

function addOpacityToColor(currentColor, opacity) {
  return currentColor;
}

function changeColorMode(event) {
  switch (colorModeButton.value) {
    case "Default":
      event.target.value = "Rainbow";
      colorModeButton.textContent = "Rainbow";
      colorModeButton.style =
        "background: linear-gradient(to right, red, orange, yellow, green, blue, indigo, violet); color: black;";
      getColorForTile();
      break;

    case "Rainbow":
      event.target.value = "Progressive";
      colorModeButton.textContent = "Progressive";
      colorModeButton.style =
        "background: linear-gradient(to right, white, black); color: rgba(255, 0, 0, 1.0);";
      getColorForTile();
      break;

    case "Progressive":
      event.target.value = "Default";
      colorModeButton.textContent = "Default";
      colorModeButton.style = "background: black; color: white;";
      getColorForTile();
      break;
  }
}

function resetGridBackground() {
  // set all tiles bgcolor to white
  const tiles = document.querySelectorAll(".tile");
  tiles.forEach((tile) => {
    tile.style.backgroundColor = "rgba(255, 255, 255, 1.0)";
  });
}

// query selectors
const container = document.querySelector(".container");
const mouseModeToggle = document.querySelector("#hover_active_label");
const eraser = document.querySelector("#eraser");
const reset = document.querySelector("#reset");
const gridButton = document.querySelector("#grid_size_confirm");
const gridSizeInput = document.querySelector("#grid_size");
let colorModeButton = document.querySelector("#rainbow_toggle");
const colorDropdown = document.querySelector("#colorDropdown");

// event listeners
container.addEventListener("click", choosePaintMode);
container.addEventListener("mouseover", choosePaintMode);
mouseModeToggle.addEventListener("click", () => {
  hover = !hover;
});
reset.addEventListener("click", resetGridBackground);
gridButton.addEventListener("click", function () {
  setGridSize(parseInt(gridSizeInput.value));
});
gridButton.addEventListener("keyup", function (event) {
  if (event.key === "Enter") {
    setGridSize(parseInt(gridSizeInput.value));
  }
});
gridSizeInput.addEventListener("keyup", function (event) {
  if (event.key === "Enter") {
    setGridSize(parseInt(gridSizeInput.value));
  }
});
colorModeButton.addEventListener("click", changeColorMode);
colorDropdown.addEventListener("change", function (event) {
  currentColor = (event.target.value);
  colorDropdown.style.backgroundColor = event.target.value;
});

