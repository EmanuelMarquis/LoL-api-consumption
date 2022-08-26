var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

const summoner = require("./Summoner");

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

app.post("/summoner", async (req, res, next) => {
    const sdata = await summoner.getData(req.body.platform, req.body.summonerName);
    const champs = await summoner.getChampMastery(req.body.platform, sdata.id);

    sdata ? res.render("summoner", {
        summonerName: sdata.name,
        summonerLevel: sdata.summonerLevel,

        championName_1: champs[0].championName,
        championPoints_1: champs[0].championPoints,

        championName_2: champs[1].championName,
        championPoints_2: champs[1].championPoints,

        championName_3: champs[2].championName,
        championPoints_3: champs[2].championPoints,

        championName_4: champs[3].championName,
        championPoints_4: champs[3].championPoints,

        championName_5: champs[4].championName,
        championPoints_5: champs[4].championPoints
    }) : res.send("Couldn't get summoner data");
    next();
});

module.exports = app;
