var selectedTrack = document.getElementById("track-list");
var lyricsContainer = document.getElementById("lyrics");
var artistEl = document.getElementById("artist-list");
var lyricsModal = document.getElementById('song-lyrics-modal');

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
                lyricsModal.innerText = result.lyrics;
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

// Functions to control Lyrics Modal!
document.addEventListener('DOMContentLoaded', () => {
    // Functions to open and close a modal
    function openModal($el) {
      $el.classList.add('is-active');
    }
  
    function closeModal($el) {
      $el.classList.remove('is-active');
    }
  
    function closeAllModals() {
      (document.querySelectorAll('.modal') || []).forEach(($modal) => {
        closeModal($modal);
      });
    }
  
    // Add a click event on buttons to open a specific modal
    (document.querySelectorAll('.js-modal-trigger') || []).forEach(($trigger) => {
      const modal = $trigger.dataset.target;
      const $target = document.getElementById(modal);
  
      $trigger.addEventListener('click', () => {
        openModal($target);
      });
    });
  
    // Add a click event on various child elements to close the parent modal
    (document.querySelectorAll('.modal-background, .close-lyrics') || []).forEach(($close) => {
      const $target = $close.closest('.modal');
  
      $close.addEventListener('click', () => {
        closeModal($target);
      });
    });
  
    // Add a keyboard event to close all modals
    document.addEventListener('keydown', (event) => {
      const e = event || window.event;
  
      if (e.keyCode === 27) { // Escape key
        closeAllModals();
      }
    });
  });

// Add a click event to copy modal content to clipboard
document.querySelector(".copier").onclick = function () {
    const _this = this
    navigator.clipboard.writeText(document.getElementById('song-lyrics-modal').innerText)
    .then(function() {
        _this.innerText = 'Copied'

        setTimeout(function() {
            _this.innerHTML = '<i class="fas fa-copy"></i>' 
        }, 1000)
        })
}