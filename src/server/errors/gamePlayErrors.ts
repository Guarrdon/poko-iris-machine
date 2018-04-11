export class PlayerDoesNotExist extends Error {
    constructor(id:string) {
        super(`Player with ${id} does not exist.`); 
        Object.setPrototypeOf(this, new.target.prototype); // restore prototype chain * see note
    }
}
//refer to https://www.typescriptlang.org/docs/handbook/release-notes/typescript-2-2.html

