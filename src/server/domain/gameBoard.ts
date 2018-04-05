import * as ShipInfo from './ship';

export default class GameBoard {

    size: number;
    ships: ShipInfo.Ship[];

    constructor(size: number) {
        this.size = size;
        this.ships = new Array<ShipInfo.Ship>();
    }

    public doesShipConflict(testShip: ShipInfo.Ship): boolean {
        for (var i in this.ships) {
            let ship = this.ships[i];
            if (ship.HitTestShip(testShip))
                return true;
        }
        return false;
    }

    public getPosition(position: ShipInfo.Position): ShipInfo.ShipPosition {
        for (var i in this.ships) {
            let ship = this.ships[i];
            const testPosition = ship.GetShipPosition(position);
            if (testPosition.status != ShipInfo.PositionStatus.NoShip)
                return testPosition;
        }
        return new ShipInfo.ShipPosition(position.x, position.y);
    }

    public allShipsDestroyed(): boolean {
        for (var i in this.ships) {
            let ship = this.ships[i];
            for (var i in ship.positions) {
                let position = ship.positions[i];
                if (position.status != ShipInfo.PositionStatus.ShipHit)
                    return false;
            }
        }
        return true;
    }
}


