import GameSetup from './gameSetup'
import Player from './player'

export enum GameMode {
    RequiresGameSetup=0,
    RequiresPlayerSetup,
    ReadyToStartGamePlay,
    GameInProcess,
    GameCompleted
}

export class PokoIrisMachine {

    gameToken:string
    setup: GameSetup
    gameMode:GameMode

    currentRound:number
    currentPlayer:Player
    
    
    
    constructor(identifier:string, gameSetup:GameSetup) { 
        this.gameMode = GameMode.RequiresGameSetup
    }

    
}