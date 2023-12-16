const gridButton = document.querySelector("#grid_size_confirm");
const container = document.querySelector(".container");
let brushColor = "rgba(0, 0, 0, 1.0)";
document.querySelector("#colorDropdown").style.backgroundColor = brushColor;
let hover = true;
const rainbowColors = [
  "rgba(255, 0, 0, 1.0)",
  "rgba(255, 165, 0, 1.0)",
  "rgba(255, 255, 0, 1.0)",
  "rgba(0, 128, 0, 1.0)",
  "rgba(0, 0, 255, 1.0)",
  "rgba(75, 0, 130, 1.0)",
  "rgba(238, 130, 238, 1.0)",
];

function switchBrushMode() {
  const colorMode = document.querySelector("#rainbow_toggle").value;
  const tiles = document.querySelectorAll(".tile");
  let currentModeListener;
  const rainbowListener = setRainbowListeners();
  // const progressiveListener = setProgressiveListeners();
  tiles.forEach((tile) => {
    tile.removeEventListener("mouseover", rainbowListener);
    // tile.removeEventListener("mouseover", progressiveListener());
    tile.removeEventListener("click", rainbowListener);
    // tile.removeEventListener("click", progressiveListener());
  });
  if (colorMode === "Default") {
    brushColor = document.querySelector("#colorDropdown").style.backgroundColor;
  } else if (colorMode === "Rainbow") {
    brushColor = rainbowColors[0];
    currentModeListener = setRainbowListeners();
  } else {
    brushColor = document.querySelector("#colorDropdown").style.backgroundColor;
    resetGridBackground();
    // setProgressiveListeners();
  }
  if (currentModeListener) {
    tiles.forEach((tile) => {
      tile.addEventListener("mouseover", setRainbowListeners(tile));
    });
  }
}

function setRainbowListeners(tile) {
  const tiles = document.querySelectorAll(".tile");
  const rainbowListener = (event) => {
    switch (brushColor) {
      case rainbowColors[0]:
        brushColor = rainbowColors[1];
        break;
      case rainbowColors[1]:
        brushColor = rainbowColors[2];
        break;
      case rainbowColors[2]:
        brushColor = rainbowColors[3];
        break;
      case rainbowColors[3]:
        brushColor = rainbowColors[4];
        break;
      case rainbowColors[4]:
        brushColor = rainbowColors[5];
        break;
      case rainbowColors[5]:
        brushColor = rainbowColors[6];
        break;
      case rainbowColors[6]:
        brushColor = rainbowColors[0];
        break;
    }
  };

  tiles.forEach((tile) => {
    tile.addEventListener("mouseover", rainbowListener);
  });

  return rainbowListener;
}
// function setProgressiveListeners() {
//   const tiles = document.querySelectorAll(".tile");
//   const progressiveListener = (event) => {
//     let opacity = parseFloat(event.target.style.backgroundColor);
//     if (
//       event.target.style.backgroundColor === "rgba(255, 255, 255, 1.0)" ||
//       opacity < 1
//     ) {
//       opacity += 0.1;
//     }
//     event.target.style.backgroundColor = `rgba(${brushColor.slice(
//       5,
//       -1
//     )}, ${opacity})`;
//   };

//   tiles.forEach((tile) => {
//     tile.addEventListener("mouseover", progressiveListener);
//   });

//   return progressiveListener;
// }
function setGrid(number) {
  const container = document.querySelector(".container");
  container.innerHTML = "";
  for (let index = 0; index < number; index++) {
    const row = document.createElement("div");
    row.classList.add("row");
    row.setAttribute("style", `width: 100%; height: calc(100%/${number});`);
    for (let index = 0; index < number; index++) {
      const tile = document.createElement("div");
      tile.classList.add("tile");
      tile.setAttribute(
        "style",
        `width: calc(100% / ${number}); height: 100%;`
      );
      row.appendChild(tile);
    }
    container.appendChild(row);
    updateUI();
  }
}

// Brush color

const brushSelector = document.querySelector("#colorDropdown");
brushSelector.addEventListener("change", function (event) {
  setBrushColor(event.target.value);
});

function setBrushColor(color) {
  document.querySelector("#colorDropdown").style.backgroundColor = color;
  brushColor = color;
}

