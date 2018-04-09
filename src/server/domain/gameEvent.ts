import uuid from 'uuid-random';

import * as Errors from '../errors/errors';
import Utilities from './utility'
import GameDefaults from './gameDefaults'

export abstract class GameEvent {

    id: string
    protected eventDescription: string

    protected supplyMin: number
    protected supplyMax: number
    protected priceMin: number
    protected priceMax: number

    playerSupplyChanges: Array<Number>
    resourcePriceChanges: Array<Number>

    constructor(description: string, supplyChangeMin: number, supplyChangeMax: number, priceChangeMin: number, priceChangeMax: number) {
        this.eventDescription = description
        this.id = uuid();
        this.supplyMin = supplyChangeMin
        this.supplyMax = supplyChangeMax
        this.priceMin = priceChangeMin
        this.priceMax = priceChangeMax

        this.playerSupplyChanges = new Array<Number>()
        this.resourcePriceChanges = new Array<Number>()

        this.AssignChanges()
    }

    protected abstract AssignChanges(): void

    public GetEventDescription(...args){
        return this.eventDescription;
    }
}

///Passive event affects nothing; just descriptive
export class PassiveEvent extends GameEvent {

    constructor(description: string) {
        super(description, 0, 0, 0, 0)
    }

    protected AssignChanges(): void {
        //no changes for a passive event
    }

}

///Market event can affect price and supply of all resources
export class MarketEvent extends GameEvent {

    constructor(description: string, supplyChangeMin: number, supplyChangeMax: number, priceChangeMin: number, priceChangeMax: number) {
        super(description, supplyChangeMin, supplyChangeMax, priceChangeMin, priceChangeMax)
    }

    protected AssignChanges(): void {
        for (let x: number = 0; x < GameDefaults.MaxPlayers; x++) {
            this.playerSupplyChanges.push(Utilities.randomIntFromInterval(this.supplyMin, this.supplyMax))
            this.resourcePriceChanges.push(Utilities.randomIntFromInterval(this.priceMin, this.priceMax))
        }
    }

}

///Partnership event can affect price and supply of two resources
export class PartnershipEvent extends GameEvent {

    constructor(description: string, supplyChangeMin: number, supplyChangeMax: number, priceChangeMin: number, priceChangeMax: number) {
        super(description, supplyChangeMin, supplyChangeMax, priceChangeMin, priceChangeMax)
    }

    protected AssignChanges(): void {
        for (let x: number = 0; x < 2; x++) {
            this.playerSupplyChanges.push(Utilities.randomIntFromInterval(this.supplyMin, this.supplyMax))
            this.resourcePriceChanges.push(Utilities.randomIntFromInterval(this.priceMin, this.priceMax))
        }
    }
}

///Resource event can affect price and supply of a single resource
export class ResourceEvent extends GameEvent {

    constructor(description: string, supplyChangeMin: number, supplyChangeMax: number, priceChangeMin: number, priceChangeMax: number) {
        super(description, supplyChangeMin, supplyChangeMax, priceChangeMin, priceChangeMax)
    }

    protected AssignChanges(): void {
        for (let x: number = 0; x < 1; x++) {
            this.playerSupplyChanges.push(Utilities.randomIntFromInterval(this.supplyMin, this.supplyMax))
            this.resourcePriceChanges.push(Utilities.randomIntFromInterval(this.priceMin, this.priceMax))
        }
    }
}

///Supply event can affect the supply of a single resource
export class SupplyEvent extends GameEvent {

    constructor(description: string, supplyChangeMin: number, supplyChangeMax: number) {
        super(description, supplyChangeMin, supplyChangeMax, 0, 0)
    }

    protected AssignChanges(): void {

        for (let x: number = 0; x < 1; x++) {
            this.resourcePriceChanges.push(Utilities.randomIntFromInterval(this.priceMin, this.priceMax))
        }
    }
}

///Price event can affect the price of a single resource
export class PriceEvent extends GameEvent {

    constructor(description: string, priceChangeMin: number, priceChangeMax: number) {
        super(description, 0, 0, priceChangeMin, priceChangeMax)
    }

    protected AssignChanges(): void {

        for (let x: number = 0; x < 1; x++) {
            this.resourcePriceChanges.push(Utilities.randomIntFromInterval(this.priceMin, this.priceMax))
        }
    }
}


