export class InvalidGameStartupArguments extends Error {
    constructor() {
        super('Players (3-6) or rounds (2-20) were out of range.'); 
        Object.setPrototypeOf(this, new.target.prototype); // restore prototype chain * see note
    }
}
//refer to https://www.typescriptlang.org/docs/handbook/release-notes/typescript-2-2.html