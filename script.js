const grid_container = document.querySelector(`#grid-container`);
const btn_create_grid = document.querySelector(`#btn-create-grid`);
const slider_grid_size = document.querySelector(`#slider-grid-size`);
const grid_size_display = document.querySelector(`#grid-size-display`);
const grid_overlay_toggle = document.querySelector(`#btn_grid-overlay-tg`);
const container_colourPalette = document.querySelector(`#container_colourPalette`);
const GRID_SIZE = 800;
let dynamic_grid_size;
const MAX_COLOUR_COUNT = 16;

let mousedown = false;
let gridOverlayVisible = true;

let colourPalette_index = 0;

let currentTool = `paint`;
let currentColour = `black`;

let colourPalette_array = [];

document.addEventListener(`mouseup`, () => mousedown = false);
document.addEventListener(`mousedown`, () => mousedown = true);

grid_overlay_toggle.addEventListener(`click`, (e) => {
    let cells = document.querySelectorAll(`.cell`);
    if (gridOverlayVisible) {
        gridOverlayVisible = false;
        cells.forEach((e) => e.style.outline = `none`);
        grid_overlay_toggle.classList.remove(`selected`);
    } else {
        gridOverlayVisible = true;
        cells.forEach((e) => e.style.outline = ``);
        grid_overlay_toggle.classList.add(`selected`);
    }
})

container_colourPalette.addEventListener(`click`, (e) =>
{
    currentColour = e.target.style.backgroundColor;
    colourPalette_array.forEach((e) => e.classList.remove(`selectedColour`));
    e.target.classList.add(`selectedColour`);
})

const createGrid = function (amount = 16) {
    clearGrid();
    dynamic_grid_size = grid_container.offsetHeight;
    gridOverlayVisible = true;
    grid_overlay_toggle.classList.add(`selected`);
    let cellSize = dynamic_grid_size / amount;
    for (let x = 0; x < amount; x++) {
        let column = document.createElement(`div`);
        column.classList.add(`row`);
        for (let y = 0; y < amount; y++) {
            let cell = document.createElement(`div`);
            cell.style.height = cellSize + `px`;
            cell.style.width = cellSize + `px`;

            cell.classList.add(`cell`);

            cell.addEventListener(`mousedown`, () => {
                mousedown = true;
                switch (currentTool) {
                    case `paint`:
                        paintCell(cell);
                        break;
                    case `bucket`:
                        colourGrid();
                        break;
                    default:
                        break;
                }
            });

            cell.addEventListener(`mouseover`, () => {
                if (mousedown) {
                    paintCell(cell);
                }
            })

            column.appendChild(cell);
        }
        grid_container.appendChild(column);
    }

}

const paintCell = function (cell) {
    cell.style.backgroundColor = currentColour;
}

const colourGrid = function () {
    document.querySelectorAll(`.cell`).forEach((e) => e.style.backgroundColor = currentColour);
}

const clearGrid = function () {
    let cells = document.querySelectorAll(`.row`);
    cells.forEach((e) => e.remove());
}


const selectColour = function (e) {
    currentColour = e;
}

const selectTool = function (e) {
    if (e.target.classList.contains(`tool`)) {
        document.querySelectorAll(`.tools button`).forEach((e) => e.classList.remove(`selected`));
        currentTool = e.target.getAttribute(`tool`);
        e.target.classList.add(`selected`);
    }
}

const addToPalette = function () {
    if(colourPalette_array.length != MAX_COLOUR_COUNT)
    {
        let newColour = document.createElement(`div`);
        newColour.style.backgroundColor = currentColour;
        newColour.classList.add(`colour`);
        container_colourPalette.appendChild(newColour);
        colourPalette_array.push(newColour);
    }else if(colourPalette_array.length === MAX_COLOUR_COUNT && colourPalette_index != MAX_COLOUR_COUNT)
    {
        colourPalette_array[colourPalette_index].style.backgroundColor = currentColour;
        colourPalette_index++;
    }else
    {
        colourPalette_index = 0;
        colourPalette_array[colourPalette_index].style.backgroundColor = currentColour;
        colourPalette_index++;
    }
}

createGrid();

window.addEventListener(`resize`, () => 
{
    createGrid();
});
