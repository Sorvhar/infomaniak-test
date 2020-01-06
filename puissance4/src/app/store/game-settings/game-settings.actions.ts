import { GameSettingsForm } from 'src/app/models/game-settings-form.model';

export class SetGameSettings {
  static readonly type = '[GameSettings] SetGameSettings';
  constructor(public settings: GameSettingsForm) { }
}
