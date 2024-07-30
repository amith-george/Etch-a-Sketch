
container = document.querySelector("#gridContainer");
normalmode = document.querySelector("#normal");
colormode = document.querySelector("#colored");
fademode = document.querySelector("#fade");
smallbutt = document.querySelector("#small");
medbutt = document.querySelector("#medium");
largebutt = document.querySelector("#large");
clearbutt = document.querySelector("#erase");


let mouseKey = false;

// Creating Grid

const createGrid = (size) =>{
    container.innerHTML = '';

    containerHeight = container.clientHeight;
    const boxSize = containerHeight / size;
    container.style.height = `${boxSize * size}px`;
    container.style.width = `${boxSize * size}px`;

    container.style.gridTemplateColumns = `repeat(${size},${boxSize}px)`
    container.style.gridTemplateRows = `repeat(${size},${boxSize}px)`


    for (let i = 0; i < size * size; i++) {
        const box = document.createElement('div');
        box.className = 'grid-item';
        box.dataset.fadeStep = 0; 
        box.style.width = `${boxSize}px`;
        box.style.height = `${boxSize}px`;
        container.appendChild(box);
    }

    container.style.width = `${boxSize * size}px`;
    container.style.height = `${boxSize * size}px`;

    normalBlock();
}


// Normal Buttons

const normalBlock = () => {
    const boxes = document.querySelectorAll(".grid-item");
    boxes.forEach(box => {
        box.addEventListener("mouseover",() =>{
            if(mouseKey) {
            box.style.backgroundColor = "black";
            }
        });
});
}

// Colored Buttons

const getRandomColor = () => {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}


const coloredBlock = () => {
    const boxes = document.querySelectorAll(".grid-item");
    boxes.forEach(box => {
    box.addEventListener("mouseover",() =>{
        if(mouseKey){
        box.style.backgroundColor = getRandomColor();
        }
    });
});
}


// Fade Buttons


const fadeBlock = () => {
    const boxes = document.querySelectorAll(".grid-item");
    const colors = ['#FFFFFF', '#CCCCCC',  '#666666', '#333333', '#000000'];

    boxes.forEach(box => {
        box.addEventListener("mouseover", (event) => {
            if(mouseKey){
            let step = parseInt(box.dataset.fadeStep, 10); 
            if (step < colors.length - 1) {
                step++;
            }
            box.style.backgroundColor = colors[step];
            box.dataset.fadeStep = step; 
            }   
        });
    });
}

// Erase Button


const eraseBlock = () => {
    const boxes = document.querySelectorAll(".grid-item");
    boxes.forEach(box => {
    box.style.backgroundColor = "";
    box.dataset.fadeStep = 0;
});
}


// Mouse event

document.addEventListener("mousedown", (event) => {
    if(event.button == 0)
    {
        mouseKey = true;
    }
});

document.addEventListener("mouseup", (event) => {
    if(event.button == 0)
    {
        mouseKey = false;
    }
});




normalmode.addEventListener("click",normalBlock);
colormode.addEventListener("click",coloredBlock);
fademode.addEventListener("click",fadeBlock);
smallbutt.addEventListener("click",() => createGrid(50));
medbutt.addEventListener("click", () => createGrid(20));
largebutt.addEventListener("click", () => createGrid(8));
clearbutt.addEventListener("click",eraseBlock);


createGrid(20);