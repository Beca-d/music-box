const clientId = '0a772d470d6b4bc295787c115dc84e0e';
const clientSecret = '51705cf2746340e3b66493d943e6eb05';

const clientValid = (btoa(clientId + ':' + clientSecret))
let tokenURL = 'https://accounts.spotify.com/api/token';
let artistURL = 'https://api.spotify.com/v1/search?q=' + 'Daft+Punk' + '&type=artist&limit=1';
//need to add variable to artistURL to bring in search function 

//Must get token api call to run first - otherwise errors occur!!!!
const getToken = async () => {
    const response = await fetch(tokenURL, {
        method: 'POST',
        headers: {
            'Content-Type' : 'application/x-www-form-urlencoded',
            'Authorization' : 'Basic ' + clientValid
        },
        body: 'grant_type=client_credentials'
    })
    const data = await response.json();
    const { access_token } = data;
    sessionStorage.setItem("token", access_token);
};

getToken();

let token = sessionStorage.getItem("token");

const getArtistID = async () => {
    const response = await fetch(artistURL, {
        method: 'GET',
        headers: {
            'Accept' : 'application/json',
            'Content-Type' : 'aplication/json',
            'Authorization' : 'Bearer ' + token
        }
    })
    const data = await response.json();
    //console.log(data.artists.items[0].id);
    sessionStorage.setItem("artistId", data.artists.items[0].id)
};

getArtistID ();

let artistId = sessionStorage.getItem("artistId");
let songsURL = 'https://api.spotify.com/v1/artists/' + artistId + '/top-tracks?market=CA';

const getTopTracks = async () => {
    const response = await fetch(songsURL, {
        method: 'GET',
        headers: {
            'Accept' : 'application/json',
            'Content-Type' : 'aplication/json',
            'Authorization' : 'Bearer ' + token
        }
    })
    const data = await response.json();
    const { tracks } = data;
    var trackNames = [tracks[0].name, tracks[1].name, tracks[2].name, tracks[3].name, tracks[4].name, tracks[5].name, tracks[6].name, tracks[7].name, tracks[8].name, tracks[9].name];
    var trackIds = [tracks[0].id, tracks[1].id, tracks[2].id, tracks[3].id, tracks[4].id, tracks[5].id, tracks[6].id, tracks[7].id, tracks[8].id, tracks[9].id];
    sessionStorage.setItem("trackNames", JSON.stringify(trackNames));
    sessionStorage.setItem("trackIds", JSON.stringify(trackIds));
    //set top songs to element with url link to another api call for lyrics/audio demo
};

getTopTracks ();
let trackNames = JSON.parse(sessionStorage.getItem("trackNames"));
let trackIds = JSON.parse(sessionStorage.getItem("trackIds"));
//console.log(trackIds);

document.getElementById('song0').innerHTML = trackNames[0];
document.getElementById('song1').innerHTML = trackNames[1];
document.getElementById('song2').innerHTML = trackNames[2];
document.getElementById('song3').innerHTML = trackNames[3];
document.getElementById('song4').innerHTML = trackNames[4];
document.getElementById('song5').innerHTML = trackNames[5];
document.getElementById('song6').innerHTML = trackNames[6];
document.getElementById('song7').innerHTML = trackNames[7];
document.getElementById('song8').innerHTML = trackNames[8];
document.getElementById('song9').innerHTML = trackNames[9];

//document.getElementById('song0').href = "https://open.spotify.com/embed/track/" + trackIds[0];
document.getElementById('song1').href = "https://open.spotify.com/embed/track/" + trackIds[1];
document.getElementById('song2').href = "https://open.spotify.com/embed/track/" + trackIds[2];
document.getElementById('song3').href = "https://open.spotify.com/embed/track/" + trackIds[3];
document.getElementById('song4').href = "https://open.spotify.com/embed/track/" + trackIds[4];
document.getElementById('song5').href = "https://open.spotify.com/embed/track/" + trackIds[5];
document.getElementById('song6').href = "https://open.spotify.com/embed/track/" + trackIds[6];
document.getElementById('song7').href = "https://open.spotify.com/embed/track/" + trackIds[7];
document.getElementById('song8').href = "https://open.spotify.com/embed/track/" + trackIds[8];
document.getElementById('song9').href = "https://open.spotify.com/embed/track/" + trackIds[9];

const playSong0 = document.querySelector("#song0");
    playSong0.addEventListener('click', (e) => {
        document.getElementById('music-player').src = "https://open.spotify.com/embed/track/" + trackIds[0] + "?utm_source=generator"
});

const playSong1 = document.querySelector("#song1");
    playSong0.addEventListener('click', (e) => {
        document.getElementById('music-player').src = "https://open.spotify.com/embed/track/" + trackIds[1] + "?utm_source=generator"
});

const playSong2 = document.querySelector("#song2");
    playSong0.addEventListener('click', (e) => {
        document.getElementById('music-player').src = "https://open.spotify.com/embed/track/" + trackIds[2] + "?utm_source=generator"
});

const playSong3 = document.querySelector("#song3");
    playSong0.addEventListener('click', (e) => {
        document.getElementById('music-player').src = "https://open.spotify.com/embed/track/" + trackIds[3] + "?utm_source=generator"
});

const playSong4 = document.querySelector("#song4");
    playSong0.addEventListener('click', (e) => {
        document.getElementById('music-player').src = "https://open.spotify.com/embed/track/" + trackIds[4] + "?utm_source=generator"
});

const playSong5 = document.querySelector("#song5");
    playSong0.addEventListener('click', (e) => {
        document.getElementById('music-player').src = "https://open.spotify.com/embed/track/" + trackIds[5] + "?utm_source=generator"
});

const playSong6 = document.querySelector("#song6");
    playSong0.addEventListener('click', (e) => {
        document.getElementById('music-player').src = "https://open.spotify.com/embed/track/" + trackIds[6] + "?utm_source=generator"
});

const playSong7 = document.querySelector("#song7");
    playSong0.addEventListener('click', (e) => {
        document.getElementById('music-player').src = "https://open.spotify.com/embed/track/" + trackIds[7] + "?utm_source=generator"
});

const playSong8 = document.querySelector("#song8");
    playSong0.addEventListener('click', (e) => {
        document.getElementById('music-player').src = "https://open.spotify.com/embed/track/" + trackIds[8] + "?utm_source=generator"
});

const playSong9 = document.querySelector("#song9");
    playSong0.addEventListener('click', (e) => {
        document.getElementById('music-player').src = "https://open.spotify.com/embed/track/" + trackIds[9] + "?utm_source=generator"
});

// Jaryd's work **
let searchHistory = [];

// Function to get search history from local storage.
const getSearchHistory = () => {
    if (localStorage.getItem("search-history")) {
        searchHistory = JSON.parse(localStorage.getItem("search-history"));
    }
};

// Function to save search history
const saveSearchHistory = () => {
    const searchValue = $(".search-bar").val().trim().toUpperCase()
    if (!searchHistory.includes(searchValue)) {
        searchHistory.push(searchValue);
        localStorage.setItem("search-history", JSON.stringify(searchHistory));
    }
};

// Function to clear search history
const clearSearchHistory = () => {
    searchHistory = [];
    localStorage.removeItem("search-history");
};

// Function to render search history
const renderSearchHistory = () => {
    const searchHistoryEl = $("#search-history").children(".menu-list");
    searchHistoryEl.empty();
    
    searchHistory.forEach(item => {
        searchHistoryEl.append(`<li><a>${item}</a></li>`)
    })
};
