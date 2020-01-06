export class GameSettings {
  player1Name: string;
  player2Name: string;

  constructor(init?: Partial<GameSettings>) {
    Object.assign(this, init);
  }
}
