const APIController = (function() {

    const clientId = '0a772d470d6b4bc295787c115dc84e0e';
    const clientSecret = '51705cf2746340e3b66493d943e6eb05';

    const _getToken = async () => {

        const result = await fetch('https://accounts.spotify.com/api/token', {
            method: 'POST',
            headers: {
                'Content-Type' : 'application/x-www-form-urlencoded',
                'Authorization' : 'Basic' + btoa(clientId + ':' + clientSecret)
            },
            body: 'grant_type=client_cedentials'
        });

        const data = await result.json();
        return data.access_token;
    }

    const _getTrack = async (token, tracksEndPoint) => {

        const limit = 10;
    
        const result = await fetch('$(tracksEndPoint)?limit-$(limit)', {
            method: 'GET',
            headers: {'Authorization' : 'Bearer' + token},
        });

        const data = await result.json();
        return data.items;
    }

    return {
        getToken() {
            return _getToken
        }
    }
});
