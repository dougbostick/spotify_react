const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const SpotifyWebApi = require('spotify-web-api-node');
require('dotenv').config();


const app = express();
app.use(cors());
app.use(bodyParser.json());

app.post('/login', (req, res) => {
    const code = req.body.code;
    const spotifyApi = new SpotifyWebApi({
        redirectUri: 'http:localhost:3000',
        clientId: '8dd527a2b4d34860a82681dc4a206714',
        clientSecret: `${process.env.CLIENT_SECRET}`
    })

    spotifyApi
    .authorizationCodeGrant(code)
    .then(data => {
        res.json({
            accessToken: data.body.access_token,
            refreshToken: data.body.refresh_token,
            expiresIn: data.body.expires_in,
        })
    }).catch((err) => {
        console.lof(err)
        res.sendStatus(400)
    })
})
console.log('server running', process.env.CLIENT_SECRET)
app.listen(3001)