import { GameSettingsForm } from '../../models/game-settings-form.model';

export class SetGameSettings {
  static readonly type = '[GameSettings] SetGameSettings';
  constructor(public settings: GameSettingsForm) { }
}
