const Facebook = (() => {
    
    const authUri = "https://www.facebook.com/v3.3/dialog/oauth",
        tokenUri = "https://graph.facebook.com/v3.3/oauth/access_token",
        redirect = '/fbredirect',
        scope = 'ads_management';

    let token;

    const init = ({ localServer, creds }) => {
        return {
            getCode: () => {
                const redirectUrl = `${localServer}${redirect}`;
                const url = `${authUri}?client_id=${creds.app_id}&redirect_uri=${redirectUrl}&scope=${scope}`;
                window.location = url;
            },
            getToken: async (code) => {
                const redirectUrl = `${localServer}${redirect}`
                const response = await fetch(`${tokenUri}?client_id=${creds.app_id}&redirect_uri=${redirectUrl}&client_secret=${creds.app_secret}&code=${code}`);
                const json = await response.json();
                token = json.access_token;
                return json;
            },
            exchangeToken: async () => {
                const response = await fetch(`${tokenUri}?client_id=${creds.app_id}&client_secret=${creds.app_secret}&grant_type=fb_exchange_token&fb_exchange_token=${token}`)
                return await response.json();
            }
        };
    };

    return {
        init: init
    };
    
})();

