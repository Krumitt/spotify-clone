let play_butt = document.querySelector("#play i");
let progress_bar = document.querySelector("#progressBar");
let music1 = new Audio("assets/audio/1.mp3");
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
        progress_bar.style.background = `linear-gradient(to right, green ${progress}%, white ${progress}%);`
    }
})
progress_bar.addEventListener('input', (e) => {
    let value = e.target.value;
    e.target.style.background = `linear-gradient(to right,green ${value}%,white ${value}%)`
    music1.currentTime = value * music1.duration / 100;
})
let playMusic = Array.from(document.getElementsByClassName("playMusic"));
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
        music1.play();
        play_butt.classList.remove('fa-circle-play');
        play_butt.classList.add('fa-circle-pause');
    })
})