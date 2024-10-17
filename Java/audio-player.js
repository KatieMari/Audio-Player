// Creates the Audio Player Object
const audioPlayer = new Audio();

// Select Play Pause Button Element
const playPauseButton = document.getElementById("play-button");

// Select Progress Slider
const progressSlider = document.getElementById("progress-slider");

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
    progressSlider.max = audioPlayer.duration;
}

function onTimeUpdate() {
    progressSlider.value = audioPlayer.currentTime;
}

function onEnd(){
    progressSlider.value = 0;
    playPauseButton.innerHTML = "Play"
    playing = false;
}


// Link onclick Event to the onPlayPauseClick Button
playPauseButton.onclick = onPlayPauseClick;
audioPlayer.onloadedmetadata = onLoadedMetadata;
audioPlayer.ontimeupdate = onTimeUpdate;
audioPlayer.onended = onEnd;