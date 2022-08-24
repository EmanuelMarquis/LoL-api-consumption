var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const axios = require("axios").default;
const mconfig = require("./config");

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
const { config } = require('process');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

const getSummonerData = (platform, summonerName) => {
    axios.get(`https://${platform}/lol/summoner/v4/summoners/by-name/${summonerName}?api_key=${mconfig.api_key}`,)
        .then(response => {
            res = response;
            console.log("response: %s", response.status);
            console.log(response.data);
        })
        .catch(err => {
            console.log(err);
        });
}

app.post("/index", (req, res, next) => {
    getSummonerData(req.body.platform, req.body.summonerName);
});

module.exports = app;
