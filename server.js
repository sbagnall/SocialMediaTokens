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
    "client_secret": process.env.CLIENT_SECRET
  }));
});

app.use('/', (req, res) => {
  res.sendFile('index.html', { root: __dirname });
})

app.use('/redirect', (req, res) => {
  console.info(req.query.code); // 4/QQEwK22OHH41HqjA287aNfPlO7Xy2y1OqbQ3NDAfCxuR71776wTcP_QaSY-0iVnxLDX8ChRtXaG1KiPn7Gsu2bE
  console.info(req.query.scope); // https://www.googleapis.com/auth/youtube.upload
  res.redirect(`/?code=${req.query.code}&scope=${req.query.scope}`);
});

app.listen(5000, () => console.log('Listening on port 5000'))