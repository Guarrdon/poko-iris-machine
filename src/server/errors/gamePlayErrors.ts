export class PlayerDoesNotExist extends Error {
    constructor(id:string) {
        super(`Player with ${id} does not exist.`); 
        Object.setPrototypeOf(this, new.target.prototype); // restore prototype chain * see note
    }
}
//refer to https://www.typescriptlang.org/docs/handbook/release-notes/typescript-2-2.html

export class ResourceDoesNotExist extends Error {
    constructor(id:string) {
        super(`Resource with ${id} does not exist.`); 
        Object.setPrototypeOf(this, new.target.prototype); // restore prototype chain * see note
    }
}
//refer to https://www.typescriptlang.org/docs/handbook/release-notes/typescript-2-2.html

export class ResourceCanNotGoNegative extends Error {
    constructor() {
        super(`Resource quantity can't go below zero.`); 
        Object.setPrototypeOf(this, new.target.prototype); // restore prototype chain * see note
    }
}
//refer to https://www.typescriptlang.org/docs/handbook/release-notes/typescript-2-2.html

export class TransactionCanNotHaveNegativeComponents extends Error {
    constructor() {
        super(`Transaction components must be positive (>=1).`); 
        Object.setPrototypeOf(this, new.target.prototype); // restore prototype chain * see note
    }
}
//refer to https://www.typescriptlang.org/docs/handbook/release-notes/typescript-2-2.html
