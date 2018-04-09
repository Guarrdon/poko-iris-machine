import uuid from 'uuid-random';

import * as Errors from '../src/server/errors/errors';
import GameSetup from '../src/server/domain/gameSetup';
import { PokoIrisMachine } from '../src/server/domain/pokoirismachine';
import GameDefaults from '../src/server/domain/gameDefaults'
import Resource from '../src/server/domain/resource'

describe('Game Setup API', () => {

    let context: PokoIrisMachine
    // Applies to all tests in this file
    beforeEach(() => {
        const setup = PokoIrisMachine.ConfigureNewGame(3, 12)
        setup.allResources.push({ id: "111", name: "Gold" })
        setup.allResources.push({ id: "222", name: "Silver" })
        setup.allResources.push({ id: "333", name: "Bronze" })
        
        context = PokoIrisMachine.GetGame(setup.gameToken)
    });


    describe('Successful player setup', () => {
        test('Player successfully configured', () => {
            const playerId = context.SetupPlayer("PlayerName", "222")
            const player = context.players.find(x=> x.id==playerId)
            expect(player).not.toBeNull()
            expect(player.name).toBe("PlayerName")
            expect(player.primaryResource).not.toBeNull()
            expect(player.primaryResource.name).toBe("Silver")
        })
    })

    describe('Invalid player setup', () => {
        test('Player name invalid (null)', () => {
            expect(() => context.SetupPlayer(null, "222")).toThrowError(Errors.InvalidPlayerSetupArguments);
        })
        test('Player name invalid (empty)', () => {
            expect(() => context.SetupPlayer("", "222")).toThrowError(Errors.InvalidPlayerSetupArguments);
        })
        test('Player name is duplicate', () => {
            const playerId = context.SetupPlayer("PlayerName", "222")
            expect(() => context.SetupPlayer("PlayerName", "111")).toThrowError(Errors.PlayerAlreadyExists);
        })

        test('Player resource invalid (null)', () => {
            expect(() => context.SetupPlayer("", null)).toThrowError(Errors.InvalidPlayerSetupArguments);
        })
        test('Player resource invalid', () => {
            expect(() => context.SetupPlayer("", "001")).toThrowError(Errors.InvalidPlayerSetupArguments);
        })
    })


})