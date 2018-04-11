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

        test('Dice return doubles', () => {
            const dice = new DiceRoll
            dice.die1 = 1
            dice.die2 = 4
            expect(dice).not.toBeNull()
            expect(dice.isDoubles).toBe(false)
            dice.die1=6
            dice.die2=6
            expect(dice.isDoubles).toBe(true)
        })

    })

    describe('Test shuffle of players for events', () => {
        test('Shuffles maintain first player', () => {
            const result = context.ShufflePlayersExceptFirst(6, 2)
            expect(result).not.toBeNull
            expect(result[0]==2)
        })
        test('Shuffles are unique (mostly)', () => {
            const result1 = context.ShufflePlayersExceptFirst(6, 2)
            const result2 = context.ShufflePlayersExceptFirst(6, 2)
            const result3 = context.ShufflePlayersExceptFirst(6, 2)
           

            //while they all COULD theoretically match, it is very unlikely
            expect((result1.toString()!=result2.toString()) && (result1.toString()!=result3.toString())).toBe(true)
        })

    })



})