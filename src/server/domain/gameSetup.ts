
import * as Errors from '../errors/errors';

import Player from './player'
import Resource from './resource'

export default class GameSetup {

    gameToken: string

    numberOfPlayers: number
    numberOfRounds: number

    allResources: Resource[]

    constructor(token: string, numPlayers: number, numRounds: number) {
        this.gameToken = token
        this.numberOfPlayers = numPlayers
        this.numberOfRounds = numRounds
        this.allResources = new Array<Resource>()
    }


}

