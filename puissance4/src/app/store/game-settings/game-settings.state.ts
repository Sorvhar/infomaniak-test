import { State, StateToken, Action, StateContext, Store } from '@ngxs/store';
import { Injectable } from '@angular/core';
import { SetGameSettings } from './game-settings.actions';

export interface GameSettingsModel {
  redPlayerName: string;
  yellowPlayerName: string;
  redPlayerAvatarId: number;
  yellowPlayerAvatarId: number;
}

const GAME_SETTINGS_STATE_TOKEN = new StateToken<GameSettingsModel>('gameSettings');

@State({
  name: GAME_SETTINGS_STATE_TOKEN,
  defaults: {
    redPlayerName: '',
    yellowPlayerName: '',
    redPlayerAvatarId: 1,
    yellowPlayerAvatarId: 1
  }
})
@Injectable() // Make it Ivy compatible. See https://www.ngxs.io/advanced/ivy-migration-guide
export class GameSettingsState {

  constructor(private store: Store) { }

  @Action(SetGameSettings)
  setGameSettings(ctx: StateContext<GameSettingsModel>, action: SetGameSettings) {
    ctx.setState(state => ({
      ...state,
      redPlayerName: action.settings.redPlayerName,
      yellowPlayerName: action.settings.yellowPlayerName,
      redPlayerAvatarId: this.generateRandomAvatarId(),
      yellowPlayerAvatarId: this.generateRandomAvatarId()
    }));
  }

  private generateRandomAvatarId() {
    const min = 1;
    const max = 16;
    return Math.floor(Math.random() * (+max - +min)) + +min;
  }
}
