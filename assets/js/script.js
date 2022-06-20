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

// Selector for top songs list
const topSongListEl = $(".top-song-list");

// Function to render top songs
const renderTopSongs = (arr) => {
    let counter = 0;
    topSongListEl.text("");
    arr.forEach(song => {
        topSongListEl.append(`<li class='song${counter}' data-track='${trackIds[counter]}'>${song}</li>`);
        counter ++;
    });
};

// Event Listener for click on top song. So far it opens the iFrame for the song sample. 
// TODO: show lyrics
topSongListEl.on("click", "li", function (event) {
    $("#music-player").attr("src", `https://open.spotify.com/embed/track/${event.target.getAttribute("data-track")}`);
    console.log(event.target.getAttribute("data-track"))
})