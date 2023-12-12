//  AELs grid size:
// keypress enter OK button and input --> Change grid size
    //  input number --> create n rows + n columns
// Required integer between 10-100, placeholder message, no alert
const div = document.createElement("div");
const gridButton = document.querySelector("#grid_size_confirm");
const container = document.querySelector(".container");

function rows (number) {
    return div * 10;
}

function columns (number) {

}

function setGrid (number) {
    rows(number);
    columns(number);
    container.insertAdjacentElement(div)
}

gridButton.addEventListener("click", function() { setGrid(parseInt(document.querySelector("#grid_size").value)); });

//  AELs hover/active toggle
// on toggle, change cursor behavior

//  AELs color mode
// each click changes color mode:
//  Default: single color
//  Rainbow: Random 7 colors
//  Prog: 10 colors from blackest to thin grey

//  AELs for grid divs
// each div has ELs for hover/active, design hover first, then add toggle for active
