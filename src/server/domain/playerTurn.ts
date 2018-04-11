import DiceRoll from './diceRoll';
import { GameEvent } from './gameEvent';
import Player from './player';

export default class PlayerTurn {

    roll: DiceRoll
    event: GameEvent
    player: Player

    constructor(player:Player, playerRoll: DiceRoll, playerEvent:GameEvent) {
        this.player = player
        this.roll = playerRoll
        this.event = playerEvent
    }

}