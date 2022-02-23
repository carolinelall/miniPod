/*jshint esversion: 6*/
console.log("Welcome to Spotify");
/*initialising */
let songIndex = 0;
let audioElement = new Audio('songs/1.mp3');
let masterPlay = document.getElementById('masterPlay');
let myProgressBar = document.getElementById('myProgressBar');
let gif = document.getElementById('gif');
let songItems = Array.from(document.getElementsByClassName('songItem'));
let masterSongName = document.getElementById('masterSongName');
let artist= document.getElementById('artist');
let songItemPlay = Array.from(document.getElementsByClassName('songItemPlay'));
let songImage= document.getElementById('song-image');
let replay= document.getElementById('replay');
let moreMusic= document.querySelector('#more-music');
let songList=document.querySelector('.songList');
let close=document.querySelector('#close');
let total_duration =document.getElementById('duration');
let current_time =document.getElementById('current_time');
let next = document.getElementById('next');
let songs = [{
    songName: "Avicii-Night",
    artist:"Avicii",
    filePath: "songs/1.mp3",
    coverPath: "covers/1.jpg"
  },
  {
    songName: "One Night in Dubai",
    artist:"Arash",
    filePath: "songs/2.mp3",
    coverPath: "covers/2.jpg"
  },
  {
    songName: "Dusk Till Dawn",
    artist:"Zyan Malik",
    filePath: "songs/3.mp3",
    coverPath: "covers/3.jpg"
  },
  {
    songName: "Old Town Road",
    artist:"Lil Nas X",
    filePath: "songs/4.mp3",
    coverPath: "covers/4.jpg"
  },
  {
    songName: "Panda",
    artist:"Desiigner",
    filePath: "songs/5.mp3",
    coverPath: "covers/5.jpg"
  },
  {
    songName: "Starboy",
    artist:"Thomas Bangalter",
    filePath: "songs/6.mp3",
    coverPath: "covers/6.jpg"
  },
  {
    songName: "детство",
    artist: "Rauf-Faik",
    filePath: "songs/7.mp3",
    coverPath: "covers/7.jpg"
  },
  {
    songName: "Rockstar",
    artist:"",
    filePath: "songs/8.mp3",
    coverPath: "covers/8.jpg"
  },
  {
    songName: "Rauf la la",
    artist:"Unknown",
    filePath: "songs/9.mp3",
    coverPath: "covers/9.jpg"
  },
  {
    songName: " True Love",
    artist:"Unknown",
    filePath: "songs/10.mp3",
    coverPath: "covers/10.jpg"
  },
];
/*progress = parseInt((audioElement.currentTime / audioElement.duration) * 100);
myProgressBar.value = progress; */
/*timeupdate*/
audioElement.addEventListener('timeupdate', (event) => {
     const{currentTime ,duration}= event.srcElement;
     let progress_time=(currentTime/duration)*100;
     myProgressBar.value=progress_time;
     /*music duration update */
     let min_duration = Math.floor(duration/60);
     let sec_duration = Math.floor(duration%60);
     if(sec_duration<10){
      sec_duration=`0${sec_duration}`;
     }
     let tot_duration = `${min_duration}:${sec_duration}`;
     if(duration){
       total_duration.textContent =`${tot_duration}`;
     }

     /*current duration update*/
     let min_currentTime = Math.floor(currentTime/60);
     let sec_currentTime= Math.floor(currentTime%60);
     if(sec_currentTime<10){
      sec_currentTime =`0${sec_currentTime}`;
     }
     let tot_currentTime = `${min_currentTime}:${sec_currentTime}`;
     current_time.textContent =`${tot_currentTime}`;
});


myProgressBar.addEventListener('change', () => {
  audioElement.currentTime = myProgressBar.value * audioElement.duration / 100;
});
/*setting song name and covers for each songItem -uing Array*/
/* Here we have set (each element) index of songItem as 0 */
songItems.forEach((element, i) => {
  element.getElementsByTagName("img")[0].src = songs[i].coverPath;
  element.getElementsByClassName("songName")[0].innerText = songs[i].songName;
});

/* clicking on play button inside container */
const makeAllPlays = () => {
  songItemPlay.forEach((element) => {
    element.classList.add('fa-play');
    element.classList.remove('fa-pause');
  });
};


songItemPlay.forEach((element) => {
  element.addEventListener('click', (e) => {
    if (audioElement.paused || audioElement.currentTime <= 0) {
      makeAllPlays();     //convert all elements buttons to play
      songIndex = parseInt(e.target.id);
      e.target.classList.remove('fa-play');
      e.target.classList.add('fa-pause');
      audioElement.src = `songs/${songIndex+1}.mp3`;
      masterSongName.innerText = songs[songIndex].songName;
      songImage.src=`covers/${songIndex+1}.jpg`;
      audioElement.currentTime = 0;
      audioElement.play();
      songImage.classList.add('anime');
      artist.innerText = songs[songIndex].artist;
      masterPlay.classList.remove('fa-play'); //music play
      masterPlay.classList.add('fa-pause');
    }
    else { //if song is playing - Pause it
      audioElement.pause();
      songImage.classList.remove('anime');
      songIndex = parseInt(e.target.id);
      e.target.classList.remove('fa-pause');
      e.target.classList.add('fa-play');
      masterPlay.classList.remove('fa-pause');
      masterPlay.classList.add('fa-play');
    }
  });
});
/*--makeAllPlays */
makeAllChangePlays=()=>{
  songItemPlay[songIndex].classList.add('fa-play');
  songItemPlay[songIndex].classList.remove('fa-pause');
};

