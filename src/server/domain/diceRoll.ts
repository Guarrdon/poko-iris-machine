import Utilities from './utility';

export default class DiceRoll {

    die1: number
    die2: number
    get isDoubles(): boolean {
        if (this.die1 == null || this.die1 == 0 || this.die2 == null || this.die2 == 0)
            return false
        return this.die1 === this.die2
    }
    get total(): number {
        if (this.die1 == null || this.die1 == 0 || this.die2 == null || this.die2 == 0)
            return 0
        return this.die1 + this.die2
    }


    constructor() {
        this.die1 = Utilities.randomIntFromInterval(1, 6)
        this.die2 = Utilities.randomIntFromInterval(1, 6)
    }

}