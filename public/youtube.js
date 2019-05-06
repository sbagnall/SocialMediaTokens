const YouTube = (() => {

    const youtubeAuthUri = "https://accounts.google.com/o/oauth2/v2/auth",
        youtubeTokenUri = "https://www.googleapis.com/oauth2/v4/token",
        youtubeRedirect = '/ytredirect',
        youtubeScope = 'https://www.googleapis.com/auth/youtube.upload';
    
    const init = ({ localServer, creds }) => {
        return {
            getCode: () => {
                const redirectUrl = `${localServer}${youtubeRedirect}`;
                const url = `${youtubeAuthUri}?redirect_uri=${redirectUrl}&prompt=consent&response_type=code&client_id=${creds.client_id}&scope=${youtubeScope}&access_type=offline`;
                window.location = url;
            },

            getTokens: async () => {
                const response = await fetch(`${youtubeTokenUri}`, {
                    method: 'POST',
                    body: `{
                        "code": "${code}",
                        "redirect_uri": "${localServer}${youtubeRedirect}",
                        "client_id": "${creds.client_id}",
                        "client_secret": "${creds.client_secret}",
                        "grant_type": "authorization_code"
                    }`
                });
                const json = await response.json();
            
                document.getElementById('btnGetTokens').setAttribute('disabled', 'disabled');
                document.getElementById('tokens').textContent = JSON.stringify(json, null, 3);
            }
        };
    };

    return {
        init: init
    }
})();
