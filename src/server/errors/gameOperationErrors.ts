import { GameMode } from '../domain/pokoirismachineGame'


export class InvalidGameOperation extends Error {
    constructor(currentMode:GameMode) {
        super(`Operation cannot be performed while the game is in ${currentMode}.`); 
        Object.setPrototypeOf(this, new.target.prototype); // restore prototype chain * see note
    }
}
//refer to https://www.typescriptlang.org/docs/handbook/release-notes/typescript-2-2.html