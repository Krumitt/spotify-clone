
const playBtn = document.querySelector("#play");
const forwardBtn = document.querySelector("#forward");
const backwardBtn = document.querySelector("#backward");
const shuffleBtn = document.querySelector("#shuffle");
const repeatBtn = document.querySelector("#repeat");
const progressBar = document.querySelector("#progressBar");

const playMusic = Array.from(document.getElementsByClassName("playMusic"));


let music = new Audio("assets/audio/1.mp3");
let currSong = 1;
const totalSongs = playMusic.length;

let isShuffle = false;
let isRepeat = false;

function makeAllPlay() {
    playMusic.forEach(icon => {
        icon.classList.add("fa-play");
        icon.classList.remove("fa-pause");
    });
}


function playSong(index) {
    currSong = index;

    music.src = `assets/audio/${currSong}.mp3`;
    music.currentTime = 0;
    music.play();

    // main play button
    playBtn.classList.remove("fa-circle-play");
    playBtn.classList.add("fa-circle-pause");

    // card icons
    makeAllPlay();
    const activeIcon = document.getElementById(currSong.toString());
    if (activeIcon) {
        activeIcon.classList.remove("fa-play");
        activeIcon.classList.add("fa-pause");
    }
}


playBtn.addEventListener("click", () => {
    if (music.paused) {
        music.play();
        playBtn.classList.remove("fa-circle-play");
        playBtn.classList.add("fa-circle-pause");
    } else {
        music.pause();
        playBtn.classList.remove("fa-circle-pause");
        playBtn.classList.add("fa-circle-play");
    }
});


playMusic.forEach(icon => {
    icon.addEventListener("click", (e) => {
        const index = parseInt(e.target.id);
        playSong(index);
    });
});


function playNextSong() {
    if (isShuffle) {
        let random;
        do {
            random = Math.floor(Math.random() * totalSongs) + 1;
        } while (random === currSong);
        playSong(random);
    } else {
        let next = currSong + 1;
        if (next > totalSongs) next = 1;
        playSong(next);
    }
}

function playPrevSong() {
    let prev = currSong - 1;
    if (prev < 1) prev = totalSongs;
    playSong(prev);
}

forwardBtn.addEventListener("click", playNextSong);
backwardBtn.addEventListener("click", playPrevSong);


shuffleBtn.addEventListener("click", () => {
    isShuffle = !isShuffle;
    shuffleBtn.style.color = isShuffle ? "white" : "";
});

repeatBtn.addEventListener("click", () => {
    isRepeat = !isRepeat;
    repeatBtn.style.color = isRepeat ? "white" : "";
});


music.addEventListener("ended", () => {
    if (isRepeat) {
        playSong(currSong);
    } else {
        playNextSong();
    }
});


music.addEventListener("timeupdate", () => {
    if (!isNaN(music.duration)) {
        const percent = (music.currentTime / music.duration) * 100;
        progressBar.value = percent;
        progressBar.style.background =
            `linear-gradient(to right, #1db954 ${percent}%, #4d4d4d ${percent}%)`;
    }
});


progressBar.addEventListener("input", (e) => {
    if (!isNaN(music.duration)) {
        const value = e.target.value;
        music.currentTime = (value / 100) * music.duration;
        e.target.style.background =
            `linear-gradient(to right, #1db954 ${value}%, #4d4d4d ${value}%)`;
    }
});
