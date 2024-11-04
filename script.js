const grid_container = document.querySelector(`#grid-container`);
const btn_create_grid = document.querySelector(`#btn-create-grid`);

let mousedown = false;

document.addEventListener(`mouseup`, () => mousedown = false);
document.addEventListener(`mousedown`, () => mousedown = true);

const createTable = function () {
    for (let x = 0; x < 16; x++) {
        const column = document.createElement(`div`);
        column.classList.add(`column`);
        for (let y = 0; y < 16; y++) {
            const box = document.createElement(`div`);
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

btn_create_grid.addEventListener(`click`, () => {
    createTable();
    btn_create_grid.remove();
})