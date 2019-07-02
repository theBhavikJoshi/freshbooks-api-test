var express = require("express");
const axios = require('axios');
var app = express();
let token = '';

app.get("/redirect", (req, res, next) => {
    // console.log('Data: ', req);
    let headers = {
        "Api-Version": "alpha",
        "Content-Type": "application/json"
    };
    let data = {
        "grant_type": "authorization_code",
        "client_secret": "03b43e92ac0c72acf663319ae70b9fdf6334a100407661538c47a83de5ecec28",
        "code": req.query.code,
        "client_id": "c284839b801de0d32170d0f50812423aece00c807627d326ee86c3a4a3091e8c",
        "redirect_uri": "https://enigmatic-woodland-76309.herokuapp.com/redirect"
    }
    let url = 'https://api.freshbooks.com/auth/oauth/token';
    axios
    .post(url, data, {headers: headers})
    .then((response) => {
        console.log('Response: ', response);
        token = response.data.access_token;
    })
    .catch((error) => {
        console.log('Error: ', error);
    })
    res.send('Hello');
});

app.get('/projects', (req, res, next) => {
    let url = 'https://api.freshbooks.com/projects/business/2214806/projects';
    let headers = {
        "Authorization": `Bearer ${token}`
    };
    axios.get(url)
    .then((response) => {
        console.log('Proj res: ', response);
    })
    .catch((error) => {
        console.log('Error: ', error);
    })
    res.send('Yes');
});


app.set('port', process.env.PORT || 8080);
app.listen(app.get('port'), () => {
 console.log(`Server running on port ${app.get('port')}`);
});