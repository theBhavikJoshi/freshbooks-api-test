var express = require("express");
var app = express();

app.get("/redirect", (req, res, next) => {
    console.log('Data: ', req);
    res.send('Hello');
});


app.set('port', process.env.PORT || 8080);
app.listen(app.get('port'), () => {
 console.log(`Server running on port ${app.get('port')}`);
});