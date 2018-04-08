export class InvalidGameSetupArguments extends Error {
    constructor() {
        super('Players (3-6) or rounds (2-20) were out of range.'); 
        Object.setPrototypeOf(this, new.target.prototype); // restore prototype chain * see note
    }
}
//refer to https://www.typescriptlang.org/docs/handbook/release-notes/typescript-2-2.html

export class InvalidPlayerSetupArguments extends Error {
    constructor() {
        super('PlayerId and ResourceId must be valid id string, Name cannot be null '); 
        Object.setPrototypeOf(this, new.target.prototype); // restore prototype chain * see note
    }
}
//refer to https://www.typescriptlang.org/docs/handbook/release-notes/typescript-2-2.html