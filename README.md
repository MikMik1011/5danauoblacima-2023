# Competition Project - Fastify API

## Environment Setup

Before building and running this project, ensure you have the following prerequisites installed on your machine:

- [Node.js](https://nodejs.org/) - JavaScript runtime
- [npm](https://www.npmjs.com/) - Node.js package manager

## Build

To build the project, follow these steps:

1. Open a terminal in the project directory.

2. Run the following command to install project dependencies:

```bash
npm install
```

## Running

To run the Fastify API, execute the following command:

```bash
npm start
```

This will start the Fastify server on port 3000. Access the API at http://localhost:3000.

### Development mode
You can run the server in development mode using the command:

```bash
npm run dev
```
It will run the server and restart the API in case any file changes.


## Testing

The project utilizes Mocha and Chai for testing. Run the tests with the following command:

```bash
npm test
```

## Technologies Used

- Fastify: A fast and low-overhead web framework for Node.js.
- Mocha: A feature-rich JavaScript test framework running on Node.js.
- Chai: A BDD/TDD assertion library for Node.js and the browser.
- npm: The package manager for Node.js, used for managing project dependencies.
- Node.js: A JavaScript runtime built on Chrome's V8 JavaScript engine.

## Example API Usage

### Get Player Stats

To retrieve player statistics, make a GET request to the following endpoint:

```http
GET /stats/player/:playerName
```

Replace :playerName with the desired player's name. If the player is not found, a 404 error will be returned with an error message.

Example:

```bash
curl http://localhost:3000/stats/player/SifisoAbdalla
```

Response (JSON):

```json
{
  "playerName": "Sifiso Abdalla",
  "gamesPlayed": 3,
  "traditional": {
    "freeThrows": {
      "attempts": 4.7,
      "made": 3.3,
      "shootingPercentage": 71.4
    },
    "twoPoints": {
      "attempts": 4.7,
      "made": 3.0,
      "shootingPercentage": 64.3
    },
    "threePoints": {
      "attempts": 6.3,
      "made": 1.0,
      "shootingPercentage": 15.8
    },
    "points": 12.3,
    "rebounds": 5.7,
    "blocks": 1.7,
    "assists": 0.7,
    "steals": 1.0,
    "turnovers": 1.3
  },
  "advanced": {
    "valorization": 11.7,
    "effectiveFieldGoalPercentage": 40.9,
    "trueShootingPercentage": 46.7,
    "hollingerAssistRatio": 4.4
  }
}
```
