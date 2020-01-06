export class GameSettingsForm {
  redPlayerName: string;
  yellowPlayerName: string;

  constructor(init?: Partial<GameSettingsForm>) {
    Object.assign(this, init);
  }
}
