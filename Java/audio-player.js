// Creates the Audio Player Object
const audioPlayer = new Audio();

// Select Play Pause Button Element
const playPauseButton = document.getElementById("play-button");

//audioPlayer.src is the First song of the Audio Player by Default
audioPlayer.src = "Assets/Songs/Song 1.mp3";

/**
 * if Audio Player is not Playing -> Play Sound
 * if Audio Player is Playing -. Do Not Play Sound
 */
function onPlayPauseClick() {
    audioPlayer.play();
}

function onPlayPauseClick() {
    audioPlayer.pause();
}

// Link onclick Event to the onPlayPauseClick Button
playPauseButton.onclick = onPlayPauseClick;
