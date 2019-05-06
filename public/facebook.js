const Facebook = (() => {
    
    const facebookAuthUri = "https://www.facebook.com/v3.3/dialog/oauth",
        facebookTokenUri = "https://graph.facebook.com/v3.3/oauth/access_token",
        facebookRedirect = '/fbredirect',
        facebookScope = 'ads_management';

    let facebookToken;

    const init = ({ localServer, creds }) => {
        return {
            getCode: () => {
                const redirectUrl = `${localServer}${facebookRedirect}`;
                const url = `${facebookAuthUri}?client_id=${creds.app_id}&redirect_uri=${redirectUrl}&scope=${facebookScope}`;
                window.location = url;
            },
            getToken: async () => {
                const redirectUrl = `${localServer}${facebookRedirect}`
                const response = await fetch(`${facebookTokenUri}?client_id=${creds.app_id}&redirect_uri=${redirectUrl}&client_secret=${creds.app_secret}&code=${facebookCode}`);
                const json = await response.json();
                facebookToken = json.access_token;
            
                document.getElementById('btnGetFacebookToken').setAttribute('disabled', 'disabled');
                document.getElementById('facebookToken').textContent = JSON.stringify(json, null, 3);
            },
            exchangeToken: async () => {
                const response = await fetch(`${facebookTokenUri}?client_id=${creds.app_id}&client_secret=${creds.app_secret}&grant_type=fb_exchange_token&fb_exchange_token=${facebookToken}`)
                const json = await response.json();
                document.getElementById('facebookLongToken').textContent = JSON.stringify(json, null, 3);
            }
        };
    };

    return {
        init: init
    };
    
})();

