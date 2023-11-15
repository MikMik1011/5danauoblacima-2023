const fastify = require("fastify")();
const {Memory} = require("./memory");

let memory = new Memory('data/L9HomeworkChallengePlayersInput.csv');

fastify.get("/stats/player/:playerName", async (request, reply) => {
    const { playerName } = request.params;
    let response = memory.getPlayer(playerName);
    if(response === undefined) {
        reply.code(404);
        return {"error": "Player not found!"};
    }

    return response;
});

fastify.listen({"port": 3000}, (err) => {
    if (err) {
        fastify.log.error(err);
        process.exit(1);
    }
    console.log(`Server listening on port ${fastify.server.address().port}`);
});

