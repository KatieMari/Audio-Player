// Creates the Audio Player Object
const audioPlayer = new Audio();

// Song Info
const songName = document.getElementById("song-name");
const artistName = document.getElementById("artist-name");
const coverImage = document.getElementById("cover-img");

// Select Play Pause Previous Next Button Element
const playPauseButton = document.getElementById("play-pause-button");
const nextButton = document.getElementById("next-button");
const previousButton = document.getElementById("previous-button");

// Select Progress Slider and Volume Slider
const progressSlider = document.getElementById("progress-slider");
const volumeSlider = document.getElementById("volume-slider");

// Select Progress Text Spans
const progressText = document.getElementById("progress-text");
const durationText = document.getElementById("duration-text");

//audioPlayer.src is the First song of the Audio Player by Default
audioPlayer.src = "Assets/Songs/Song 1.mp3";
const songs = [
    {
        name: "What Was I Made For",
        artist: "Billie Eilish ft. Bongo Cat",
        src: "Assets/Songs/Song 1.mp3",
        cover: "Assets/Images/Image 1.jpeg",
    },

    {
        name: "Lover",
        artist: "Taylor Swift ft. Bongo Cat",
        src: "Assets/Songs/Song 2.mp3",
        cover: "Assets/Images/Image 2.jpg",
    },

    {
        name: "Vampire",
        artist: "Olivia Rodrigo ft. Bongo Cat",
        src: "Assets/Songs/Song 3.mp3",
        cover: "Assets/Images/Image 3.png",
    },

    {
        name: "Birds of a Feather",
        artist: "Billie Eilish ft. Bongo Cat",
        src: "Assets/Songs/Song 4.mp3",
        cover: "Assets/Images/Image 4.jpg",
    },

    {
        name: "Touch",
        artist: "Katseye ft. Bongo Cat",
        src: "Assets/Songs/Song 5.mp3",
        cover: "Assets/Images/Image 5.jpg",
    },

    {
        name: "Espresso",
        artist: "Sabrina Carpenter ft. Bongo Cat",
        src: "Assets/Songs/Song 6.mp3",
        cover: "Assets/Images/Image 6.png",
    },
];

// Playing Stores if the audioPlayer is Currently Playing
let playing = false;

// Song Index
let songIndex = 0;

// updatingProgress Stores if the User is Updating the Progress in the progressBar
let updatingProgress = false;

/**
 * Drag-and-Drop: Set up drag events for each song in the list.
 */
const songItems = document.querySelectorAll(".song-item");
songItems.forEach((songItem, index) => {
    songItem.setAttribute("draggable", "true");
    songItem.dataset.index = index;

    songItem.ondragstart = (event) => {
        event.dataTransfer.setData("text/plain", event.target.dataset.index);
    };
});

dropZone.ondrop = (event) => {
    event.preventDefault();
    const droppedSongIndex = event.dataTransfer.getData("text/plain");
    if (droppedSongIndex) {
        songIndex = parseInt(droppedSongIndex, 10);
        updatePlayingSong();
    }
};



/**
 * Everything that Happens when Audio is Played
 */
function playAudio() {
    audioPlayer.play();
    playPauseButton.src = "Assets/Images/Pause-Icon.png"
}

/**
 * Everything that Happens when Audio is Paused
 */
function pauseAudio() {
    audioPlayer.pause();
    playPauseButton.src = "Assets/Images/Play-Icon.png";
}

/**
 * if Audio Player is Playing -> Do Not Play Sound
 * if Audio Player is not Playing -> Play Sound
 */
function onPlayPauseClick() {
    if (playing) {
        pauseAudio();
        playing = false;
    } else {
        playAudio();
        playing = true;
    }
}

/**
 * onLodedMetadata Updates the Maximum of the progressSlider when new src is Loaded
 */
function onLoadedMetadata() {
    progressSlider.max = audioPlayer.duration;
    progressSlider.value = 0;

    // Reset Time Display
    const minutesSeconds = secondsToMMSS(audioPlayer.duration);
    durationText.innerHTML = minutesSeconds;
    progressText.innerHTML = "00:00";

    // Sync Play State
    if (playing) {
        audioPlayer.play();
    }
}

/**
 * Restart Playing After Song Change
 */
function updatePlayingSong() {
    audioPlayer.pause();

    //If Beyond Array -> Reset
    if (songIndex >= songs.length) songIndex = 0;
    if (songIndex < 0) songIndex = songs.length - 1;

    // Update src and Display
    audioPlayer.src = songs[songIndex].src;
    songName.innerHTML = songs[songIndex].name;
    artistName.innerHTML = songs[songIndex].artist;
    coverImage.src = songs[songIndex].cover;

    if (playing) playAudio();
}

// When Next is Pressed
function nextSong() {
    // Updates Song Index
    songIndex++;
    updatePlayingSong();
}

// When Previous is Pressed
function previousSong() {
    // Updates Song Index
    songIndex--;
    updatePlayingSong();
}

/**
 * onTimeUpdate Updates the Value of the progressSlider and the innerHTML of the progressText to audioPlayer.currentTime - Formatted where Necessary
 * If the User is Updating the progressSlider, the Value of the progressSlider will not be Updated
 */
function onTimeUpdate() {
    // Update Time Display with Exact Current Time
    const minutesSeconds = secondsToMMSS(audioPlayer.currentTime);
    progressText.innerHTML = minutesSeconds;

    // Update Slider
    if (!updatingProgress) {
        progressSlider.value = audioPlayer.currentTime;
    }
}

/**
 * onEnd Resets all Necessary Values for the Song to Start Playing Again
 */
function onEnd() {
    progressSlider.value = 0;
    playPauseButton.src = "Assets/Images/Play-Icon.png"
    playing = false;
    progressText.innerHTML = "00:00";
}

/**
 * Take Value of the volumeSlider and Update audioPlayer.volume
 */
function onVolumeSliderChange() {
    audioPlayer.volume = volumeSlider.value * 0.01;
    // Displays Current Volume
    console.log("volume:" + (audioPlayer.volume * 100) + "%");
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
nextButton.onclick = nextSong;
previousButton.onclick = previousSong;

// Audio Player Events
audioPlayer.onloadedmetadata = onLoadedMetadata;
audioPlayer.ontimeupdate = onTimeUpdate;
audioPlayer.onended = nextSong;

// Volume Slider Events
volumeSlider.onchange = onVolumeSliderChange;

// Progress Slider Events
progressSlider.onchange = onProgressSliderChange;
progressSlider.onmousedown = onProgressMouseDown;

// Keyboard Controls
document.addEventListener('keydown', (event) => {
    switch (event.code) {
        case 'Space':
            onPlayPauseClick();
            event.preventDefault();
            break;
        case 'ArrowRight':
            nextSong();
            break;
        case 'ArrowLeft':
            previousSong();
            break;
    }
});