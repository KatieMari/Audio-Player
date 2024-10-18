// Creates the Audio Player Object
const audioPlayer = new Audio();

// Select Play Pause Button Element
const playPauseButton = document.getElementById("play-button");

// Select Progress Slider
const progressSlider = document.getElementById("progress-slider");

// Select Volume Slider
const volumeSlider = document.getElementById("volume-slider");

// Select Progress Text Spans
const progressText = document.getElementById("progress-text");
const durationText = document.getElementById("duration-text");

//audioPlayer.src is the First song of the Audio Player by Default
audioPlayer.src = "Assets/Songs/Song 1.mp3";
audioPlayer.volume = 0.5;

// Playing Stores if the audioPlayer is Currently Playing
let playing = false;

// updatingProgress Stores if the User is Updating the Progress in the progressBar
let updatingProgress = false;

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

/**
 * onLodedMetadata Updates the Maximum of the progressSlider and the innnerHTML of the durationText to the new audioPlayer.duration -  formatted where necessary
 */
function onLoadedMetadata() {
    progressSlider.max = audioPlayer.duration;

    durationText.innerHTML = secondsToMMSS(audioPlayer.duration);
}

/**
 * onTimeUpdate Updates the Value of the progressSlider and the innerHTML of the progressText to audioPlayer.currentTime - Formatted where Necessary
 * If the User is Updating the progressSlider, the Value of the progressSlider will not be Updated
 */
function onTimeUpdate() {
    if (!updatingProgress) {
        progressSlider.value = audioPlayer.currentTime;
    }

    progressText.innerHTML = secondsToMMSS(audioPlayer.currentTime);
}

/**
 * onEnd Resets all Necessary Values for the Song to Start Playing Again
 */
function onEnd() {
    progressSlider.value = 0;
    playPauseButton.innerHTML = "Play";
    playing = false;
    progressText.innerHTML = "00:00";
}

/**
 * Take Value of the volumeSlider and Update audioPlayer.volume
 */
function onVolumeSliderChange() {
    audioPlayer.volume = volumeSlider.value * 0.01;
}

/**
 * onProgressMouseDown Updates the updatingProgress Boolean to Mark the User is Updating the progressSlider
 */
function onProgressMouseDown() {
    updatingProgress = true;
}

/**
 * onProgressSliderChange Updates the currentTime of the audioPlayer to the Value of the progressSlider and updatingProgress to False, To Mark the User is not Moving the Slider Anymore
 */
function onProgressSliderChange() {
    audioPlayer.currentTime = progressSlider.value;
    updatingProgress = false;
}

/**
 * 
 * @param {Number} Seconds Time in Seconds 
 * @returns  Time Formatted as "MM:SS"
 */
function secondsToMMSS(seconds) {
    const integerSeconds = parseInt(seconds);

    // Calculate Seconds
    let MM = parseInt(integerSeconds / 60);
    if (MM < 10) MM = "0" + MM;

    // Calculate Minutes
    let SS = integerSeconds % 60;
    if (SS < 10) SS = "0" + SS;

    return MM + ":" + SS;
}



// Play Pause Button Events
playPauseButton.onclick = onPlayPauseClick;

// Audio Player Events
audioPlayer.onloadedmetadata = onLoadedMetadata;
audioPlayer.ontimeupdate = onTimeUpdate;
audioPlayer.onended = onEnd;

// Volume Slider Events
volumeSlider.onchange = onVolumeSliderChange;
progressSlider.onchange = onProgressSliderChange;
progressSlider.onmousedown = onProgressMouseDown;