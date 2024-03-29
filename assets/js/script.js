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
const clientId = "e2b5358081e4411ba962baa3360d6d2b";
const clientSecret = "0b90308f80b44e5da3910d3b33279b8e";
const clientValid = btoa(clientId + ":" + clientSecret);
let tokenURL = "https://accounts.spotify.com/api/token";
// Selector for search button
const searchButtonEl = $(".search-button");
const clearHistoryButtonEl = $(".clear-history");
const searchHistoryListEl = $("#search-history");

//Array to hold search history pulled from local storage and to update search history before saving to local storage
let searchHistory = [];
let searchText = "";

// 2. ****************************************************************
//Must get token api call to run first - otherwise errors occur!!!!
const getToken = async (searchValueFromHistory) => {
	const response = await fetch(tokenURL, {
		method: "POST",
		headers: {
			"Content-Type": "application/x-www-form-urlencoded",
			Authorization: "Basic " + clientValid,
		},
		body: "grant_type=client_credentials",
	});
	const data = await response.json();
	const { access_token } = data;
	// sessionStorage.setItem("token", access_token);
	let input = searchValueFromHistory ? searchValueFromHistory : searchText;
	getArtistID(input, access_token);
};

searchButtonEl.on("click", function () {
	// Re-setting the value of the search bar
	searchText = $(".search-bar").val().trim();
	$(".search-bar").val("");
	$(".search-bar").attr("placeholder", "Artist name");

	// Only trigger if the value is not blank
	if (searchText != "") {
		getToken();
	}
});

// 3.a) ****************************************************
const getArtistID = async (artist, token) => {
	const artistURL = `https://api.spotify.com/v1/search?q=${artist}&type=artist&limit=1`;
	const response = await fetch(artistURL, {
		method: "GET",
		headers: {
			Accept: "application/json",
			"Content-Type": "aplication/json",
			Authorization: "Bearer " + token,
		},
	});
	const data = await response.json();

	const artistId = data.artists.items[0].id;

	// 8.b) Call getTopTracks within Atist ID func to have access to artistId ****
	getTopTracks(artistId, token);

	const artistName = document.getElementById("artist-name");
	artistName.innerText = artist.toUpperCase();
};

// Function to get top tracks
const getTopTracks = async (artistId, token) => {
	let songsURL =
		"https://api.spotify.com/v1/artists/" + artistId + "/top-tracks?market=CA";
	const response = await fetch(songsURL, {
		method: "GET",
		headers: {
			Accept: "application/json",
			"Content-Type": "aplication/json",
			Authorization: "Bearer " + token,
		},
	});
	const data = await response.json();
	const { tracks } = data;
	var trackNames = [
		tracks[0].name,
		tracks[1].name,
		tracks[2].name,
		tracks[3].name,
		tracks[4].name,
		tracks[5].name,
		tracks[6].name,
		tracks[7].name,
		tracks[8].name,
		tracks[9].name,
	];
	var trackIds = [
		tracks[0].id,
		tracks[1].id,
		tracks[2].id,
		tracks[3].id,
		tracks[4].id,
		tracks[5].id,
		tracks[6].id,
		tracks[7].id,
		tracks[8].id,
		tracks[9].id,
	];

	//set top songs to element with url link to another api call for lyrics/audio demo

	renderTopSongs(trackNames, trackIds);
	saveSearchHistory();
	renderSearchHistory();
};

// 4. ********************************************************
// No Artist found open Modal!!

// 5. *********************************************************

// Function to save search history
const saveSearchHistory = () => {
	// const searchValue = $(".search-bar").val().trim().toUpperCase()
	if (searchText != "" && !searchHistory.includes(searchText.toUpperCase())) {
		searchHistory.push(searchText.toUpperCase());
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

	searchHistory.forEach((item) => {
		if (item != "") {
			searchHistoryEl.prepend(
				`<li><a class='search-history-item'>${item}</a></li>`
			);
		}
	});
};

// 9. Add top tracks to list *****************************************************
// Selector for top songs list
const topSongListEl = $(".top-song-list");

const renderTopSongs = (arr, trackIds) => {
	let counter = 0;
	topSongListEl.text("");
	arr.forEach((song) => {
		topSongListEl.append(
			`<li class='song${counter}' data-track='${trackIds[counter]}'>${song}</li>`
		);
		counter++;
	});
};

// 11. Top Song Player ********************************************************
// Event Listener for click on top song. So far it opens the iFrame for the song sample.
topSongListEl.on("click", "li", function (event) {
	//const spanSong = document.getElementById("span-title");
	//spanSong.innerText = "Song";

	$("#placeholder").remove();

	$("#music-player").attr(
		"src",
		`https://open.spotify.com/embed/track/${event.target.getAttribute(
			"data-track"
		)}`
	);
	$("#full-song-url").attr(
		"href",
		`https://open.spotify.com/embed/track/${event.target.getAttribute(
			"data-track"
		)}`
	);
});

// Event listener for clicks on the clear history button
clearHistoryButtonEl.on("click", function (event) {
	clearSearchHistory();
	renderSearchHistory();
});

// Event listener for clicks on search history item to bring up results of search again
searchHistoryListEl.on("click", "li", function (event) {
	const searchText = $(event.target).text();
	let index = searchHistory.indexOf(searchText);

	// Switching Tabs in Search History
	if (searchHistory.length > 0 && index > -1) {
		searchHistory.splice(index, 1);
		searchHistory.push(searchText);
		localStorage.setItem("search-history", JSON.stringify(searchHistory));
	}
	getToken(searchText);
});

// 15. ************************************************************************
// Function to clear search history
const clearSearchHistory = () => {
	searchHistory = [];
	$(topSongListEl).empty();
	localStorage.removeItem("search-history");

	// Reset all the container
	lyricsContainer.querySelector("div").innerText =
		"Click on a song to display Lyrics!";
	$("#music-player").attr("src", "");
	$("#music-player").empty();
	$(".music-player-container").find("img").remove();
	$("#music-player").before(
		`<img src="./assets/images/musicplayer.jpg" id="placeholder" alt="Music Player Placeholder" />`
	);
};

// On Load Function
const init = (() => {
	getSearchHistory();
	renderSearchHistory();

	// Loading the Top Songs on page re-load
	if (searchHistory.length > 0) {
		searchHistoryListEl.find("li").eq(0).trigger("click");
	}
})();
