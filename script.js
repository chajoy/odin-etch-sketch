const grid_container = document.querySelector(`#grid-container`);
const btn_create_grid = document.querySelector(`#btn-create-grid`);
const slider_grid_size = document.querySelector(`#slider-grid-size`);
const grid_size_display = document.querySelector(`#grid-size-display`);
const outline_toggle = document.querySelector(`#outline-tg`);
const GRID_SIZE = 800;

let mousedown = false;
let outlineVisible = true;

let currentTool = `paint`;

let currentColour = `black`;

document.addEventListener(`mouseup`, () => mousedown = false);
document.addEventListener(`mousedown`, () => mousedown = true);

const createGrid = function (amount = 16) {
    outlineVisible = true;
    outline_toggle.classList.add(`selected`);
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
                switch(currentTool)
                {
                    case `paint`:
                        paintCell(cell);
                        break;
                    case`bucket`:
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

const paintCell = function(cell)
{
    cell.style.backgroundColor = currentColour;
}

const colourGrid = function()
{
    document.querySelectorAll(`.cell`).forEach((e)=>e.style.backgroundColor = currentColour);
}

const clearGrid = function ()
{
    let cells = document.querySelectorAll(`.row`);
    cells.forEach((e) => e.remove());
}

outline_toggle.addEventListener(`click`, (e) => 
{
    let cells = document.querySelectorAll(`.cell`);
    if(outlineVisible)
        {
            outlineVisible = false;
            cells.forEach((e) => e.style.outline = `none`);
            outline_toggle.classList.remove(`selected`);
        }else
        {
            outlineVisible = true;
            cells.forEach((e) => e.style.outline = ``);
            outline_toggle.classList.add(`selected`);
        }
})

const selectColour = function(e)
{
    currentColour = e;
}

const selectTool = function(e)
{
    if(e.target.classList.contains(`tool`))
    {
        document.querySelectorAll(`.tools button`).forEach((e) => e.classList.remove(`selected`));
        currentTool = e.target.getAttribute(`tool`);
        e.target.classList.add(`selected`);
    }
}

createGrid();
