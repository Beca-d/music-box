const clientId = '0a772d470d6b4bc295787c115dc84e0e';
const clientSecret = '51705cf2746340e3b66493d943e6eb05';

const clientValid = (btoa(clientId + ':' + clientSecret))
console.log(clientValid)

fetch('https://accounts.spotify.com/api/token', {
    method: 'POST',
    headers: {
        'Content-Type' : 'application/x-www-form-urlencoded',
        'Authorization' : 'Basic ' + clientValid
    },
    body: 'grant_type=client_credentials'
})
    .then(res => {
        return res.json()
    })
    .then(data => console.log(data))
    .catch(error => console.log('ERROR'))