import * as Errors from '../errors/errors';

export class Ship {

    type: ShipType;
    positions: ShipPosition[];

    public get maxX(): number {
        var xs = this.positions.map(function (v) {
            return v.x;
        });
        return Math.max.apply(null, xs);
    }
    public get maxY(): number {
        var ys = this.positions.map(function (v) {
            return v.y;
        });
        return Math.max.apply(null, ys);
    }

    constructor(type: ShipType, positions: ShipPosition[]) {
        this.type = type;
        this.positions = positions;
    }

    public GetShipPosition(position: Position): ShipPosition {
        for (var i in this.positions) {
            let shipPosition = this.positions[i];
            if (position.x == shipPosition.x && position.y == shipPosition.y) {
                return shipPosition;
            }
        }
        return new ShipPosition(position.x, position.y);
    }
    public HitTestShip(ship: Ship): boolean {
        for (var i in ship.positions) {
            let pos = ship.positions[i];
            let testPosition: ShipPosition = this.GetShipPosition(pos);
            if (testPosition.status != PositionStatus.NoShip)
                return true;
        }
        return false;
    }

}

export class ShipBuilder {
    type: ShipType;
    x: number;
    y: number;
    orientation: ShipOrientation;

    constructor(type: ShipType, x: number, y: number, orientation: ShipOrientation) {
        if (x <= 0 || y <= 0)
            throw new Errors.ShipPlacementError();

        this.type = type;
        this.x = x;
        this.y = y;
        this.orientation = orientation;
    }

    public Create(): Ship {
        let positions = new Array<ShipPosition>();
        let position: ShipPosition;

        for (let i: number = 0; i < this.type; i++) {
            position = new ShipPosition(this.orientation == ShipOrientation.Vertical ? this.x : this.x + i,
                this.orientation == ShipOrientation.Horizontal ? this.y : this.y + i);
            position.status = PositionStatus.ShipNoHit;
            positions.push(position);
        }

        return new Ship(this.type, positions);
    }
}

export class Position {
    x: number;
    y: number;

    constructor(x: number, y: number) {
        this.x = x; this.y = y;
    }

}

export class ShipPosition extends Position {
    status: PositionStatus;

    constructor(x: number, y: number) {
        super(x, y);
        this.status = PositionStatus.NoShip;
    }
}

export enum PositionStatus {
    NoShip = 0,
    ShipNoHit = 1,
    ShipHit = 2
}

export enum ShipType {
    Patrol = 2,
    Destroyer = 3,
    Submarine = 3,
    Battleship = 4,
    Carrier = 5
}
export enum ShipOrientation {
    Horizontal = 0,
    Vertical = 1
}
