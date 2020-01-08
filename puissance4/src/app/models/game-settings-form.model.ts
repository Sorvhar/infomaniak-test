export class GameSettingsForm {
  redPlayerName: string;
  redPlayerAvatar: number;
  yellowPlayerName: string;
  yellowPlayerAvatar: number;
  maxRounds: number;

  constructor(init?: Partial<GameSettingsForm>) {
    Object.assign(this, init);
  }
}
