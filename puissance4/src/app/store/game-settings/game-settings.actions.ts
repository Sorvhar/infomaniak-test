import { GameSettings } from 'src/app/models/game-settings.model';

export class SetGameSettings {
  static readonly type = '[GameSettings] SetGameSettings';
  constructor(public settings: GameSettings) { }
}
