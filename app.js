const searchSongs = () => {
    const searchText = document.getElementById('search-field').value;
    const url = `https://api.lyrics.ovh/suggest/:searchText`;
    fetch(`https://api.lyrics.ovh/suggest/:${searchText}`)
        .then(res => res.json())
        .then(data => displaySong(data.data));
}
const displaySong = song => {
    const songContainer = document.getElementById('song-container');
    document.getElementById('songContainer').innerHTML = "";
    song.forEach(element => {
        const songDiv = document.createElement('div');
        songDiv.className = 'single-result row align-items-center my-3 p-3';
        songDiv.innerHTML = `
        <div class="col-md-9">
             <h3 class="lyrics-name">${element.title}</h3>
             <p class="author lead">Album by <span>${element.artist.name}</span></p>
             <audio controls>
                    <source src="${element.preview}" type="audio/ogg">
             </audio>
        </div>
        <div class="col-md-3 text-md-right text-center">
             <button onclick="getLyrics('${element.artist.name}','${element.title}')" class="btn btn-success">Get Lyrics</button>
         </div>
        `
        songContainer.appendChild(songDiv);


    });

}
const getLyrics = (artist, title) => {
    const url = `https://api.lyrics.ovh/v1/${artist}/${title} `;
    fetch(url)
        .then(res => res.json())
        .then(data => displayLyrics(data.lyrics))

}
const displayLyrics = lyrics => {
    const lyricDiv = document.getElementById('lyrics');
    lyricDiv.innerText = lyrics;
}