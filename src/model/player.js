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
}

module.exports = { Player };
