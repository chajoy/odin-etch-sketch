const grid_container = document.querySelector(`#grid-container`);

const createTable = function ()
{
    for(x = 0; x < 16; x++)
    {
        const row = document.createElement(`div`);
        row.classList.add(`row`);
        for(y = 0; y < 16; y++)
        {
            const box = document.createElement(`div`);
            box.classList.add(`box`);
            row.appendChild(box);
        }
        grid_container.appendChild(row);
    }

}