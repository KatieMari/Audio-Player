// Creates the Audio Player Object
const audioPlayer = new Audio();

// Select Play Pause Button Element
const playPauseButton = document.getElementById("play-button");

//audioPlayer.src is the First song of the Audio Player by Default
audioPlayer.src = "Assets/Songs/Song 1.mp3";


let playing = false;


/**
 * if Audio Player is Playing -> Do Not Play Sound
 * if Audio Player is not Playing -> Play Sound
 */
function onPlayPauseClick() {
    if (playing) {
        audioPlayer.pause();
        playPauseButton.innerHTML = "Play";
        playing = false;
    } else {
        audioPlayer.play();
        playPauseButton.innerHTML = "Pause";
        playing = true;
    }
}

function onLoadedMetadata(){
    console.log(audioPlayer.duration);
}

// Link onclick Event to the onPlayPauseClick Button
playPauseButton.onclick = onPlayPauseClick;
audioPlayer.onloadedmetadata = onLoadedMetadata;