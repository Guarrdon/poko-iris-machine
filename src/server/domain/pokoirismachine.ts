import uuid from 'uuid-random';

import * as Errors from '../errors/errors'
import GameSetup from './gameSetup'
import Player from './player'
import GameDefaults from './gameDefaults'
import * as GameEvents from './gameEvent';

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
    currentPlayer: number



    protected constructor(identifier: string, gameSetup: GameSetup) {
        this.gameMode = GameMode.RequiresGameSetup
        this.setup = gameSetup
        this.gameToken = identifier
        this.players = new Array<Player>()
    }


    ///
    public SetupPlayer(name: string, resourceId: string): string {
        if (name == null || name == "" || resourceId == null)
            throw new Errors.InvalidPlayerSetupArguments()
        if (this.gameMode != GameMode.RequiresPlayerSetup && this.gameMode != GameMode.ReadyToStartGamePlay)
            throw new Errors.InvalidGameOperation(this.gameMode)

        let player = this.players.find(x => x.name == name)
        if (player != null)
            throw new Errors.PlayerAlreadyExists(name)

        player = new Player();
        player.name = name;

        const resource = this.setup.allResources.find(x => x.id == resourceId)
        if (resource == null)
            throw new Errors.InvalidPlayerSetupArguments()

        player.primaryResource = resource;
        this.players.push(player)

        if (this.ValidateAllPlayersSet())
            this.gameMode = GameMode.ReadyToStartGamePlay

        return player.id
    }

    private ValidateAllPlayersSet():boolean{
        if (this.players.length!=this.setup.numberOfPlayers)
            return false;
        return this.players.every(x=> x.name!=null && x.primaryResource!=null)
    }

    ///
    public BeginGame(): GameEvents.GameEvent {
        if (this.gameMode != GameMode.ReadyToStartGamePlay)
            throw new Errors.InvalidGameOperation(this.gameMode)

        this.gameMode = GameMode.GameInProcess
        const introEvent = new GameEvents.PassiveEvent("Poko-Iris-Machine introduces some new resources to the market.  Which one will be the most valuable?")
        return introEvent;
    }

    ///




    //Static Methods-------

    ///
    public static ConfigureNewGame(numberOfPlayers: number, numberOfRounds: number): GameSetup {
        if (numberOfPlayers < GameDefaults.MinPlayers || numberOfPlayers > GameDefaults.MaxPlayers)
            throw new Errors.InvalidGameSetupArguments();
        if (numberOfRounds < GameDefaults.MinRounds || numberOfRounds > GameDefaults.MaxRounds)
            throw new Errors.InvalidGameSetupArguments();

        //todo: get resource
        //todo: cache game

        const token = uuid();
        const gameSetup = new GameSetup(token, numberOfPlayers, numberOfRounds)
        const pim = new PokoIrisMachine(token, gameSetup)

        //temporarily assign to static var
        PokoIrisMachine.temp = pim

        //set next game mode
        pim.gameMode = GameMode.RequiresPlayerSetup

        return gameSetup
    }

    static temp: PokoIrisMachine
    ///
    public static GetGame(token: string): PokoIrisMachine {
        //get game, if null throw invalid game error
        if (PokoIrisMachine.temp.gameToken != token)
            throw new Errors.InvalidGame();

        //todo: fix this...pull from cached/pesistent state
        return PokoIrisMachine.temp;
    }
}