// Function to update styles and event listeners based on the hover state
function updateUI() {
  const colorModeButton = document.querySelector("#rainbow_toggle").value;
  if (colorModeButton === "Default") {
    brushColor = `rgba(${document.querySelector("#colorDropdown").style.backgroundColor.slice(4, -1)}, 1.0)`;
    // TODO: remove rainbow and progressive listeners and set color
  } else if (colorModeButton === "Rainbow") {
    // const tiles = document.querySelectorAll(".tile");
    // tiles.forEach((tile) => {
    //   tile.removeEventListener("mouseover", setRainbowListeners);
    // });
    // TODO: remove progressive listener and set color

    brushColor = switchBrushMode();
  } else {
    // TODO: remove rainbow listener and set color

    brushColor = switchBrushMode();
  }
  if (hover) {
    document.querySelector("#hover_span").style.fontWeight = "bold";
    document.querySelector("#active_span").style.fontWeight = "normal";
    updateTileListeners("mouseover", setHover);
  } else {
    document.querySelector("#active_span").style.fontWeight = "bold";
    document.querySelector("#hover_span").style.fontWeight = "normal";
    updateTileListeners("mousemove", setActive);
  }
}

// Function to remove all event listeners from tiles and add new ones based on the event type
function updateTileListeners(eventType, eventHandler) {
  const tiles = document.querySelectorAll(".tile");
  tiles.forEach((tile) => {
    // Remove both event listeners to avoid duplicates
    tile.removeEventListener("mouseover", setHover);
    tile.removeEventListener("mousemove", setActive);
    tile.removeEventListener("click", setClick);
    // Add the new event listener
    if (eventType == "mousemove") {
      tile.addEventListener(eventType, eventHandler);
      tile.addEventListener("click", setClick);
    } else {
      tile.addEventListener(eventType, eventHandler);
    }
  });
}

// Event listener for the label click
const mouseModeToggle = document.querySelector("#hover_active_label");
mouseModeToggle.addEventListener("click", () => {
  hover = !hover; // Toggle the hover state
  updateUI(); // Update the UI based on the new hover state
});

// at load UI update
updateUI();

function setHover(event) {
  const tile = event.target.style;
  // TODO: for rainbow mode, tile.backgroundColor should rgb(255, 0, 0)irect to another function, same with progressive
  tile.backgroundColor = brushColor;
}

let isMouseDown = false;
document.addEventListener("mousedown", () => {
  isMouseDown = true;
});

document.addEventListener("mouseup", () => {
  isMouseDown = false;
});
function setActive(event) {
  const tile = event.target.style;
  if (isMouseDown) {
    tile.backgroundColor = brushColor;
  }
}

function setClick(event) {
  const tile = event.target.style;
  tile.backgroundColor = brushColor;
}

// Color mode listener

const colorModeButton = document.querySelector("#rainbow_toggle");
colorModeButton.addEventListener("click", changeColorMode);

function changeColorMode() {
  const colorModeButton = document.querySelector("#rainbow_toggle");
  if (colorModeButton.value === "Default") {
    colorModeButton.value = "Rainbow";
    colorModeButton.textContent = "Rainbow";
    colorModeButton.style =
      "background: linear-gradient(to right, red, orange, yellow, green, blue, indigo, violet); color: black;";
    updateUI();
  } else if (colorModeButton.value === "Rainbow") {
    colorModeButton.value = "Progressive";
    colorModeButton.textContent = "Progressive";
    colorModeButton.style =
      "background: linear-gradient(to right, white, black); color: rgba(255, 0, 0, 1.0);";
    updateUI();
  } else {
    colorModeButton.value = "Default";
    colorModeButton.textContent = "Default";
    colorModeButton.style = "background: black; color: white;";
    updateUI();
  }
}

gridButton.addEventListener("click", function () {
  setGrid(parseInt(document.querySelector("#grid_size").value));
});
gridButton.addEventListener("keyup", function (event) {
  if (event.key === "Enter") {
    setGrid(parseInt(document.querySelector("#grid_size").value));
  }
});
document
  .querySelector("#grid_size")
  .addEventListener("keyup", function (event) {
    if (event.key === "Enter") {
      setGrid(parseInt(document.querySelector("#grid_size").value));
    }
  });

// TODO: leave undo button for the very last
// to learn about stack history and so on

// const undo = document.querySelector("#undo");

// undo.addEventListener("click", undoLastAction);

// // TODO: add title and property instead of passing titleBG paramenter, as it changes to "", not tile.style.BG
// function recordChange(tileBG, value) {
//   const previousValue = tileBG;
//   historyStack.push(() => {
//     tileBG = previousValue;
//   });
//   tileBG = value;
// }

// function undoLastAction() {
//   if (historyStack.length > 0) {
//     historyStack.pop();
//   }
// }

const eraser = document.querySelector("#eraser");

const reset = document.querySelector("#reset");

reset.addEventListener("click", resetGridBackground);
function resetGridBackground() {
  // set all tiles bgcolor to white
  const tiles = document.querySelectorAll(".tile");
  tiles.forEach((tile) => {
    tile.style.backgroundColor = "rgba(255, 255, 255, 1.0)";
  });
}

// reset.addEventListener("click", resetGrid);
