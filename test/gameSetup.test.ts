import * as Errors from '../src/server/errors/errors';

import GameSetup from '../src/server/domain/gameSetup';
import { PokoIrisMachine } from '../src/server/domain/pokoirismachine';
import GameDefaults from '../src/server/domain/gameDefaults'

describe('Game Setup API', () => {
  
  describe('Successful game setup', () => {
    test('Game successfully initiated', () => {
      const setup = PokoIrisMachine.ConfigureNewGame(GameDefaults.MinPlayers, GameDefaults.MaxRounds)
      expect(setup).not.toBeNull()
      expect(setup.gameToken.length).toBeGreaterThan(0)
      expect(setup.numberOfPlayers).toBeGreaterThanOrEqual(GameDefaults.MinPlayers)
      expect(setup.numberOfPlayers).toBeLessThanOrEqual(GameDefaults.MaxPlayers)
      expect(setup.numberOfRounds).toBeGreaterThanOrEqual(GameDefaults.MinRounds)
      expect(setup.numberOfRounds).toBeLessThanOrEqual(GameDefaults.MaxRounds)
    });
  });

  describe('Invalid Game Setup', () => {
    test('Too few players', () => {
      expect(() => PokoIrisMachine.ConfigureNewGame(GameDefaults.MinPlayers-1, GameDefaults.MaxRounds)).toThrowError(Errors.InvalidGameSetupArguments);
    });
    test('Too many players', () => {
      expect(() => PokoIrisMachine.ConfigureNewGame(GameDefaults.MaxPlayers+1, GameDefaults.MaxRounds)).toThrowError(Errors.InvalidGameSetupArguments);
    });
    test('Too few rounds', () => {
      expect(() => PokoIrisMachine.ConfigureNewGame(GameDefaults.MinPlayers, GameDefaults.MinRounds-1)).toThrowError(Errors.InvalidGameSetupArguments);
    });
    test('Too many rounds', () => {
      expect(() => PokoIrisMachine.ConfigureNewGame(GameDefaults.MinPlayers, GameDefaults.MaxRounds+1)).toThrowError(Errors.InvalidGameSetupArguments);
    });
  });

 
});


