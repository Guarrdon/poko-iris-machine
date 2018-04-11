import uuid from 'uuid-random';

import * as Errors from '../errors/errors'
import GameSetup from './gameSetup'
import Player from './player'
import GameDefaults from './gameDefaults'
import * as GameEvents from './gameEvent';
import PlayerTurn from './playerTurn';
import DiceRoll from './diceRoll';
import Utility from './utility';

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
        this.currentPlayer = 0
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

    private ValidateAllPlayersSet(): boolean {
        if (this.players.length != this.setup.numberOfPlayers)
            return false;
        return this.players.every(x => x.name != null && x.primaryResource != null)
    }

    ///
    public BeginGame(): GameEvents.GameEvent {
        if (this.gameMode != GameMode.ReadyToStartGamePlay)
            throw new Errors.InvalidGameOperation(this.gameMode)

        const chosenResources = this.players.map(x => x.primaryResource)
        for (let player of this.players) {
            player.CreateAssetLedger(chosenResources)
            player.assets[0].quantity = GameDefaults.StartingResourceQuantity
        }

        this.gameMode = GameMode.GameInProcess
        const introEvent = new GameEvents.PassiveEvent("Poko-Iris-Machine introduces some new resources to the market.  Which one will be the most valuable?")
        return introEvent;
    }

    ///
    public BeginPlayerTurn(playerId: string): PlayerTurn {
        if (this.gameMode != GameMode.GameInProcess)
            throw new Errors.InvalidGameOperation(this.gameMode)
        //todo: make sure correct player turn is occuring

        //player
        const player = this.players.find(x => x.id == playerId)
        if (player == null)
            throw new Errors.PlayerDoesNotExist(playerId)

        //randomized list of players
        //todo:fix currentplayer logic
        var shuffledPlayers = this.ShufflePlayersExceptFirst(this.setup.numberOfPlayers, this.currentPlayer)
        console.log(shuffledPlayers)

        //dice roll
        const roll = new DiceRoll()

        //event
        const eventId = Utility.randomIntFromInterval(roll.isDoubles ? this.setup.allEvents.length / 2 : 0, this.setup.allEvents.length - 1)
        const event = this.setup.allEvents[eventId]
        const standardSupplyIncrease = roll.isDoubles ? 2 : 0 + Math.ceil(roll.total / 4)
        event.AssignChanges(standardSupplyIncrease)

        //apply event changes to player ledgers
        for (let x: number = 0; x < this.setup.numberOfPlayers && x < event.playerSupplyChanges.length; x++) {
            const playerIndex = shuffledPlayers[x]
            const asset = this.players[playerIndex].assets[0]
            asset.quantity += event.playerSupplyChanges[x]
            //special rule - cannot drop below 1
            if (asset.quantity < 1)
                asset.quantity - 1
        }

        //rotate to next player
        //todo: not yet...need to do this on player finish turn
        this.currentPlayer++
        if (this.currentPlayer > this.setup.numberOfPlayers - 1)
            this.currentPlayer == 0
        //
        return new PlayerTurn(player, roll, event);
    }

    public ShufflePlayersExceptFirst(maxPlayers: number, firstPlayer: number): Array<number> {
        const ordered = new Array<number>()
        const shuffled = new Array<number>()
        shuffled.push(firstPlayer)
        for (let x: number = 0; x < maxPlayers; x++) {
            if (x != firstPlayer)
                ordered.push(x)
        }
        for (let x: number = maxPlayers - 2; x >= 0; x--) {
            var rand = Utility.randomIntFromInterval(0, x)
            var val = ordered.splice(rand, 1)
            shuffled.push(val[0])
        }
        return shuffled
    }


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