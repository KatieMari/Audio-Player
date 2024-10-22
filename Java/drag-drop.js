const dropZone = document.getElementById("dropzone");
const draggable = document.getElementById("player-container");

let offsetX = 0;
let offsetY = 0;

dropZone.ondragover = (event) => {
    event.preventDefault();
};

dropZone.ondrop = (event) => {
    let newX = event.clientX - offsetX;
    let newY = event.clientY - offsetY;
    draggable.style.left = event.clientX - offsetX + "px";
    draggable.style.top = event.clientY - offsetY + "px";
};

draggable.ondragstart = (event) => {
    const style = window.getComputedStyle(draggable);
    offsetX = event.clientX - parseInt(style.left);
    offsetY = event.clientY - parseInt(style.top);
};