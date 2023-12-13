const gridButton = document.querySelector("#grid_size_confirm");
const container = document.querySelector(".container");

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
  // const tiles = document.querySelectorAll(".tile");
  // // add conditionals to set different events depending on how toggles are set beforehand
  // // so that setHover is default, but if Active is set, it should setActive function
  // // anyway, it should be possible to toggle after the setGRid has been called
  // tiles.forEach(tile => {
  //   tile.addEventListener("mouseover", setHover)
  // });
}

// Hover/Active toggle
// let hover = true;
// const mouseModeToggle = document.querySelector("#hover_active_label");
// mouseModeToggle.addEventListener("click", () => {
//   hover = !hover;
//   console.log(hover)
// });

// if (hover) {
//   document.querySelector("#hover_span").style.fontWeight = "bold";
//   document.querySelector("#active_span").style.fontWeight = "normal";
//   const tiles = document.querySelectorAll(".tile");
//   tiles.forEach((tile) => {
//     tile.addEventListener("mouseover", setHover);
//   });
// } else {
//   document.querySelector("#active_span").style.fontWeight = "bold";
//   document.querySelector("#hover_span").style.fontWeight = "normal";
//   const tiles = document.querySelectorAll(".tile");
//   tiles.forEach((tile) => {
//     tile.addEventListener("mousemove", setActive);
//   });
// }

let hover = true; // Initial state of the hover variable

// Function to update styles and event listeners based on the hover state
function updateUI() {
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
  tile.backgroundColor = "black";
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
    tile.backgroundColor = "black";
  }
}

function setClick(event) {
  const tile = event.target.style
  tile.backgroundColor = "black";
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

// add event listeners for toggles, only enabled once grid is set

//  AELs hover/active toggle
// on toggle, change cursor behavior

//  AELs color mode
// each click changes color mode:
//  Default: single color
//  Rainbow: Random 7 colors
//  Prog: 10 colors from blackest to thin grey

//  AELs for grid divs
// each div has ELs for hover/active, design hover first, then add toggle for active
