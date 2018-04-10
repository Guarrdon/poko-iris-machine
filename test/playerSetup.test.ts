import uuid from 'uuid-random';

import * as Errors from '../src/server/errors/errors';
import GameSetup from '../src/server/domain/gameSetup';
import { PokoIrisMachine, GameMode } from '../src/server/domain/pokoirismachine';
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

    describe('Ready to play game', () => {
        test('All players setup', () => {
            const player1 = context.SetupPlayer("Alpha", "111")
            const player2 = context.SetupPlayer("Beta", "222")
            const player3 = context.SetupPlayer("Charlie", "333")
            expect(context).not.toBeNull()
            expect(context.gameMode).toBe(GameMode.ReadyToStartGamePlay)
        })
        test('Successful begin game', () => {
            const player1 = context.SetupPlayer("Alpha", "111")
            const player2 = context.SetupPlayer("Beta", "222")
            const player3 = context.SetupPlayer("Charlie", "333")
            const event = context.BeginGame()
            expect(context).not.toBeNull()
            expect(context.gameMode).toBe(GameMode.GameInProcess)
        })
        test('Unsuccessful begin game (not enough players)', () => {
            const player1 = context.SetupPlayer("Alpha", "111")
            expect(() => context.BeginGame()).toThrowError(Errors.InvalidGameOperation);
        })

    })


})