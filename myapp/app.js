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

app.set("view engine", "ejs");
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

const getSummonerData = async (platform, summonerName) => 
    await axios.get(`https://${platform}/lol/summoner/v4/summoners/by-name/${summonerName}?api_key=${mconfig.api_key}`,)
        .then(res => res.data)
        .catch(err => {
            console.log(`couldn't get summoner data: ${err.response.status}`);
            return null;
        });


app.post("/summoner", async (req, res, next) => {
    const sdata = await getSummonerData(req.body.platform, req.body.summonerName);

    sdata ? res.render("summoner", {
        summonerName: sdata.name,
        summonerLevel: sdata.summonerLevel
    }) : res.send("Couldn't get summoner data");
    next();
});

module.exports = app;
