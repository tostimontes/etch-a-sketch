const gridButton = document.querySelector("#grid_size_confirm");
const container = document.querySelector(".container");
let brushColor = "black";


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

let hover = true; // Initial state of the hover variable

// Brush color

const brushSelector = document.querySelector("#colorDropdown");
brushSelector.addEventListener("change", function(event) {
  setBrushColor(event.target.value);
});

function setBrushColor(color) {
  document.querySelector("#colorDropdown").style.backgroundColor = color;
  brushColor = color;
}

// Function to update styles and event listeners based on the hover state
function updateUI() {
  const colorModeButton = document.querySelector("#rainbow_toggle").value;
  // if (colorModeButton === "Default") {
  //   brushColor = document.querySelector("#colorDropdown").style.backgroundColor;
  // } else if (colorModeButton === "Rainbow") {
  //   brushColor = rainbowBrush();
  // } else {
  //   brushColor = progressiveBrush();
  // }
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
  // TODO: instead of black, reference the color in the color selection with a variable (if default mode)
  // TODO: for rainbow mode, tile.backgroundColor should redirect to another function, same with progressive
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
  const tile = event.target.style
  tile.backgroundColor = brushColor;
}

// Color mode

const colorModeButton = document.querySelector("#rainbow_toggle");
colorModeButton.addEventListener("click", changeColorMode);

// TODO: puth brushColor and conditional in updateUI()
if (hover) {
  brushColor = "red";
} else {
  brushColor = "blue";
}

function changeColorMode() {
  const colorModeButton = document.querySelector("#rainbow_toggle").value;
  if (colorModeButton === "Default") {
    document.querySelector("#rainbow_toggle").value = "Rainbow";
    updateUI(); 
  } else if (colorModeButton === "Rainbow") {
    document.querySelector("#rainbow_toggle").value = "Progressive";
    updateUI();
  } else {
    document.querySelector("#rainbow_toggle").value = "Default";
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

// reset.addEventListener("click", resetGrid);

