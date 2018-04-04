import * as Game from '../src/domain/battleship';
import * as Errors from '../src/errors/errors';
import * as ShipInfo from '../src/domain/ship';


describe('Game Setup API', () => {

  describe('Place Single Ship', () => {

    const battleship = new Game.BattleShip();
    battleship.Init(10, 5);
    const ship = new ShipInfo.ShipBuilder(ShipInfo.ShipType.Battleship, 2, 2, ShipInfo.ShipOrientation.Horizontal).Create();
    battleship.PlaceUserShip(ship);

    test('Single sip created on player board', () => {
      expect(battleship.playerBoard.ships.length).toBe(1);
    });
    test('Single ship created is battleship', () => {
      expect(battleship.playerBoard.ships[0].type).toBe(ShipInfo.ShipType.Battleship);
    });
  });

  describe('Invalid Placement of Single Ship', () => {
    const battleship = new Game.BattleShip();
    battleship.Init(5, 5);
    const ship = new ShipInfo.ShipBuilder(ShipInfo.ShipType.Battleship, 6, 6, ShipInfo.ShipOrientation.Horizontal).Create();

    test('Ship placed outside of boundaries', () => {
      expect(() => battleship.PlaceUserShip(ship)).toThrowError(Errors.ShipPlacementError);
    });
    test('Zero ships create for invalid placement', () => {
      expect(battleship.playerBoard.ships.length).toBe(0);
    });
  });

  describe('Invalid Overlap of Two Ships', () => {
    const battleship = new Game.BattleShip();
    battleship.Init(10, 5);
    let ship = new ShipInfo.ShipBuilder(ShipInfo.ShipType.Battleship, 1, 3, ShipInfo.ShipOrientation.Horizontal).Create();
    battleship.PlaceUserShip(ship);
    ship = new ShipInfo.ShipBuilder(ShipInfo.ShipType.Battleship, 2, 2, ShipInfo.ShipOrientation.Vertical).Create();

    test('Ship placed ontop of previously placed ship', () => {
      expect(() => battleship.PlaceUserShip(ship)).toThrowError(Errors.ShipOverlapError);
    });
    test('Only first ship created for overlap event', () => {
      expect(battleship.playerBoard.ships.length).toBe(1);
    });
  });

});


