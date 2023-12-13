//  AELs grid size:
// keypress enter OK button and input --> Change grid size
//  input number --> create n rows + n columns
// Required integer between 10-100, placeholder message, no alert
// const div = document.createElement("div");
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
  }
  const tiles = document.querySelectorAll(".tile");
  tiles.forEach(tile => {
    tile.addEventListener("mouseover", setHover)
  });
}

function setHover(event) {
  const tile = event.target.style;
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

//  AELs hover/active toggle
// on toggle, change cursor behavior

//  AELs color mode
// each click changes color mode:
//  Default: single color
//  Rainbow: Random 7 colors
//  Prog: 10 colors from blackest to thin grey

//  AELs for grid divs
// each div has ELs for hover/active, design hover first, then add toggle for active
