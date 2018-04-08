import * as express from 'express';
import * as Errors from '../errors/errors';

import GameSetup from '../domain/gameSetup';
import { PokoIrisMachine } from '../domain/pokoirismachine'

export default class ApiRouter {

  public static configure(app: express.Application) {

    /**
       * @api {get} /api/configureNewGame Configure a new game.
       * @apiName ConfigureNewGame
       * @apiParam {Number} numberOfPlayers Number of players that are playing: range 3-6.
       * @apiParam {Number} numberOfRounds Number of rounds for the game: range 3-20.
       * 
       * @apiError InvalidGameStartupArguments Game configuration out of range.
       * @apiSuccess {GameSetup} game setup details with valid game id.
       */
    app.get('/api/configureNewGame', function (req, res) {
      try {
        const gameSetup = new GameSetup(req.params.numberOfPlayers, req.params.numberOfRounds);
        const id = gameSetup.ConfigureNewGame();
        res.send(gameSetup);

      } catch (error) {
        if (error instanceof Errors.InvalidGameSetupArguments)
          res.status(400).send({ error: error.message });
        else
          res.status(500).send({ error: 'Unknown initialization error.' });
      }
    })

    /**
     * @api {post} /api/playerSetup Configure each player
     * @apiName PlayerSetup
     *
     * @apiParam {String} gameToken Unique game identifier, used to maintain session.
     * @apiParam {String} playerId Unique identifier of player.
     * @apiParam {String} playerName Name of player.
     * @apiParam {String} selectedResource Chosen resource id (from known list).
     *
     * @apiSuccess {String} actionResult Successful placement of ship.
     * @apiSuccess {String} summary Game summary.
     *
     * @apiError ShipOverflow Ship's dimensions and placement exceeded board size.
     * @apiError ShipOverlap Ship cannot be placed on top of another ship.
     */
    app.post('/api/playerSetup', function (req, res) {
      try {

       
        const pim = PokoIrisMachine.GetGame(req.params.gameToken)
        pim.SetupPlayer(req.params.playerId, req.params.playerName, req.params.selectedResource)
   
        res.sendStatus(200)

      } catch (error) {
        if (error instanceof Errors.InvalidGame)
          res.status(400).send({ error: error.message });
        else if (false)
          res.status(400).send({ error: error.message });
        else
          res.status(500).send({ error: 'Unknown initialization error.' });
      }
    })




  }
}




