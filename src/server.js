const fastify = require("fastify");
const {PlayerStorage} = require("./playerStorage");

let playerStorage = new PlayerStorage('data/L9HomeworkChallengePlayersInput.csv');
const build = () => {
    let app = fastify();
    app.get("/stats/player/:playerName", async (request, reply) => {
        const { playerName } = request.params;
        let response = playerStorage.getPlayer(playerName);
        if(response === undefined) {
            reply.code(404);
            return {"error": "Player not found!"};
        }
    
        return response;
    });
    return app;
}
module.exports = build;
let app = build();

app.listen({"port": 3000}, (err) => {
    if (err) {
        fastify.log.error(err);
        process.exit(1);
    }
    console.log(`[SERVER] listening on port ${app.server.address().port}`);
});

