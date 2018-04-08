import GameSetup from './gameSetup'
import Player from './player'


export default class PokoIrisMachineGame {

    id:string
    setup: GameSetup

    currentRound:number
    currentPlayer:Player
    
    
    
    constructor(identifier:string, gameSetup:GameSetup) { }

    
}