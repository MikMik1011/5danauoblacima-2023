const fs = require('fs');
const {parse} = require('csv-parse');
const fastify = require('fastify');
const { Player } = require('./model/player');

const app = fastify();

const csvData = fs.readFileSync('data/L9HomeworkChallengePlayersInput.csv');

const rows = parse(csvData, { delimiter: ',', columns: true});


let players = {};

rows.forEach((row) => {
    let game = {};
    for(let key in row) {
        game[key.trim()] = row[key];
    }
    let key = game["PLAYER"].replace(/\s/g, '');
    if(!players[key]) {
        players[key] = new Player(game["PLAYER"], game["POSITION"]);
    }
    players[key].addNewGame(game);
    console.log(players[key].playerName);
    console.table(players[key].gameStats);
    console.table(players[key].averageStats);
    console.table(players[key].derivedStats);
});

