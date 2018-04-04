export class Summary {
    public state: GameState;
    public history: string[];

    constructor() {
        this.history = Array<string>();
        this.state = GameState.NotInitialized;
    }
}

export enum GameState {
    NotInitialized = 1,
    NeedsUserShips = 2,
    ReadyToPlay = 3,
    PlayerWon = 4,
    ComputerWon = 5
}

