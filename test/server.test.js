const build = require("../src/server");
const { expect } = require("chai");

describe("API", () => {
  let app;
  
  before(async () => {
    app = build();
  })

  after(async () => {
    app.close();
  })

  it("should return correct data for player", async () => {
    const response = await app.inject({
      method: "GET",
      url: "/stats/player/SifisoAbdalla",
    });

    let expectedOutput = {
      playerName: "Sifiso Abdalla",
      gamesPlayed: 3,
      traditional: {
        freeThrows: {
          attempts: 4.7,
          made: 3.3,
          shootingPercentage: 71.4,
        },
        twoPoints: {
          attempts: 4.7,
          made: 3,
          shootingPercentage: 64.3,
        },
        threePoints: {
          attempts: 6.3,
          made: 1,
          shootingPercentage: 15.8,
        },
        points: 12.3,
        rebounds: 5.7,
        blocks: 1.7,
        assists: 0.7,
        steals: 1,
        turnovers: 1.3,
      },
      advanced: {
        valorization: 11.7,
        effectiveFieldGoalPercentage: 40.9,
        trueShootingPercentage: 46.7,
        hollingerAssistRatio: 4.4,
      },
    };

    expect(response.statusCode).to.equal(200);
    expect(response.json()).to.be.eql(expectedOutput);
  });

  it("should return 404 when player is not found", async () => {
    const response = await app.inject({
      method: "GET",
      url: "/stats/player/JohnDoe",
    });
    expect(response.statusCode).to.equal(404);
  });
});
