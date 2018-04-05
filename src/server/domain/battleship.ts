import Gameboard from './gameBoard';
import ComputerPlay from './computerPlay';
import * as GameSummary from './summary';
import * as Errors from '../errors/errors';
import { GameState } from './summary';
import * as ShipInfo from './ship';

export class BattleShip {

    size: number;
    shipsRequired: number;
    playerBoard: Gameboard;
    computerBoard: Gameboard;
    summary: GameSummary.Summary;

    constructor() {
        this.Reset();
    }

    public Reset(): void {
        this.size = 0;
        this.shipsRequired = 0;
        this.playerBoard = null;
        this.computerBoard = null;
        this.summary = new GameSummary.Summary();
    }

    public Init(size, shipsRequired): void {
        //any game state allowed; can reset at any time

        if (shipsRequired <= 0)
            throw new Errors.InitBoardRequiredShipsError();

        if (size < 5 || size < shipsRequired)
            throw new Errors.InitBoardSizeError();

        //set up player and computer boards (without ships)
        this.size = size;
        this.shipsRequired = shipsRequired;
        this.playerBoard = new Gameboard(size);
        this.computerBoard = new Gameboard(size);

        //randomy place ships on computer board
        const computer = new ComputerPlay();
        computer.RandomizeShips(this.computerBoard);

        //set starting state
        this.summary.state = GameSummary.GameState.NeedsUserShips;
    }

    public PlaceUserShip(ship: ShipInfo.Ship): void {
        if (this.summary.state != GameSummary.GameState.NeedsUserShips)
            throw new Errors.InvalidActionForGameStateError();

        if (ship.maxX > this.size || ship.maxY > this.size)
            throw new Errors.ShipPlacementError();

        if (this.playerBoard.doesShipConflict(ship))
            throw new Errors.ShipOverlapError();

        //add valid, unobstructed ship to player board
        this.playerBoard.ships.push(ship);

        //allow game play if all player ships have been placed
        //todo: abstract const ship number
        if (this.playerBoard.ships.length == this.shipsRequired)
            this.summary.state = GameSummary.GameState.ReadyToPlay;
    }

    public FireShot(playerShot: ShipInfo.Position): GameSummary.Summary {
        if (this.summary.state != GameSummary.GameState.ReadyToPlay)
            throw new Errors.InvalidActionForGameStateError();

        if (playerShot.x <= 0 || playerShot.x > this.size || playerShot.y <= 0 || playerShot.y > this.size)
            throw new Errors.ShotPlacementError();

        let computerShot: ShipInfo.Position;
        let computerResult: ShipInfo.ShipPosition;

        //test player shot
        const playerResult = this.computerBoard.getPosition(playerShot);
        if (playerResult.status != ShipInfo.PositionStatus.NoShip) {
            playerResult.status = ShipInfo.PositionStatus.ShipHit;

            //test player win
            if (this.computerBoard.allShipsDestroyed())
                this.summary.state = GameSummary.GameState.PlayerWon;
            else {

                //test computer shot
                const computerAI = new ComputerPlay();
                computerShot = computerAI.GetRandomShot(this.size);
                computerResult = this.playerBoard.getPosition(computerShot)
                if (computerResult.status != ShipInfo.PositionStatus.NoShip) {
                    computerResult.status = ShipInfo.PositionStatus.ShipHit;

                    //test computer win    
                    if (this.playerBoard.allShipsDestroyed()) {
                        this.summary.state = GameState.ComputerWon;
                    }
                }
            }
        }

        //summarize player
        this.summary.history.push(`Player fired at ${playerResult.x},${playerResult.y}.  It ${playerResult.status == ShipInfo.PositionStatus.NoShip ? 'missed' : 'hit'}.`);
        if (this.summary.state == GameSummary.GameState.PlayerWon) {
            this.summary.history.push(`Player wins!`);
            return this.summary;
        }

        if (computerResult) {
            //summarize computer
            this.summary.history.push(`Computer fired at ${computerResult.x},${computerResult.y}.  It ${computerResult.status == ShipInfo.PositionStatus.NoShip ? 'missed' : 'hit'}.`);
            if (this.summary.state == GameSummary.GameState.ComputerWon)
                this.summary.history.push(`Computer wins!`);
        }

        return this.summary;
    }

}

export const battleship = new BattleShip();
