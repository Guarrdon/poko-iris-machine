export class InitBoardSizeError extends Error {
    constructor() {
        super('Board size must be a positive integer greater than or equal to 5 (the largest ship) and be a minimum size of the user defined required ships option.'); 
        Object.setPrototypeOf(this, new.target.prototype); // restore prototype chain * see note
    }
}

export class InitBoardRequiredShipsError extends Error {
    constructor() {
        super('Number of ships must be greater than 0.'); 
        Object.setPrototypeOf(this, new.target.prototype); // restore prototype chain * see note
    }
}

//refer to https://www.typescriptlang.org/docs/handbook/release-notes/typescript-2-2.html