
import Utility from './utility';
import * as ShipInfo from './ship';
import GameBoard from './gameBoard';
import { ShipBuilder, ShipPosition } from './ship';

export default class ComputerPlay {

    constructor() { }

    public RandomizeShips(board: GameBoard): void {

        const ships: ShipInfo.ShipType[] = [ShipInfo.ShipType.Carrier, ShipInfo.ShipType.Battleship, ShipInfo.ShipType.Destroyer, ShipInfo.ShipType.Submarine, ShipInfo.ShipType.Patrol];
        let ship: ShipInfo.Ship;

        ships.forEach(function (shipType: ShipInfo.ShipType) {
            do {
                const orientation: ShipInfo.ShipOrientation = Utility.randomIntFromInterval(0, 1);
                const pos1 = Utility.randomIntFromInterval(1, board.size - shipType);
                const pos2 = Utility.randomIntFromInterval(1, board.size);

                ship = new ShipBuilder(shipType, pos1, pos2, orientation).Create();
            }
            while (board.doesShipConflict(ship));

            board.ships.push(ship);
        });
    }

    //todo: build better AI ..lol
            
    public GetRandomShot(size: number): ShipInfo.Position {

        const x: number = Utility.randomIntFromInterval(1, size);
        const y: number = Utility.randomIntFromInterval(1, size);

        return new ShipInfo.Position(x, y);
    }

}

