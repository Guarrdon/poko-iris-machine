import * as Game from '../src/server/domain/battleship';
import { GameState } from '../src/server/domain/summary';
import * as Errors from '../src/server/errors/errors';
import * as ShipInfo from '../src/server/domain/ship';


describe('Game Play API', () => {
  describe('Player Firing And Hitting', () => {
    test('Hit computer ship', () => {
      const battleship = new Game.BattleShip();
      battleship.Init(10, 5);

      battleship.PlaceUserShip(new ShipInfo.ShipBuilder(ShipInfo.ShipType.Battleship, 1, 1, ShipInfo.ShipOrientation.Horizontal).Create());
      battleship.PlaceUserShip(new ShipInfo.ShipBuilder(ShipInfo.ShipType.Battleship, 1, 2, ShipInfo.ShipOrientation.Horizontal).Create());
      battleship.PlaceUserShip(new ShipInfo.ShipBuilder(ShipInfo.ShipType.Battleship, 1, 3, ShipInfo.ShipOrientation.Horizontal).Create());
      battleship.PlaceUserShip(new ShipInfo.ShipBuilder(ShipInfo.ShipType.Battleship, 1, 4, ShipInfo.ShipOrientation.Horizontal).Create());
      battleship.PlaceUserShip(new ShipInfo.ShipBuilder(ShipInfo.ShipType.Battleship, 1, 5, ShipInfo.ShipOrientation.Horizontal).Create());

      const computerposition = battleship.computerBoard.ships[0].positions[0];

      const result = battleship.FireShot(new ShipInfo.Position(computerposition.x, computerposition.y));
      const shipPosition = battleship.computerBoard.getPosition(computerposition);
      expect(shipPosition.status).toBe(ShipInfo.PositionStatus.ShipHit);
    });

  });

  describe('Player Firing And Missing', () => {
    test('Misses computer ship', () => {
      const battleship = new Game.BattleShip();
      battleship.Init(10, 5);

      battleship.PlaceUserShip(new ShipInfo.ShipBuilder(ShipInfo.ShipType.Battleship, 1, 1, ShipInfo.ShipOrientation.Horizontal).Create());
      battleship.PlaceUserShip(new ShipInfo.ShipBuilder(ShipInfo.ShipType.Battleship, 1, 2, ShipInfo.ShipOrientation.Horizontal).Create());
      battleship.PlaceUserShip(new ShipInfo.ShipBuilder(ShipInfo.ShipType.Battleship, 1, 3, ShipInfo.ShipOrientation.Horizontal).Create());
      battleship.PlaceUserShip(new ShipInfo.ShipBuilder(ShipInfo.ShipType.Battleship, 1, 4, ShipInfo.ShipOrientation.Horizontal).Create());
      battleship.PlaceUserShip(new ShipInfo.ShipBuilder(ShipInfo.ShipType.Battleship, 1, 5, ShipInfo.ShipOrientation.Horizontal).Create());

      //switch computer and player boards (so we know where the ships are)
      battleship.computerBoard = battleship.playerBoard;

      const position = new ShipInfo.Position(1, 6);
      const result = battleship.FireShot(position);
      const shipPosition = battleship.computerBoard.getPosition(position);
      expect(shipPosition.status).toBe(ShipInfo.PositionStatus.NoShip);
    });

  });
});
