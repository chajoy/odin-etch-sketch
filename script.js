const grid_container = document.querySelector(`#grid-container`);
const btn_create_grid = document.querySelector(`#btn-create-grid`);
const slider_grid_size = document.querySelector(`#slider-grid-size`);
const grid_size_display = document.querySelector(`#grid-size-display`);
const GRID_SIZE = 800;

let mousedown = false;

document.addEventListener(`mouseup`, () => mousedown = false);
document.addEventListener(`mousedown`, () => mousedown = true);

const createGrid = function (amount = 16) {
    clearGrid();
    let cellSize = 800 / amount;
    for (let x = 0; x < amount; x++) {
        const column = document.createElement(`div`);
        column.classList.add(`column`);
        for (let y = 0; y < amount; y++) {
            const box = document.createElement(`div`);
            box.style.height = cellSize + `px`;
            box.style.width = cellSize + `px`;

            box.classList.add(`box`);

            box.addEventListener(`mousedown`, () => mousedown = true);

            box.addEventListener(`mouseover`, () => {
                if (mousedown) {
                    box.classList.add(`active`);
                }
            })

            column.appendChild(box);
        }
        grid_container.appendChild(column);
    }

}

const clearGrid = function ()
{
    let cells = document.querySelectorAll(`.column`);
    cells.forEach((e) => e.remove());
}