/*next --*/
  document.getElementById('next').addEventListener('click', () => {
  if (songIndex >= 9) {
    songIndex = 0;
  } else {
    songIndex += 1;
  }
  if (audioElement.paused || audioElement.currentTime <= 0) {
  makeAllChangePlays();
  audioElement.src = `songs/${songIndex+1}.mp3`;
  masterSongName.innerText = songs[songIndex].songName;
  artist.innerText = songs[songIndex].artist;
  songImage.src=`covers/${songIndex+1}.jpg`;
  songImage.classList.add('anime');
  audioElement.currentTime = 0;
  audioElement.play();
  masterPlay.classList.remove('fa-play');
  masterPlay.classList.add('fa-pause');
  songItemPlay[songIndex].classList.remove('fa-play');
  songItemPlay[songIndex].classList.add('fa-pause');
}
else
{
  makeAllPlays();
  songImage.classList.remove('anime');
  songItemPlay[songIndex].classList.remove('fa-play');
  songItemPlay[songIndex].classList.add('fa-pause');
  audioElement.src = `songs/${songIndex+1}.mp3`;
  masterSongName.innerText = songs[songIndex].songName;
  artist.innerText = songs[songIndex].artist;
  songImage.src=`covers/${songIndex+1}.jpg`;
  songImage.classList.add('anime');
  audioElement.currentTime = 0;
  audioElement.play();
}
});
/*previous --*/
document.getElementById('previous').addEventListener('click', () => {
  if (songIndex <= 0) {
    songIndex = 0;
  } else {
    songIndex -= 1;
  }
  if (audioElement.paused || audioElement.currentTime <= 0) {
  makeAllChangePlays();
  audioElement.src = `songs/${songIndex+1}.mp3`;
  masterSongName.innerText = songs[songIndex].songName;
  artist.innerText = songs[songIndex].artist;
  songImage.src=`covers/${songIndex+1}.jpg`;
  songImage.classList.add('anime');
  audioElement.currentTime = 0;
  audioElement.play();
  masterPlay.classList.remove('fa-play');
  masterPlay.classList.add('fa-pause');
  songItemPlay[songIndex].classList.remove('fa-play');
  songItemPlay[songIndex].classList.add('fa-pause');
}
else
{
  makeAllPlays();
  songImage.classList.remove('anime');
  songItemPlay[songIndex].classList.remove('fa-play');
  songItemPlay[songIndex].classList.add('fa-pause');
  audioElement.src = `songs/${songIndex+1}.mp3`;
  masterSongName.innerText = songs[songIndex].songName;
  artist.innerText = songs[songIndex].artist;
  songImage.src=`covers/${songIndex+1}.jpg`;
  songImage.classList.add('anime');
  audioElement.currentTime = 0;
  audioElement.play();
}
});

/* play - pause control */
masterPlay.addEventListener('click', () => {
  if (audioElement.paused || audioElement.currentTime <= 0) {
    audioElement.play();
    songImage.classList.add('anime');
    masterPlay.classList.remove('fa-play');
    masterPlay.classList.add('fa-pause');
    masterSongName.innerText = songs[songIndex].songName;
    artist.innerText = songs[songIndex].artist;
    songImage.src=`covers/${songIndex+1}.jpg`;
    songItemPlay[songIndex].classList.remove('fa-play');
    songItemPlay[songIndex].classList.add('fa-pause');
  }
  else {
    audioElement.pause();
    songImage.classList.remove('anime');
    masterPlay.classList.remove('fa-pause');
    masterPlay.classList.add('fa-play');
    masterSongName.innerText = songs[songIndex].songName;
    artist.innerText = songs[songIndex].artist;
    songImage.src=`covers/${songIndex+1}.jpg`;
    songItemPlay[songIndex].classList.remove('fa-pause');
    songItemPlay[songIndex].classList.add('fa-play');
  }
});
moreMusic.addEventListener('click',()=>{
  songList.classList.add('show');
});

close.addEventListener('click',()=>{
  songList.classList.remove('show');
});

audioElement.addEventListener("ended", ()=>{
  audioElement.pause();
  songImage.classList.remove('anime');
  masterPlay.classList.add('fa-play');
  makeAllPlays();
});
replay.addEventListener('click',()=>{
  audioElement.currentTime=0;
});
