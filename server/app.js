let express = require('express');
let app = express();
let port = 3000;
let fs = require('fs');
let cors = require('cors');
let cookieParser = require('cookie-parser');
let request = require('request');
let bodyParser = require('body-parser');


app.use(cors());
app.use(cookieParser());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

let credentials = JSON.parse(fs.readFileSync("./credenciales.json", "utf-8"));

let client_id = credentials.client_id;
let client_secret = credentials.client_secret;
let redirect_uri = 'http://localhost:4200';

const BASE_URL = 'https://api.spotify.com/v1/';


let server = app.listen(port, function () {
    console.log('Server listening on port ' + server.address().port);
});

app.get('/', function(req, res) {
    res.send('Server working!');
});

app.get('/login/:code', function(req, res) {

    let code = req.params.code;

    let authOptions = {
        url: 'https://accounts.spotify.com/api/token',
        form: {
            code: code,
            redirect_uri: redirect_uri,
            grant_type: 'authorization_code'
        },
        headers: {
            'Authorization': 'Basic ' + (Buffer.from(client_id + ':' + client_secret).toString('base64'))
        },
        json: true
    };

    request.post(authOptions, function(error, response, body) {
        if (!error && response.statusCode === 200) {

            let access_token = body.access_token;
            let refresh_token = body.refresh_token;

            res.send({
                loggedin: true,
                access_token: access_token,
                refresh_token: refresh_token
            });

        } else {
            res.send({ loggedin: 'error' });
        }
    });

});

app.post('/userData', function(req, res) {

    let access_token = req.body.access_token;

    let options = {
        url: BASE_URL + 'me',
        headers: { 'Authorization': 'Bearer ' + access_token },  
        json: true
    };

    request.get(options, function(error, response, body) {
        if (!error && response.statusCode === 200) {
            res.send({ data: body })
        } else if (!error && response.statusCode === 401) {
            res.send({ data: 'token expired' })
        } else {
            res.send({ data: 'error' })
        }
    });

});

app.post('/top/songs/:range', function(req, res) {

    let access_token = req.body.access_token;

    let range = req.params.range;

    let options = {
        url: BASE_URL + 'me/top/tracks/?limit=10&time_range=' + range,
        headers: { 'Authorization': 'Bearer ' + access_token },  
        json: true
    };

    request.get(options, function(error, response, body) {
        if (!error && response.statusCode === 200) {
            res.send({ data: body })
        } else if (!error && response.statusCode === 401) {
            res.send({ data: 'token expired' })
        } else {
            res.send({ data: 'error' })
        }
    });

});

app.post('/top/artists/:range', function(req, res) {

    let access_token = req.body.access_token;

    let range = req.params.range;

    let options = {
        url: BASE_URL + 'me/top/artists/?limit=10&time_range=' + range,
        headers: { 'Authorization': 'Bearer ' + access_token },  
        json: true
    };

    request.get(options, function(error, response, body) {
        if (!error && response.statusCode === 200) {
            res.send({ data: body })
        } else if (!error && response.statusCode === 401) {
            res.send({ data: 'token expired' })
        } else {
            res.send({ data: 'error' })
        }
    });

});

app.post('/playlist/getAll', function(req, res) {

    let access_token = req.body.access_token;

    let options = {
        url: BASE_URL + 'me/playlists',
        headers: { 'Authorization': 'Bearer ' + access_token },  
        json: true
    };

    request.get(options, function(error, response, body) {
        if (!error && response.statusCode === 200) {
            res.send({ data: body })
        } else if (!error && response.statusCode === 401) {
            res.send({ data: 'token expired' })
        } else {
            res.send({ data: 'error' })
        }
    });

});

app.post('/playlist/get/:id', function(req, res) {

    let access_token = req.body.access_token;

    let id = req.params.id;

    let options = {
        url: BASE_URL + 'playlists/' + id + '/tracks',
        headers: { 'Authorization': 'Bearer ' + access_token },  
        json: true
    };

    request.get(options, function(error, response, body) {
        if (!error && response.statusCode === 200) {
            res.send({ data: body })
        } else if (!error && response.statusCode === 401) {
            res.send({ data: 'token expired' })
        } else {
            res.send({ data: 'error' })
        }
    });

});

app.post('/playlist/getNextTracks', function(req, res) {

    let access_token = req.body.access_token;

    let url = req.body.url;

    let options = {
        url: url,
        headers: { 'Authorization': 'Bearer ' + access_token },  
        json: true
    };

    request.get(options, function(error, response, body) {
        if (!error && response.statusCode === 200) {
            res.send({ data: body })
        } else if (!error && response.statusCode === 401) {
            res.send({ data: 'token expired' })
        } else {
            res.send({ data: 'error' })
        }
    });

});
