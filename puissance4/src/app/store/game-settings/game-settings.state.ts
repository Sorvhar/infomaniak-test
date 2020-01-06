import { State, StateToken, Action, StateContext, Store } from '@ngxs/store';
import { Injectable } from '@angular/core';
import { SetGameSettings } from './game-settings.actions';
import { GameSettings } from 'src/app/models/game-settings.model';

export interface GameSettingsModel {
  player1Name: string;
  player2Name: string;
}

const GAME_SETTINGS_STATE_TOKEN = new StateToken<GameSettingsModel>('gameSettings');

@State({
  name: GAME_SETTINGS_STATE_TOKEN,
  defaults: {
    player1Name: '',
    player2Name: ''
  }
})
@Injectable() // Make it Ivy compatible. See https://www.ngxs.io/advanced/ivy-migration-guide
export class GameSettingsState {

  constructor(private store: Store) { }

  @Action(SetGameSettings)
  setGameSettings(ctx: StateContext<GameSettingsModel>, action: SetGameSettings) {
    ctx.setState(state => ({
      ...state,
      player1Name: action.settings.player1Name,
      player2Name: action.settings.player2Name
    }));
  }
}
