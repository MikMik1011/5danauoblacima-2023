const { PlayerBasicStats, PlayerAverageStats, PlayerDerivedStats } = require('./stats');

class Player {
  playerName;
  gamesPlayed = 0;
  position;
  gameStats = [];
  averageStats;
  derivedStats;

  constructor(name, position) {
    this.playerName = name;
    let playerPositions = ["PG", "SG", "SF", "PF", "C"];
    if(!playerPositions.includes(position)) throw new Error("Invalid position");
    this.position = position;
  }

  addNewGame(stats) {
    this.gameStats.push(new PlayerBasicStats(stats));
    this.gamesPlayed++;
    this.calculateAverageStats();
    this.calculateDerivedStats();
  }

  calculateAverageStats() {
    this.averageStats = new PlayerAverageStats(this.gameStats, this.gamesPlayed);
  }

  calculateDerivedStats() {
    this.derivedStats = new PlayerDerivedStats(this.averageStats);
  }

  toJSON() {
    let json = {
      "playerName": this.playerName,
      "gamesPlayed": this.gamesPlayed,
      "traditional": {
        "freeThrows": {
          "attempts": this.averageStats.freeAttempted,
          "made": this.averageStats.freeMade,
          "shootingPercentage": this.derivedStats.freePercentage
        },
        "twoPoints": {
          "attempts": this.averageStats.twoAttempted,
          "made": this.averageStats.twoMade,
          "shootingPercentage": this.derivedStats.twoPercentage
        },
        "threePoints": {
          "attempts": this.averageStats.threeAttempted,
          "made": this.averageStats.threeMade,
          "shootingPercentage": this.derivedStats.threePercentage
        },
        "points": this.derivedStats.points,
        "rebounds": this.averageStats.rebounds,
        "blocks": this.averageStats.blocks,
        "assists": this.averageStats.assists,
        "steals": this.averageStats.steals,
        "turnovers": this.averageStats.turnovers
      },
      "advanced": {
        "valorisation": this.derivedStats.valorisation,
        "effectiveFieldGoalPercentage": this.derivedStats.efgPercentage,
        "trueShootingPercentage": this.derivedStats.truePercentage,
        "hollingerAssistRatio": this.derivedStats.assistRatio
      }
    }
    roundNumbers(json)
    return json
  }
}

const roundNumbers = (object) => {
  for(let key in object) {
    if(typeof object[key] === "object" && object[key] !== null) roundNumbers(object[key]);
    else if(typeof object[key] === "number") object[key] = Number(object[key].toFixed(1));
  }
} 

module.exports = { Player };
