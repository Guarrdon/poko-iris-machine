import * as express from 'express';
import * as Errors from '../errors/errors';

import GameSetup from '../domain/gameSetup';

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
        if (error instanceof Errors.InvalidGameStartupArguments)
          res.status(400).send({ error: error.message });
        else
          res.status(500).send({ error: 'Unknown initialization error.' });
      }
    })



    /**
     * @api {post} /placeship Place player ship on board
     * @apiName PlaceShip
     *
     * @apiParam {Number} shipSize Size of ship to be placed.
     * @apiParam {Number} x X-axis coordinate of ship to left most corner.
     * @apiParam {Number} y Y-axis coordinate of ship to left most corner.
     * @apiParam {Number} orientation Ship orientation on board (0 - vertical, 1 - horizontal).
     *
     * @apiSuccess {String} actionResult Successful placement of ship.
     * @apiSuccess {String} summary Game summary.
     *
     * @apiError ShipOverflow Ship's dimensions and placement exceeded board size.
     * @apiError ShipOverlap Ship cannot be placed on top of another ship.
     */
    // app.post('/api/placeship', function (req, res) {
    //   try {

    //     //build temporary ship - type: Ship.ShipType, x: number, y: number, orientation: Ship.ShipOrientation
    //     const ship = new ShipInfo.ShipBuilder(req.params.type, req.params.x, req.params.y, req.params.orientation).Create();

    //     //attempt to place on player board
    //     battleship.PlaceUserShip(ship);
    //     res.send(battleship.summary);

    //   } catch (error) {
    //     if (error instanceof Errors.InvalidActionForGameStateError || error instanceof Errors.ShipPlacementError || error instanceof Errors.ShipOverlapError)
    //       res.status(400).send({ error: error.message });
    //     else
    //       res.status(500).send({ error: 'Unknown initialization error.' });
    //   }
    // })




  }
}




