var selectedTrack = document.getElementById("track-list");
var lyricsContainer = document.getElementById("lyrics");
var artistEl = document.getElementById("artist-list");

// Get Lyrics Lyrics.ovh API 
const songID = async (event) => {

    let track = event.target.textContent.trim();
    let isFeatTrack = track.indexOf('(') !== -1 ? track.split('(')[0].trim() : track;
    let artist = artistEl.firstElementChild.textContent;

    // calling API
    try {
        await fetch(`https://api.lyrics.ovh/v1/${artist}/${isFeatTrack}`, {
            method: "GET",
            mode: 'cors',
            headers: {}
        })
            .then(response => {
                return isResponseOK(response)
            })
            .then(data => {
                let result = isEmptyOrNull(data);

                // Setting the value to Lyrics Container
                lyricsContainer.querySelector("p").innerText = "";
                lyricsContainer.querySelector("p").innerText = result.lyrics;
            })

    } catch (error) {
        console.error(error.message);
    }
};

// Response Validation
var isResponseOK = (response) => {
    if (!response.ok)
        throw Error('No Lyrics Found !');
    else
        return response.json();
}

// Data Validation
var isEmptyOrNull = (data) => {
    if (data === null || data === '')
        throw Error("No Records Found !!");
    else
        return data;
}

// Event will trigger on selecting the track
selectedTrack.addEventListener("click", songID);