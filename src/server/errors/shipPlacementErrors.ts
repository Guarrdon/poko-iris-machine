export class ShipPlacementError extends Error {
    constructor() {
        super('Ship cannot be placed where it would fall outside the boundaries of the board.'); 
        Object.setPrototypeOf(this, new.target.prototype); // restore prototype chain * see note
    }
}
export class ShipOverlapError extends Error {
    constructor() {
        super('Ship cannot be placed on top of other ships.'); 
        Object.setPrototypeOf(this, new.target.prototype); // restore prototype chain * see note
    }
}
//refer to https://www.typescriptlang.org/docs/handbook/release-notes/typescript-2-2.html