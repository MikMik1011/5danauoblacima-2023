type PlayerPosition = "PG" | "SG" | "SF" | "PF" | "C";

type PlayerBasicStats = {
  ftm: number;
  fta: number;
  twpm: number;
  twpa: number;
  thpm: number;
  thpa: number;
  reb: number;
  blk: number;
  ast: number;
  stl: number;
  tov: number;
};

type PlayerDerivedStats = {
  ftp: number;
  twpp: number;
  thpp: number;
  pts: number;
  val: number;
  efgp: number;
  tsp: number;
  hastp: number;
};

export class Player {
  playerName: string;
  gamesPlayed: number = 0;
  position: PlayerPosition;
  gameStats: PlayerBasicStats[] = [];
  averageStats!: PlayerBasicStats;
  derivedStats!: PlayerDerivedStats;

  constructor(name: string, position: PlayerPosition) {
    this.playerName = name;
    this.position = position;
  }

  addNewGame(
    _ftm: number,
    _fta: number,
    _twpm: number,
    _twpa: number,
    _thpm: number,
    _thpa: number,
    _reb: number,
    _blk: number,
    _ast: number,
    _stl: number,
    _tov: number
  ) {
    this.gameStats.push({
      ftm: _ftm,
      fta: _fta,
      twpm: _twpm,
      twpa: _twpa,
      thpm: _thpm,
      thpa: _thpa,
      reb: _reb,
      blk: _blk,
      ast: _ast,
      stl: _stl,
      tov: _tov,
    });
    this.gamesPlayed++;
  }

  calculateAverageStats() {
    let totalStats: PlayerBasicStats = {
      ftm: 0,
      fta: 0,
      twpm: 0,
      twpa: 0,
      thpm: 0,
      thpa: 0,
      reb: 0,
      blk: 0,
      ast: 0,
      stl: 0,
      tov: 0,
    };

    for (let game of this.gameStats) {
      totalStats.ftm += game.ftm;
      totalStats.fta += game.fta;
      totalStats.twpm += game.twpm;
      totalStats.twpa += game.twpa;
      totalStats.thpm += game.thpm;
      totalStats.thpa += game.thpa;
      totalStats.reb += game.reb;
      totalStats.blk += game.blk;
      totalStats.ast += game.ast;
      totalStats.stl += game.stl;
      totalStats.tov += game.tov;
    }

    this.averageStats = {
      ftm: totalStats.ftm / this.gamesPlayed,
      fta: totalStats.fta / this.gamesPlayed,
      twpm: totalStats.twpm / this.gamesPlayed,
      twpa: totalStats.twpa / this.gamesPlayed,
      thpm: totalStats.thpm / this.gamesPlayed,
      thpa: totalStats.thpa / this.gamesPlayed,
      reb: totalStats.reb / this.gamesPlayed,
      blk: totalStats.blk / this.gamesPlayed,
      ast: totalStats.ast / this.gamesPlayed,
      stl: totalStats.stl / this.gamesPlayed,
      tov: totalStats.tov / this.gamesPlayed,
    };
  }

  calculateDerivedStats() {
    
    this.derivedStats = {
    
      ftp: this.averageStats.fta === 0 ? 0 : this.averageStats.ftm / this.averageStats.fta * 100,
      twpp: this.averageStats.twpa === 0 ? 0 : this.averageStats.twpm / this.averageStats.twpa * 100,
      thpp: this.averageStats.thpa === 0 ? 0 : this.averageStats.thpm / this.averageStats.thpa * 100,
      pts: this.averageStats.twpm * 2 + this.averageStats.thpm * 3 + this.averageStats.ftm,
      val: (this.derivedStats.pts + this.averageStats.reb + this.averageStats.ast + this.averageStats.stl + this.averageStats.blk - this.averageStats.tov) -
           (this.averageStats.fta - this.averageStats.ftm + this.averageStats.twpa - this.averageStats.twpm + this.averageStats.thpa - this.averageStats.thpm + this.averageStats.tov),
      efgp: (this.averageStats.twpm + this.averageStats.thpm * 1.5) / (this.averageStats.twpa + this.averageStats.thpa) * 100,
      tsp: this.derivedStats.pts / (2 * (this.averageStats.twpa + this.averageStats.thpa + 0.475 * this.averageStats.fta)) * 100,
      hastp: this.averageStats.ast / (this.averageStats.twpa + this.averageStats.thpa + 0.475 * this.averageStats.fta + this.averageStats.ast + this.averageStats.tov) * 100
      }
  
  }
}
