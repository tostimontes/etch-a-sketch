//  AELs grid size:
// keypress enter OK button and input --> Change grid size
//  input number --> create n rows + n columns
// Required integer between 10-100, placeholder message, no alert
// const div = document.createElement("div");
const gridButton = document.querySelector("#grid_size_confirm");
const container = document.querySelector(".container");


function setGrid(number) {
  const div = document.createElement("div");
  const row = div;
  div.classList.add("tile");

  for (let index = 0; index < number; index++) {
    row.insertAdjacentHTML("afterbegin", div.outerHTML);
  }
  container.insertAdjacentHTML("afterbegin", row.outerHTML);
}

gridButton.addEventListener("click", function () {
  setGrid(parseInt(document.querySelector("#grid_size").value));
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
