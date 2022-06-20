/* 
1. Set Variables
2. Generate Token
3. Use search input to find artist's ID
4. If no artist found open modal stating "try again" add close button to modal 
5. Save search to local Storage
6. Get Search history from local storage 
7. Add search history to list element
8. Use artist's ID to return Top Tracks
9. Add top tracks to list element
10. Generate Lyrics when top track selected
11. Start Audio player when top track selected
12. Open Modal with Lyrics when Copy Lyrics Selected
13. Copy Lyrics to clipboard when copy button cicked in open Modal
14. Close modal when "X" or close button clicked
15. Clear Search History 
*/

// 1. *************************************************
const clientId = '0a772d470d6b4bc295787c115dc84e0e';
const clientSecret = '51705cf2746340e3b66493d943e6eb05';
const clientValid = (btoa(clientId + ':' + clientSecret))
let tokenURL = 'https://accounts.spotify.com/api/token';
// Selector for search button
const searchButtonEl = $(".search-button"); 
let searchHistory = [];

// 2. ****************************************************************
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
console.log(token);

setInterval(getToken, 3600000);

searchButtonEl.on("click", function() {
    const searchText = $(".search-bar").val();

    console.log(searchText);
    getArtistID(searchText);
    // renderTopSongs(trackNames);
});

// 3.a) ****************************************************
const getArtistID = async () => {
    const artistURL = 'https://api.spotify.com/v1/search?q=' + 'queen' + '&type=artist&limit=1';
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
    let artistId = data.artists.items[0].id
    console.log(artistId);
    sessionStorage.setItem("artistId", artistId);

    // 8.b) Call getTopTracks within Atist ID func to have access to artistId ****
    getTopTracks ();
};


 // 8.a) function to get Top Tracks *********************************
 const getTopTracks = async () => {
    let artistId = sessionStorage.getItem("artistId");
    let songsURL = 'https://api.spotify.com/v1/artists/' + artistId + '/top-tracks?market=CA';
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

    renderTopSongs(trackNames, trackIds);
    console.log(trackNames)
};

// 3.b) Call Artist Id func ************************************
getArtistID ();

// 4. ********************************************************
// No Artist found open Modal!!


// 5. *********************************************************


// Function to save search history
const saveSearchHistory = () => {
    const searchValue = $(".search-bar").val().trim().toUpperCase()
    if (!searchHistory.includes(searchValue)) {
        searchHistory.push(searchValue);
        localStorage.setItem("search-history", JSON.stringify(searchHistory));
    }
};

// 6. ************************************************************
// Function to get search history from local storage.
const getSearchHistory = () => {
    if (localStorage.getItem("search-history")) {
        searchHistory = JSON.parse(localStorage.getItem("search-history"));
    }
};
 // 7. ******************************************************************
// Function to render search history
const renderSearchHistory = () => {
    const searchHistoryEl = $("#search-history").children(".menu-list");
    searchHistoryEl.empty();
    
    searchHistory.forEach(item => {
        searchHistoryEl.append(`<li><a>${item}</a></li>`)
    })
};

// Replaced Code with more effecient Arrays******************************************
//let trackNames = JSON.parse(sessionStorage.getItem("trackNames"));
//let trackIds = JSON.parse(sessionStorage.getItem("trackIds"));
//console.log(trackIds);
//document.getElementById('song0').innerHTML = trackNames[0];
//document.getElementById('song0').href = "https://open.spotify.com/embed/track/" + trackIds[0];
/*const playSong0 = document.querySelector("#song0");
    playSong0.addEventListener('click', (e) => {
        document.getElementById('music-player').src = "https://open.spotify.com/embed/track/" + trackIds[0] + "?utm_source=generator"
}); */

// 9. Add top tracks to list *****************************************************
// Selector for top songs list
const topSongListEl = $(".top-song-list");

const renderTopSongs = (arr, trackNames) => {
    let counter = 0;
    topSongListEl.text("");
    arr.forEach(song => {
        topSongListEl.append(`<li class='song${counter}' data-track='${trackNames[counter]}'>${song}</li>`);
        counter ++;
    });
};

// 11. Top Song Player ********************************************************
topSongListEl.on("click", "li", function (event) {
    $("#music-player").attr("src", `https://open.spotify.com/embed/track/${event.target.getAttribute("data-track")}`);
})

// 15. ************************************************************************
// Function to clear search history
const clearSearchHistory = () => {
    searchHistory = [];
    localStorage.removeItem("search-history");
};

