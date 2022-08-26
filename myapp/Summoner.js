const axios = require("axios").default;
const config = require("./config");
const mconfig = require("./config");

let summoner = {};

Object.defineProperties(summoner, {
    getData: {
        value: async (platform, summonerName) => 
            await axios.get(`https://${platform}/lol/summoner/v4/summoners/by-name/${summonerName}?api_key=${mconfig.api_key}`,)
                .then(res => res.data)
                .catch(err => {
                    console.log(`couldn't get summoner data: ${err.response.status}`);
                    return null;
                }),
        writable: false
    },
    getChampMastery: {
        value: async (platform, summonerId) => {
            
            const champions = (await axios.get("http://ddragon.leagueoflegends.com/cdn/12.16.1/data/en_US/champion.json")
                .then(res => res.data)
                .catch(err => {
                    console.log(`couldn't get all champion json data: ${err.response.status}`);
                    return null;
                })).data;
            
            const sChamps = await axios.get(`https://${platform}/lol/champion-mastery/v4/champion-masteries/by-summoner/${summonerId}?api_key=${config.api_key}`)
                .then(res => res.data)
                .catch(err => {
                    console.log(`couldn't get all champion mastery data: ${err.response.status}`);
                    return null;
                });

            let champNames = []
            for(const schamp in sChamps) {
                for(const champ in champions) {
                    if(champions[champ].key == sChamps[schamp].championId) {
                        champNames.push(champions[champ].id);
                    }
                }
            }

            return [{
                    championName: champNames[0],
                    championPoints: sChamps[0].championPoints
                },
                {
                    championName: champNames[1],
                    championPoints:  sChamps[1].championPoints
                },
                {
                    championName: champNames[2],
                    championPoints:  sChamps[2].championPoints
                },
                {
                    championName: champNames[3],
                    championPoints:  sChamps[3].championPoints
                },
                {
                    championName: champNames[4],
                    championPoints:  sChamps[4].championPoints
                }
            ]
        },
        writable: false
    }
});

Object.seal(summoner);

module.exports = summoner;