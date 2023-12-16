// global variables
let isMouseDown = false;
document.addEventListener("mousedown", () => {
  isMouseDown = true;
});
document.addEventListener("mouseup", () => {
  isMouseDown = false;
});
let hover = true;
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
let currentColor =
  document.querySelector("#colorDropdown").style.backgroundColor;

// TODO: add restrictions to input
function setGridSize(inputNumber) {

if (!Number.isInteger(inputNumber) || inputNumber < 10 || inputNumber > 100) {
    alert("Please enter a whole integer between 10 and 100.");
    return;
}
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
    event.target.style.backgroundColor = getColorForTile(event.target);
  }
}

// So paintTile should be the color selection function, so that first
// the code evaluates and then the paintTile function evaluates which color to use
function getColorForTile(tile) {
  switch (colorModeButton.value) {
    case "Rainbow":
      const color = rainbowColors[rainbowIndex];
      rainbowIndex = (rainbowIndex + 1) % rainbowColors.length;
      return color;

    case "Progressive":
      // 1. retrieve tile's opacity
      // 2. retrieve current color and translate
      return addOpacityToColor(tile, currentColor, 0.1);

    default: // Default mode
      return currentColor;
  }
}

function addOpacityToColor(tile, currentColor, opacityIncrement) {
  translateColorToRGBA(currentColor);
  function translateColorToRGBA(colorName) {
    const colorMap = {
      red: "rgba(255, 0, 0, 1)",
      orange: "rgba(255, 165, 0, 1)",
      yellow: "rgba(255, 255, 0, 1)",
      green: "rgba(0, 128, 0, 1)",
      blue: "rgba(0, 0, 255, 1)",
      indigo: "rgba(75, 0, 130, 1)",
      violet: "rgba(238, 130, 238, 1)",
      black: "rgba(0, 0, 0, 1)",
      white: "rgba(255, 255, 255, 1)",
      // Add more colors as needed
    };

    currentColor = colorMap[colorName.toLowerCase()] || colorName;
    rgbaStringToArray(currentColor);
    function rgbaStringToArray(rgbaString) {
      // Remove 'rgba(' at the start and ')' at the end, then split by ', '
      currentColor = rgbaString.replace("rgba(", "").replace(")", "").split(", ");
      return currentColor;
    }
  }
  let currentOpacity = window
    .getComputedStyle(tile)
    .backgroundColor.match(/rgba?\((\d+), (\d+), (\d+)(?:, ([\d.]+))?\)/);
  let currentAlpha = currentOpacity ? parseFloat(currentOpacity[4] || 1) : 1;

  let newOpacity = Math.min(currentAlpha + opacityIncrement, 1);
  if (tile.style.backgroundColor == "rgb(255, 255, 255)") {
    newOpacity = 0.1;
  }
  console.log(
    `rgba(${currentColor[0]}, ${currentColor[1]}, ${currentColor[2]}, ${newOpacity})`
  );
  return `rgba(${currentColor[0]}, ${currentColor[1]}, ${currentColor[2]}, ${newOpacity})`;
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
      resetGridBackground();
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

function setEraser() {
  currentColor = "white";
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
  if (hover) {
    document.querySelector("#hover_span").style.fontWeight = "bold";
    document.querySelector("#active_span").style.fontWeight = "normal";
  } else {
    document.querySelector("#active_span").style.fontWeight = "bold";
    document.querySelector("#hover_span").style.fontWeight = "normal";
  }
});
reset.addEventListener("click", resetGridBackground);
eraser.addEventListener("click", setEraser);
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
  currentColor = event.target.value;
  colorModeButton.value === "Progressive" ? resetGridBackground() : null;
  colorDropdown.style.backgroundColor = event.target.value;
});
