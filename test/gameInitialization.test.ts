import * as Game from '../src/domain/battleship';
import { GameState } from '../src/domain/summary';
import * as Errors from '../src/errors/errors';

describe('Game Initialization API', () => {

  describe('Valid Init Tests', () => {
    const battleship = new Game.BattleShip();
    battleship.Init(10, 5);
    
    test('Size matches initialization', () => {
      expect(battleship.size).toBe(10);
    });
    test('Required ships matches initialization', () => {
      expect(battleship.shipsRequired).toBe(5);
    });
    test('Proper state after initialization', () => {
      expect(battleship.summary.state).toBe(GameState.NeedsUserShips);
    });
    test('Computer ships created on Init()', () => {
      expect(battleship.computerBoard.ships.length).toBe(5);
    });
    test('Player ships created on Init()', () => {
      expect(battleship.playerBoard.ships.length).toBe(0);
    });
  });

  describe('Game Reset Tests', () => {
    const battleship = new Game.BattleShip();
    battleship.Reset();

    test('Size matches initialization', () => {
      expect(battleship.size).toBe(0);
    });
    test('Required ships matches initialization', () => {
      expect(battleship.shipsRequired).toBe(0);
    });
    test('Proper state after reset', () => {
      expect(battleship.summary.state).toBe(GameState.NotInitialized);
    });
  });

  describe('Invalid Init Tests', () => {
    const battleship = new Game.BattleShip();

    test('Size too small', () => {
      expect(() => battleship.Init(3, 5)).toThrowError(Errors.InitBoardSizeError);
    });

    test('Size mmust be >= required ships', () => {
      expect(() => battleship.Init(8, 10)).toThrowError(Errors.InitBoardSizeError);
    });

    test('Required ships must be postive number', () => {
      expect(() => battleship.Init(8, -1)).toThrowError(Errors.InitBoardRequiredShipsError);
    });

  });
});
