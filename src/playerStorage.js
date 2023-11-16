const fs = require('fs');
const {parse} = require('csv-parse/sync');
const { Player } = require('./model/player');

class PlayerStorage {
    players = {};
    
    constructor(fileName) {
        const csvData = fs.readFileSync(fileName, 'utf8');
        const rows = parse(csvData, { delimiter: ',', columns: true});
        for(let row of rows) {
            let game = {};
            for(let key in row) {
                game[key.trim()] = row[key];
            }
            let key = game["PLAYER"].replace(/\s/g, '');
            if(!this.players[key]) {
                this.players[key] = new Player(game["PLAYER"], game["POSITION"]);
            }
            this.players[key].addNewGame(game);
            
        };
    }

    getPlayer(name) {
        let player = this.players[name.replace(/\s/g, '')];
        if(player === undefined) return undefined;
        if(player.gamesCalculated !== player.gamesPlayed) {
            player.averageStats.calculate(player.gameStats, player.gamesPlayed);
            player.derivedStats.calculate(player.averageStats);
            player.gamesCalculated = player.gamesPlayed;
        }
        return player;
    }
}

module.exports = { PlayerStorage };


