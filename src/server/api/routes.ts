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
       * @apiError InvalidGameSetupArguments Game configuration out of range.
       * @apiError InvalidGameOperation Cannot perform function while in the current game mode
       *
       * @apiSuccess {GameSetup} game setup details with valid game id.
       */
    app.get('/api/configureNewGame', function (req, res) {
      try {

        const gameSetup = PokoIrisMachine.ConfigureNewGame(req.params.numberOfPlayers, req.params.numberOfRounds);
        res.send(gameSetup);

      } catch (error) {
        if (error instanceof Errors.InvalidGameSetupArguments)
          res.status(400).send({ error: error.message });
        else if (error instanceof Errors.InvalidGameOperation)
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
     * @apiParam {String} playerName Name of player.
     * @apiParam {String} selectedResource Chosen resource id (from known list).
     *
     * @apiError InvalidGame Game not found
     * @apiError InvalidPlayerSetupArguments Invalid player attributes (nulls)
     * @apiError PlayerAlreadyExists Cannot have duplicate players (names)
     * @apiError InvalidGameOperation Cannot perform function while in the current game mode
     *
     * @apiSuccess {HttpResonseCode} 200 Successful player setup.
     */
    app.post('/api/playerSetup', function (req, res) {
      try {

        const pim = PokoIrisMachine.GetGame(req.params.gameToken)
        const playerId = pim.SetupPlayer(req.params.playerName, req.params.selectedResource)

        res.sendStatus(200)

      } catch (error) {
        if (error instanceof Errors.InvalidGame)
          res.status(400).send({ error: error.message });
        else if (error instanceof Errors.InvalidPlayerSetupArguments)
          res.status(400).send({ error: error.message });
        else if (error instanceof Errors.PlayerAlreadyExists)
          res.status(400).send({ error: error.message });
        else if (error instanceof Errors.InvalidGameOperation)
          res.status(400).send({ error: error.message });
        else
          res.status(500).send({ error: 'Unknown initialization error.' });
      }
    })


    /**
     * @api {post} /api/beginGame Begins game play
     * @apiName BeginGame
     *
     * @apiParam {String} gameToken Unique game identifier, used to maintain session.
     *
     * @apiError InvalidGame Game not found
     * @apiError InvalidGameOperation Cannot perform function while in the current game mode
     *
     * @apiSuccess {GameEvents.GameEvent} introEvent Succesfully started game and returned initial intro event.
     */
    app.post('/api/beginGame', function (req, res) {
      try {

        const pim = PokoIrisMachine.GetGame(req.params.gameToken)
        const introEvent = pim.BeginGame()

        res.send(introEvent)

      } catch (error) {
        if (error instanceof Errors.InvalidGame)
          res.status(400).send({ error: error.message });
        else if (error instanceof Errors.InvalidGameOperation)
          res.status(400).send({ error: error.message });
        else
          res.status(500).send({ error: 'Unknown initialization error.' });
      }
    })

    /**
     * @api {post} /api/beginTurn Begins player turn
     * @apiName BeginTurn
     *
     * @apiParam {String} gameToken Unique game identifier, used to maintain session.
     * @apiParam {String} playerId Player whose turn it is.
     *
     * @apiError InvalidGame Game not found
     * @apiError InvalidGameOperation Cannot perform function while in the current game mode
     *
     * @apiSuccess {PlayerTurn} turn player info, dice roll, and resulting event.
     */
    app.post('/api/beginTurn', function (req, res) {
      try {

        const pim = PokoIrisMachine.GetGame(req.params.gameToken)
        const turn = pim.BeginPlayerTurn(req.params.playerId)

        res.send(turn)

      } catch (error) {
        if (error instanceof Errors.InvalidGame)
          res.status(400).send({ error: error.message });
        else if (error instanceof Errors.InvalidGameOperation)
          res.status(400).send({ error: error.message });
        else
          res.status(500).send({ error: 'Unknown initialization error.' });
      }
    })


  

  }
}




