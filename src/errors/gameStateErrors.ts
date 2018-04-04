export class InvalidActionForGameStateError extends Error {
    constructor() {
        super('Action cannot be performed which in this game state.'); 
        Object.setPrototypeOf(this, new.target.prototype); // restore prototype chain * see note
    }
}

//refer to https://www.typescriptlang.org/docs/handbook/release-notes/typescript-2-2.html