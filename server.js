var express = require("express");
var app = express();
require('dotenv').config();

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use('/oauthCreds.json', (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.end(JSON.stringify({
    "client_id": process.env.CLIENT_ID,
    "auth_uri": "https://accounts.google.com/o/oauth2/v2/auth",
    "token_uri": "https://www.googleapis.com/oauth2/v4/token",
    "client_secret": process.env.CLIENT_SECRET,
    "app_id": process.env.APP_ID,
    "facebook_auth_uri": "https://www.facebook.com/v3.3/dialog/oauth",
    "facebook_token_uri": "https://graph.facebook.com/v3.3/oauth/access_token",
    "app_secret": process.env.APP_SECRET
  }));
});

app.use('/redirect', (req, res) => {
  res.redirect(`/?type=youtube&code=${req.query.code}&scope=${req.query.scope}`);
});

app.use('/fbredirect', (req, res) => {
  res.redirect(`/?type=facebook&code=${req.query.code}`);
});

app.use('/', (req, res) => {
  res.sendFile('index.html', { root: __dirname });
});

app.listen(5000, () => console.log('Listening on port 5000'))