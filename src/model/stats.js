class PlayerBasicStats {
  freeMade;
  freeAttempted;
  twoMade;
  twoAttempted;
  threeMade;
  threeAttempted;
  rebounds;
  blocks;
  assists;
  steals;
  turnovers;

  constructor(stats) {
    for(let key in stats) {
      if(key.includes("PLAYER") || key.includes("POSITION")) continue;

      stats[key] = Number(stats[key]);
    }
    this.freeMade = stats["FTM"] || 0;
    this.freeAttempted = stats["FTA"] || 0;
    this.twoMade = stats["2PM"] || 0;
    this.twoAttempted = stats["2PA"] || 0;
    this.threeMade = stats["3PM"] || 0;
    this.threeAttempted = stats["3PA"] || 0;
    this.rebounds = stats["REB"] || 0;
    this.blocks = stats["BLK"] || 0;
    this.assists = stats["AST"] || 0;
    this.steals = stats["STL"] || 0;
    this.turnovers = stats["TOV"] || 0;
  }
};

class PlayerAverageStats extends PlayerBasicStats {

  constructor(gameStats, gamesPlayed) {
    super({})
    for(let game of gameStats) {
      for(let key in game) this[key] += game[key];
    }
    for(let key in this) this[key] = Number((this[key] / gamesPlayed).toFixed(1));
  }

}

class PlayerDerivedStats {
  freePercentage;
  twoPercentage;
  threePercentage;
  points;
  valorisation;
  efgPercentage;
  truePercentage;
  assistRatio;

  constructor(stats) {
    let points = stats.freeMade + stats.twoMade * 2 + stats.threeMade * 3;
    this.freePercentage = (stats.freeMade / stats.freeAttempted) * 100;
    this.twoPercentage = (stats.twoMade / stats.twoAttempted) * 100;
    this.threePercentage = (stats.threeMade / stats.threeAttempted) * 100;
    this.points = points
    this.valorisation = (points + stats.rebounds + stats.blocks + stats.assists + stats.steals) -
      (stats.freeAttempted - stats.freeMade + stats.twoAttempted - stats.twoMade + stats.threeAttempted - stats.threeMade + stats.turnovers);
    this.efgPercentage = (stats.twoMade + stats.threeMade * 1.5) / (stats.twoAttempted + stats.threeAttempted) * 100;
    this.truePercentage = this.points / (2 * (stats.twoAttempted + stats.threeAttempted + 0.475 * stats.freeAttempted)) * 100;
    this.assistRatio = stats.assists / (stats.twoAttempted + stats.threeAttempted + stats.freeAttempted * 0.475 + stats.assists + stats.turnovers) * 100;

    for(let key in this) {
      this[key] = Number(this[key].toFixed(1));
    }
  }
};

module.exports = { PlayerBasicStats, PlayerAverageStats, PlayerDerivedStats };

