export class ShotPlacementError extends Error {
    constructor() {
        super('Fired shot cannot be fall outside the boundaries of the board.'); 
        Object.setPrototypeOf(this, new.target.prototype); // restore prototype chain * see note
    }
}

//refer to https://www.typescriptlang.org/docs/handbook/release-notes/typescript-2-2.html