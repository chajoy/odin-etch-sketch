const grid_container = document.querySelector(`#grid-container`);

const createTable = function ()
{
    for(x = 0; x < 16; x++)
    {
        const column = document.createElement(`div`);
        column.classList.add(`column`);
        for(y = 0; y < 16; y++)
        {
            const box = document.createElement(`div`);
            box.classList.add(`box`);
            column.appendChild(box);
        }
        grid_container.appendChild(column);
    }

}