const fs = require('fs');
const {parse} = require('csv-parse/sync');
const { Player } = require('./model/player');

class Memory {
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
        return this.players[name.replace(/\s/g, '')];
    }
}

module.exports = { Memory };

let memory = new Memory('data/L9HomeworkChallengePlayersInput.csv');

let testPlayer = memory.getPlayer("Sifiso Abdalla");
console.log(JSON.stringify(testPlayer));


