import { TitleCasePipe } from '@angular/common';
import { Injectable } from '@angular/core';
import { Action, State, StateContext, StateToken, Store } from '@ngxs/store';
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

  constructor(
    private store: Store,
    private titleCasePipe: TitleCasePipe) { }

  @Action(SetGameSettings)
  setGameSettings(ctx: StateContext<GameSettingsModel>, action: SetGameSettings) {
    ctx.setState(state => ({
      ...state,
      redPlayerName: this.titleCasePipe.transform(action.settings.redPlayerName),
      yellowPlayerName: this.titleCasePipe.transform(action.settings.yellowPlayerName),
      redPlayerAvatarId: action.settings.redPlayerAvatar,
      yellowPlayerAvatarId: action.settings.yellowPlayerAvatar
    }));
  }
}
