const grid_container = document.querySelector(`#grid-container`);
const btn_create_grid = document.querySelector(`#btn-create-grid`);
const slider_grid_size = document.querySelector(`#slider-grid-size`);
const grid_size_display = document.querySelector(`#grid-size-display`);
const outline_toggle = document.querySelector(`#outline-tg`);
const GRID_SIZE = 800;

let mousedown = false;
let outlineVisible = true;

document.addEventListener(`mouseup`, () => mousedown = false);
document.addEventListener(`mousedown`, () => mousedown = true);

const createGrid = function (amount = 16) {
    outlineVisible = true;
    outline_toggle.checked = true;
    clearGrid();
    let cellSize = 800 / amount;
    for (let x = 0; x < amount; x++) {
        const column = document.createElement(`div`);
        column.classList.add(`row`);
        for (let y = 0; y < amount; y++) {
            const cell = document.createElement(`div`);
            cell.style.height = cellSize + `px`;
            cell.style.width = cellSize + `px`;

            cell.classList.add(`cell`);

            cell.addEventListener(`mousedown`, () => 
            {
                mousedown = true;
                cell.style.backgroundColor = currentColour;
            });

            cell.addEventListener(`mouseover`, () => {
                if (mousedown) {
                    cell.style.backgroundColor = currentColour;
                }
            })

            column.appendChild(cell);
        }
        grid_container.appendChild(column);
    }

}

const clearGrid = function ()
{
    let cells = document.querySelectorAll(`.row`);
    cells.forEach((e) => e.remove());
}

outline_toggle.addEventListener(`click`, (e) => 
{
    if(outlineVisible)
        {
            outlineVisible = false;
            let cells = document.querySelectorAll(`.cell`);
            cells.forEach((e) => e.style.outline = `none`);
        }else
        {
            outlineVisible = true;
            let cells = document.querySelectorAll(`.cell`);
            cells.forEach((e) => e.style.outline = ``);
        }
})

const selectColour = function(e)
{
    currentColour = e.target.style.backgroundColor;
}

createGrid();
