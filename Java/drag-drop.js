// Select the dropZone and Player Container for drag and drop functionality
const dropZone = document.getElementById("dropzone");
const draggable = document.getElementById("player-container");
const songItems = Array.from(document.getElementsByClassName("song-item"));

// Variables to Track Offset when Dragging the Player Container
let offsetX = 0;
let offsetY = 0;

// Ensure dropZone Allows Dropping Items by Preventing Default Behaviour on DragOver
dropZone.ondragover = (event) => {
    event.preventDefault();
};

// Drop Event for Player Container
dropZone.ondrop = (event) => {
    event.preventDefault();
    const droppedSongIndex = event.dataTransfer.getData("text/plain");
    if (droppedSongIndex) {
        songIndex = parseInt(droppedSongIndex, 10);
        updatePlayingSong();
    }
};

// Set up Drag Start for the Player Container Itself
draggable.ondragstart = (event) => {
    const style = window.getComputedStyle(draggable);
    offsetX = event.clientX - parseInt(style.left);
    offsetY = event.clientY - parseInt(style.top);
};

// Song drag-and-drop setup
songItems.forEach((songItem, index) => {
    // Make each song item draggable and set its index
    songItem.setAttribute("draggable", "true");
    songItem.dataset.index = index;

    // Add drag start event to store the song index
    songItem.ondragstart = (event) => {
        event.dataTransfer.setData("text/plain", event.target.dataset.index);
    };
});
