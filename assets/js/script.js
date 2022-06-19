const clientId = '0a772d470d6b4bc295787c115dc84e0e';
const clientSecret = '51705cf2746340e3b66493d943e6eb05';

const clientValid = (btoa(clientId + ':' + clientSecret))
let tokenURL = 'https://accounts.spotify.com/api/token';
let artistURL = 'https://api.spotify.com/v1/search?q=Daft+Punk&type=artist&limit=1';



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
   // console.log(data.artists.items[0].id);
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
    console.log(data);
    //sessionStorage.setItem("", )
};

getTopTracks ();

//let topTracks = sessionStorage.getItem("");

    /*.then(res => {
    return res.json()
})
.then(data => console.log(data))
.catch(error => console.log('ERROR'))
let result = JSON.parse(data);

console.log(data.access_token);


console.log(data)

 const data = result.json();
return data.acces_token;  

    
console.log(result)*/