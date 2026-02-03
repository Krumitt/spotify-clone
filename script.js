let play_butt = document.querySelector("#play");
let progress_bar = document.querySelector("#progressBar");
let music1 = new Audio("assets/audio/1.mp3");
let curr_song = 1;
play_butt.addEventListener('click', () => {
    if (music1.paused || music1.currentTime == 0) {
        music1.play();
        play_butt.classList.remove('fa-circle-play');
        play_butt.classList.add('fa-circle-pause');
    }
    else {
        music1.pause();
        play_butt.classList.remove('fa-circle-pause');
        play_butt.classList.add('fa-circle-play');
    }
})
music1.addEventListener('timeupdate', () => {
    if (!isNaN(music1.duration)) {
        let progress = music1.currentTime / music1.duration * 100;
        progress_bar.value = progress;
        progress_bar.style.background = `linear-gradient(to right, green ${progress}%, white ${progress}%)`
    }
})
progress_bar.addEventListener('input', (e) => {
    let value = e.target.value;
    e.target.style.background = `linear-gradient(to right,green ${value}%,white ${value}%)`
    music1.currentTime = value * music1.duration / 100;
})
let playMusic = Array.from(document.getElementsByClassName("playMusic"));
let totalSongs = playMusic.length;
let makeAllPlay = () => {
    playMusic.forEach((element) => {
        element.classList.add('fa-play');
        element.classList.remove('fa-pause');
    })
}
playMusic.forEach((element) => {
    element.addEventListener('click', (e) => {
        makeAllPlay();
        e.target.classList.remove('fa-play');
        e.target.classList.add('fa-pause');
        index = parseInt(e.target.id);
        music1.src = `assets/audio/${index}.mp3`;
        music1.currentTime = 0;
        curr_song = index;
        music1.play();
        play_butt.classList.remove('fa-circle-play');
        play_butt.classList.add('fa-circle-pause');
    })
})
let playNextSong = () => {
    let nextSong = (curr_song + 1) % totalSongs;
    curr_song = nextSong == 0 ? totalSongs : nextSong;
    makeAllPlay();
    document.getElementById(curr_song.toString()).classList.remove("fa-play");
    document.getElementById(curr_song.toString()).classList.add("fa-pause");
    music1.src = `assets/audio/${curr_song}.mp3`
    music1.currentTime = 0;
    music1.play();
}
let playPrevSong = () => {
    let prevSong = (curr_song - 1 + totalSongs) % totalSongs;
    curr_song = prevSong == 0 ? totalSongs : prevSong;
    document.getElementById(curr_song.toString()).classList.remove('fa-play');
    document.getElementById(curr_song.toString()).classList.add('fa-pause');
    music1.src = `assets/audio/${curr_song}.mp3`
    music1.currentTime = 0;
    music1.play();
}
let forward = document.querySelector("#forward");
let backward = document.querySelector("#backward");
forward.addEventListener('click', () => {
    playNextSong();
})
backward.addEventListener('click', () => {
    playPrevSong();
})
music1.addEventListener('ended', () => {
    playNextSong();
})