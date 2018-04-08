import uuid from 'uuid-random';

import * as Errors from '../errors/errors';

import Player from './player'
import Resource from './resource'
import PokoIrisMachine from './pokoirismachineGame'
import GameDefaults from './gameDefaults'

export default class GameSetup {

    gameToken: string

    numberOfPlayers: number
    numberOfRounds: number

    allResources: Resource[]

    constructor(numPlayers: number, numRounds: number) {
        this.numberOfPlayers = numPlayers
        this.numberOfRounds = numRounds
    }

    public ConfigureNewGame(): string {
        if (this.numberOfPlayers < GameDefaults.MinPlayers || this.numberOfPlayers > GameDefaults.MaxPlayers)
            throw new Errors.InvalidGameStartupArguments();
        if (this.numberOfRounds < GameDefaults.MinRounds || this.numberOfRounds > GameDefaults.MaxRounds)
            throw new Errors.InvalidGameStartupArguments();

        //todo: get resource
        //todo: cache game

        var id = uuid()
        this.gameToken = id;
        var pim =  new PokoIrisMachine(id, this)
        return id
    }
}

