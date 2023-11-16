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
    this.freeMade = stats["FTM"];
    this.freeAttempted = stats["FTA"];
    this.twoMade = stats["2PM"];
    this.twoAttempted = stats["2PA"];
    this.threeMade = stats["3PM"];
    this.threeAttempted = stats["3PA"];
    this.rebounds = stats["REB"];
    this.blocks = stats["BLK"];
    this.assists = stats["AST"];
    this.steals = stats["STL"];
    this.turnovers = stats["TOV"];
    ensureValues(this);
  }
};

class PlayerAverageStats extends PlayerBasicStats {

  constructor() {
    super({})
  }

  calculate(gameStats, gamesPlayed) {
    for(let game of gameStats) {
      for(let key in game) this[key] += game[key];
    }

    for(let key in this) this[key] /= gamesPlayed;
    ensureValues(this);
  }

}

class PlayerDerivedStats {
  freePercentage;
  twoPercentage;
  threePercentage;
  points;
  valorization;
  efgPercentage;
  truePercentage;
  assistRatio;

  constructor() {
    ensureValues(this);
  }

  calculate(stats) {
    let points = stats.freeMade + stats.twoMade * 2 + stats.threeMade * 3;
    this.freePercentage = (stats.freeMade / stats.freeAttempted) * 100;
    this.twoPercentage = (stats.twoMade / stats.twoAttempted) * 100;
    this.threePercentage = (stats.threeMade / stats.threeAttempted) * 100;
    this.points = points
    this.valorization = (points + stats.rebounds + stats.blocks + stats.assists + stats.steals) -
      (stats.freeAttempted - stats.freeMade + stats.twoAttempted - stats.twoMade + stats.threeAttempted - stats.threeMade + stats.turnovers);
    this.efgPercentage = (stats.twoMade + stats.threeMade * 1.5) / (stats.twoAttempted + stats.threeAttempted) * 100;
    this.truePercentage = this.points / (2 * (stats.twoAttempted + stats.threeAttempted + 0.475 * stats.freeAttempted)) * 100;
    this.assistRatio = stats.assists / (stats.twoAttempted + stats.threeAttempted + stats.freeAttempted * 0.475 + stats.assists + stats.turnovers) * 100;
    ensureValues(this);
  }

};

const ensureValues = (object) => {
  for(let key in object) {
    if(!object[key] || object[key] === Infinity) object[key] = 0;
  }
}
module.exports = { PlayerBasicStats, PlayerAverageStats, PlayerDerivedStats };

