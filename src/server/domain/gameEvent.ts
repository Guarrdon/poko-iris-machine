import uuid from 'uuid-random';

import * as Errors from '../errors/errors';
import Utilities from './utility'
import GameDefaults from './gameDefaults'
import Resource from './resource'

export abstract class GameEvent {

    id: string
    protected eventDescription: string

    protected supplyMin: number
    protected supplyMax: number
    protected priceMin: number
    protected priceMax: number

    playerSupplyChanges: Array<number>
    resourcePriceChanges: Array<number>

    constructor(description: string, supplyChangeMin: number, supplyChangeMax: number, priceChangeMin: number, priceChangeMax: number) {
        this.eventDescription = description
        this.id = uuid();
        this.supplyMin = supplyChangeMin
        this.supplyMax = supplyChangeMax
        this.priceMin = priceChangeMin
        this.priceMax = priceChangeMax

        this.playerSupplyChanges = new Array<number>()
        this.resourcePriceChanges = new Array<number>()
    }

    public abstract AssignChanges(stdSupplyIncrease: number): void ;

    public GetEventDescription(resourceList: Resource[] = null) {
        let output = this.eventDescription
        if (resourceList != null)
            for (let x: number = 0; x < resourceList.length; x++)
                output = output.replace("{" + x + "}", resourceList[x].name.toUpperCase())

        return output;
    }
}

///Passive event affects nothing; just descriptive
export class PassiveEvent extends GameEvent {

    constructor(description: string) {
        super(description, 0, 0, 0, 0)
    }
    public AssignChanges(stdSupplyIncrease: number): void {
        //do nothing - passive events can't effect change
    }
}

///Market event can affect price and supply of all resources
export class MarketEvent extends GameEvent {

    constructor(description: string, supplyChangeMin: number, supplyChangeMax: number, priceChangeMin: number, priceChangeMax: number) {
        super(description, supplyChangeMin, supplyChangeMax, priceChangeMin, priceChangeMax)
    }

    public AssignChanges(stdSupplyIncrease: number): void {
        for (let x: number = 0; x < GameDefaults.MaxPlayers; x++) {
            this.playerSupplyChanges.push(Utilities.randomIntFromInterval(this.supplyMin, this.supplyMax))
            this.resourcePriceChanges.push(Utilities.randomIntFromInterval(this.priceMin, this.priceMax))
        }
        this.playerSupplyChanges[0] = stdSupplyIncrease + this.playerSupplyChanges[0]
    }

}

///Partnership event can affect price and supply of two resources
export class PartnershipEvent extends GameEvent {

    constructor(description: string, supplyChangeMin: number, supplyChangeMax: number, priceChangeMin: number, priceChangeMax: number) {
        super(description, supplyChangeMin, supplyChangeMax, priceChangeMin, priceChangeMax)
    }

    public AssignChanges(stdSupplyIncrease: number): void {
        for (let x: number = 0; x < 2; x++) {
            this.playerSupplyChanges.push(Utilities.randomIntFromInterval(this.supplyMin, this.supplyMax))
            this.resourcePriceChanges.push(Utilities.randomIntFromInterval(this.priceMin, this.priceMax))
        }
        this.playerSupplyChanges[0] = stdSupplyIncrease + this.playerSupplyChanges[0]
    }
}

///Resource event can affect price and supply of a single resource
export class ResourceEvent extends GameEvent {

    constructor(description: string, supplyChangeMin: number, supplyChangeMax: number, priceChangeMin: number, priceChangeMax: number) {
        super(description, supplyChangeMin, supplyChangeMax, priceChangeMin, priceChangeMax)
    }

    public AssignChanges(stdSupplyIncrease: number): void {
        for (let x: number = 0; x < 1; x++) {
            this.playerSupplyChanges.push(Utilities.randomIntFromInterval(this.supplyMin, this.supplyMax))
            this.resourcePriceChanges.push(Utilities.randomIntFromInterval(this.priceMin, this.priceMax))
        }
        this.playerSupplyChanges[0] = stdSupplyIncrease + this.playerSupplyChanges[0]
    }
}

///Supply event can affect the supply of a single resource
export class SupplyEvent extends GameEvent {

    constructor(description: string, supplyChangeMin: number, supplyChangeMax: number) {
        super(description, supplyChangeMin, supplyChangeMax, 0, 0)
    }

    public AssignChanges(stdSupplyIncrease: number): void {
        for (let x: number = 0; x < 1; x++) {
            this.playerSupplyChanges.push(Utilities.randomIntFromInterval(this.supplyMin, this.supplyMax))
        }
        this.playerSupplyChanges[0] = stdSupplyIncrease + this.playerSupplyChanges[0]
    }
}

///Price event can affect the price of a single resource
export class PriceEvent extends GameEvent {

    constructor(description: string, priceChangeMin: number, priceChangeMax: number) {
        super(description, 0, 0, priceChangeMin, priceChangeMax)
    }

    public AssignChanges(stdSupplyIncrease: number): void {
        for (let x: number = 0; x < 1; x++) {
            this.resourcePriceChanges.push(Utilities.randomIntFromInterval(this.priceMin, this.priceMax))
        }
        this.playerSupplyChanges.push(stdSupplyIncrease);
    }
}


