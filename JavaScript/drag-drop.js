// Get References to the Drop Zone and Draggable Elements
const dropZone = document.getElementById("dropzone");
const draggable = document.getElementById("player-container");

// Variables to Store Offset Values for Accurate Dragging
let offsetX = 0;
let offsetY = 0;

// Prevent Default Behavior for Drag Over Event
dropZone.ondragover = (event) => {
    event.preventDefault();
};

// Handle Drop Event
dropZone.ondrop = (event) => {
    // Set New Position Based on Mouse Coordinates Minus Offset
    draggable.style.left = event.clientX - offsetX + "px";
    draggable.style.top = event.clientY - offsetY + "px";
};

// Handle Drag Start Event
draggable.ondragstart = (event) => {
    // Prevent Dragging if Slider is Changing
    if (isSliderChanging) {
        event.preventDefault();
        return;
    }

    // Get Current Style Properties
    const style = window.getComputedStyle(draggable);

    // Calculate Offset Values for Accurate Dragging
    offsetX = event.clientX - parseInt(style.left);
    offsetY = event.clientY - parseInt(style.top);
};