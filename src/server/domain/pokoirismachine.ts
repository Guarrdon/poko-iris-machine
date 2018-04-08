import * as Errors from '../errors/errors'

import GameSetup from './gameSetup'
import Player from './player'

export enum GameMode {
    RequiresGameSetup = 0,
    RequiresPlayerSetup,
    ReadyToStartGamePlay,
    GameInProcess,
    GameCompleted
}

export class PokoIrisMachine {

    gameToken: string
    setup: GameSetup
    gameMode: GameMode

    players: Player[]

    currentRound: number
    currentPlayer: Player



    constructor(identifier: string, gameSetup: GameSetup) {
        this.gameMode = GameMode.RequiresGameSetup
    }


    public SetupPlayer(playerId:string, name: string, resource: string): void {
        if (playerId==null || name == null || resource == null)
            throw new Errors.InvalidPlayerSetupArguments()
        if (this.gameMode!=GameMode.RequiresPlayerSetup && this.gameMode != GameMode.ReadyToStartGamePlay)
            throw new Errors.InvalidGameOperation(this.gameMode)
        
        const player = this.players.find(x => x.id === playerId)
        if (player==null)
            throw new Errors.InvalidPlayerSetupArguments

    }






    public static GetGame(token: string): PokoIrisMachine {
        //get game, if null throw invalid game error
        if (false)
            throw new Errors.InvalidGame();

        //todo: fix this...pull from cached/pesistent state
        return null;
    }
}