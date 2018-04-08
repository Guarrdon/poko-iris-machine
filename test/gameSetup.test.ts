import * as Errors from '../src/server/errors/errors';

import GameSetup from '../src/server/domain/gameSetup';
import PokoIrisMachine from '../src/server/domain/pokoirismachineGame';
import GameDefaults from '../src/server/domain/gameDefaults'

describe('Game Setup API', () => {
  
  describe('Successful game setup', () => {
    test('Game successfully initiated', () => {
      const setup = new GameSetup(GameDefaults.MinPlayers, GameDefaults.MaxRounds);
      const pim = setup.ConfigureNewGame();
      expect(pim).not.toBeNull();
      expect(pim.length).toBeGreaterThan(0);
    });
  });

  describe('Invalid Game Setup', () => {
    test('Too few players', () => {
      const setup = new GameSetup(GameDefaults.MinPlayers-1, GameDefaults.MaxRounds);
      expect(() => setup.ConfigureNewGame()).toThrowError(Errors.InvalidGameStartupArguments);
    });
    test('Too many players', () => {
      const setup = new GameSetup(GameDefaults.MaxPlayers+1, GameDefaults.MaxRounds);
      expect(() => setup.ConfigureNewGame()).toThrowError(Errors.InvalidGameStartupArguments);
    });
    test('Too few rounds', () => {
      const setup = new GameSetup(GameDefaults.MinPlayers, GameDefaults.MinRounds-1);
      expect(() => setup.ConfigureNewGame()).toThrowError(Errors.InvalidGameStartupArguments);
    });
    test('Too many rounds', () => {
      const setup = new GameSetup(GameDefaults.MinPlayers, GameDefaults.MaxRounds+1);
      expect(() => setup.ConfigureNewGame()).toThrowError(Errors.InvalidGameStartupArguments);
    });
  });

 
});


