import uuid from 'uuid-random';

import * as Errors from '../src/server/errors/errors';
import GameSetup from '../src/server/domain/gameSetup';
import { PokoIrisMachine, GameMode } from '../src/server/domain/pokoirismachine';
import GameDefaults from '../src/server/domain/gameDefaults'
import Resource from '../src/server/domain/resource'
import DiceRoll from '../src/server/domain/diceRoll';

describe('Game Play API', () => {

    let context: PokoIrisMachine
    // Applies to all tests in this file
    beforeEach(() => {
        const setup = PokoIrisMachine.ConfigureNewGame(3, 12)
        context = PokoIrisMachine.GetGame(setup.gameToken)
    });


    describe('Successful player turn', () => {
        test('Player starts their turn', () => {
            const player1 = context.SetupPlayer("Alpha", context.setup.allResources[0].id)
            const player2 = context.SetupPlayer("Beta", context.setup.allResources[1].id)
            const player3 = context.SetupPlayer("Charlie", context.setup.allResources[2].id)
            context.BeginGame()
            var playerTurn = context.BeginPlayerTurn(player1)

            expect(playerTurn).not.toBeNull()
            expect(playerTurn.player.name).toBe("Alpha")
            expect(playerTurn.event).not.toBeNull()
            expect(playerTurn.roll).not.toBeNull()
            expect(playerTurn.roll.die1).toBeGreaterThanOrEqual(1)
            expect(playerTurn.roll.die2).toBeGreaterThanOrEqual(1)
            expect(playerTurn.roll.die1).toBeLessThanOrEqual(6)
            expect(playerTurn.roll.die2).toBeLessThanOrEqual(6)
        })

        test('Player negotiates and finishes their turn', () => {
            const player1Id = context.SetupPlayer("Alpha", context.setup.allResources[0].id)
            const player2Id = context.SetupPlayer("Beta", context.setup.allResources[1].id)
            const player3Id = context.SetupPlayer("Charlie", context.setup.allResources[2].id)
            context.BeginGame()
            
            //don't need to test this
            //var playerTurn = context.BeginPlayerTurn(player1Id)
            const player1 = context.GetPlayer(player1Id)
            const player2 = context.GetPlayer(player2Id)
            expect(player1).not.toBeNull()
            expect(player2).not.toBeNull()

            expect(player1.GetPrimaryAssetQuantity()).toBe(GameDefaults.StartingResourceQuantity)
            expect(player2.GetPrimaryAssetQuantity()).toBe(GameDefaults.StartingResourceQuantity)
            expect(player1.GetAssetQuantity(player2.primaryResource.id)).toBe(0)
            expect(player2.GetAssetQuantity(player1.primaryResource.id)).toBe(0)

            context.ConcludePlayerTurn(player2Id, 2, 3, false)

            expect(player1.GetPrimaryAssetQuantity()).toBe(GameDefaults.StartingResourceQuantity - 3)
            expect(player2.GetPrimaryAssetQuantity()).toBe(GameDefaults.StartingResourceQuantity - 2)
            expect(player1.GetAssetQuantity(player2.primaryResource.id)).toBe(2)
            expect(player2.GetAssetQuantity(player1.primaryResource.id)).toBe(3)
        })

        test('Player rejects and finishes their turn', () => {
            const player1Id = context.SetupPlayer("Alpha", context.setup.allResources[0].id)
            const player2Id = context.SetupPlayer("Beta", context.setup.allResources[1].id)
            const player3Id = context.SetupPlayer("Charlie", context.setup.allResources[2].id)
            context.BeginGame()
            
            //don't need to test this
            //var playerTurn = context.BeginPlayerTurn(player1Id)
            const player1 = context.GetPlayer(player1Id)
            const player2 = context.GetPlayer(player2Id)
            expect(player1).not.toBeNull()
            expect(player2).not.toBeNull()

            expect(player1.GetPrimaryAssetQuantity()).toBe(GameDefaults.StartingResourceQuantity)
            expect(player2.GetPrimaryAssetQuantity()).toBe(GameDefaults.StartingResourceQuantity)
            expect(player1.GetAssetQuantity(player2.primaryResource.id)).toBe(0)
            expect(player2.GetAssetQuantity(player1.primaryResource.id)).toBe(0)

            context.ConcludePlayerTurn(player2Id, 2, 3, true)

            expect(player1.GetPrimaryAssetQuantity()).toBe(GameDefaults.StartingResourceQuantity)
            expect(player2.GetPrimaryAssetQuantity()).toBe(GameDefaults.StartingResourceQuantity)
            expect(player1.GetAssetQuantity(player2.primaryResource.id)).toBe(0)
            expect(player2.GetAssetQuantity(player1.primaryResource.id)).toBe(0)
        })


        test('Dice return doubles', () => {
            const dice = new DiceRoll
            dice.die1 = 1
            dice.die2 = 4
            expect(dice).not.toBeNull()
            expect(dice.isDoubles).toBe(false)
            dice.die1 = 6
            dice.die2 = 6
            expect(dice.isDoubles).toBe(true)
        })

    })

    describe('Unsuccessful player turn', () => {
        test('Negotiation with invalid components (negative or zero numbers)', () => {
            const player1Id = context.SetupPlayer("Alpha", context.setup.allResources[0].id)
            const player2Id = context.SetupPlayer("Beta", context.setup.allResources[1].id)
            const player3Id = context.SetupPlayer("Charlie", context.setup.allResources[2].id)
            context.BeginGame()
            
            //don't need to test this
            //var playerTurn = context.BeginPlayerTurn(player1Id)
            const player1 = context.GetPlayer(player1Id)
            const player2 = context.GetPlayer(player2Id)
            expect(player1).not.toBeNull()
            expect(player2).not.toBeNull()

            expect(player1.GetPrimaryAssetQuantity()).toBe(GameDefaults.StartingResourceQuantity)
            expect(player2.GetPrimaryAssetQuantity()).toBe(GameDefaults.StartingResourceQuantity)
            expect(player1.GetAssetQuantity(player2.primaryResource.id)).toBe(0)
            expect(player2.GetAssetQuantity(player1.primaryResource.id)).toBe(0)

            expect(() => context.ConcludePlayerTurn(player2Id, -2, 0, false)).toThrowError(Errors.TransactionCanNotHaveNegativeComponents);
        })
       

    })


    describe('Test shuffle of players for events', () => {
        test('Shuffles maintain first player', () => {
            const result = context.ShufflePlayersExceptFirst(6, 2)
            expect(result).not.toBeNull
            expect(result[0] == 2)
        })
        test('Shuffles are unique (mostly)', () => {
            const result1 = context.ShufflePlayersExceptFirst(6, 2)
            const result2 = context.ShufflePlayersExceptFirst(6, 2)
            const result3 = context.ShufflePlayersExceptFirst(6, 2)


            //while they all COULD theoretically match, it is very unlikely
            expect((result1.toString() != result2.toString()) && (result1.toString() != result3.toString())).toBe(true)
        })

    })



})