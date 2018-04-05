import * as express from 'express';
import { battleship } from '../domain/battleship';
import * as ShipInfo from '../domain/ship';
import * as Errors from '../errors/errors'

export default class ApiRouter {

  public static configure(app: express.Application) {

    /**
     * @api {post} /startnew Start New Game
     * @apiName StartNew
     *
     * @apiParam {Number} boardSize Size to initiate square game board.
     * 
     * @apiSuccess {String} actionResult Successful creation of game board.
     * @apiSuccess {String} summary Game summary.
     *
     * @apiError Board size must be greater than or equal to 5.
     * @apiError Failed to initialize game state.
     */
    app.post('/api/startnew', function (req, res) {
      try {

        //init game
        battleship.Init(req.params.size, req.params.requiredShips);
        res.send(battleship.summary);

      } catch (error) {
        if (error instanceof Errors.InitBoardSizeError)
          res.status(400).send({ error: error.message });
        else
          res.status(500).send({ error: 'Unknown initialization error.' });
      }
    });

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
    app.post('/api/placeship', function (req, res) {
      try {

        //build temporary ship - type: Ship.ShipType, x: number, y: number, orientation: Ship.ShipOrientation
        const ship = new ShipInfo.ShipBuilder(req.params.type, req.params.x, req.params.y, req.params.orientation).Create();

        //attempt to place on player board
        battleship.PlaceUserShip(ship);
        res.send(battleship.summary);

      } catch (error) {
        if (error instanceof Errors.InvalidActionForGameStateError || error instanceof Errors.ShipPlacementError || error instanceof Errors.ShipOverlapError)
          res.status(400).send({ error: error.message });
        else
          res.status(500).send({ error: 'Unknown initialization error.' });
      }
    })

    /**
     * @api {post} /fire User attacks computer
     * @apiName Fire
     *
     * @apiParam {Number} x X-axis coordinate of ship to left most corner.
     * @apiParam {Number} y Y-axis coordinate of ship to left most corner.
     *
     * @apiSuccess {String} actionResult Hit or Miss or Sunk Ship.
     * @apiSuccess {String} summary Game summary.
     *
     * @apiError FireOverflow Fired coordinates are beyond board dimensions.
     * @apiError RepeatHit Hit already.
     */
    app.post('/api/fire', function (req, res) {

      try {

        //Fire shot at computer board
        const summary = battleship.FireShot(new ShipInfo.Position(req.params.x, req.params.y));
        res.send(summary);

      } catch (error) {
        if (error instanceof Errors.InvalidActionForGameStateError || error instanceof Errors.ShotPlacementError)
          res.status(400).send({ error: error.message });
        else
          res.status(500).send({ error: 'Unknown initialization error.' });
      }

    })


    /**
     * @api {get} /summary Retrieve game summary.
     * @apiName Summary
     *
     * @apiSuccess {Summary} summary Game summary.
     */
    app.get('/api/summary', function (req, res) {
      try {

        res.send(battleship.summary);

      } catch (error) {
        res.status(500).send({ error: 'Unknown game summary error.' });
      }
    })



  }
}




