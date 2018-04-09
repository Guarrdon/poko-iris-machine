
import * as Errors from '../errors/errors';

import Player from './player'
import Resource from './resource'
import * as GameEvents from './gameEvent';

export default class GameSetup {

    gameToken: string

    numberOfPlayers: number
    numberOfRounds: number

    allResources: Resource[]

    constructor(token: string, numPlayers: number, numRounds: number) {
        this.gameToken = token
        this.numberOfPlayers = numPlayers
        this.numberOfRounds = numRounds

        this.allResources = this.SetupResources()
    }

    private SetupResources(): Array<Resource> {
        const resources = new Array<Resource>()
        resources.push(new Resource("Gold"))
        resources.push(new Resource("Diamonds"))
        resources.push(new Resource("Platinum"))
        resources.push(new Resource("Silver"))
        resources.push(new Resource("Bronze"))
        resources.push(new Resource("Lyonsanium"))
        resources.push(new Resource("Titanium"))
        resources.push(new Resource("Tin"))
        resources.push(new Resource("Copper"))
        resources.push(new Resource("Steel"))
        resources.push(new Resource("Wood"))
        return resources
    }
    private SetupEvents(): Array<GameEvents.GameEvent> {
        const events = new Array<GameEvents.GameEvent>()
        //events.push(new GameEvents.PassiveEvent("Market welcomes new suppliers from around the world!")) //will be used for startup
        
        events.push(new GameEvents.MarketEvent("Eco-distaster = World turbulence. Markets tumble.", 0, 0, -3, -1))
        events.push(new GameEvents.MarketEvent("Olympic time. Prices begin to rise in most markets.", 0, 0, 0, 3))
        events.push(new GameEvents.MarketEvent("Government bailout. Prices fall in most markets.", 0, 0, -3, 0))
        events.push(new GameEvents.MarketEvent("Terrism irradicated. World markets experience a gain.", 0, 0, 1, 3))
        
        events.push(new GameEvents.PartnershipEvent("Partnership formed between {0} and {1} resulting in enhanced production.", 0, 2, 0, 1))
        events.push(new GameEvents.PartnershipEvent("Alliance folds between {0} and {1}. Prices collapse.", 0, 0, -3, 0))
        events.push(new GameEvents.PartnershipEvent("New technology enables higher production for {0} and {1}. Supply increases.", 1, 4, 0, 0))
        events.push(new GameEvents.PartnershipEvent("Poor relationship between {0} and {1}. Prices plummet.", 0, 0, -4, -1))
        
        events.push(new GameEvents.ResourceEvent("Market for {0} is drying up. Supply increases, but prices decrease.", 1, 3, -3, -1))
        events.push(new GameEvents.ResourceEvent("{0} introduced to zero-gravity production. Supply and prices go up.", 1, 2, 1, 2))
        events.push(new GameEvents.PriceEvent("Largest owner of {0} passes away. Markets mourn.", -4, -1))
        events.push(new GameEvents.PriceEvent("{0} mining techniques flourish. Prices skyrocket.", 1, 5))
        events.push(new GameEvents.SupplyEvent("New mine for {0} discovered. Supply increases.", 1, 3))
        events.push(new GameEvents.SupplyEvent("Strikes against {0} are taking place. Supply is lost.", -3, -1))

        return events
    }


}

