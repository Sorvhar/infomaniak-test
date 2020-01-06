import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext, StateToken, Store } from '@ngxs/store';
import { RED_PLAYER, YELLOW_PLAYER } from 'src/app/shared/constants';
import { StartTheGame, StopTheGame, SwitchPlayer } from './game.actions';

export interface GameModel {
  activePlayer: string;
  gameStopped: boolean;
  draw: boolean;
}

const GAME_STATE_TOKEN = new StateToken<GameModel>('game');

@State({
  name: GAME_STATE_TOKEN,
  defaults: {
    activePlayer: null,
    gameStopped: false,
    draw: false
  }
})
@Injectable() // Make it Ivy compatible. See https://www.ngxs.io/advanced/ivy-migration-guide
export class GameState {

  constructor(private store: Store) { }

  @Selector()
  static getActivePlayer(state: GameModel): string {
    return state.activePlayer;
  }

  @Action(SwitchPlayer)
  switchPlayer(ctx: StateContext<GameModel>) {
    ctx.setState(state => ({
      ...state,
      activePlayer: state.activePlayer === RED_PLAYER ? YELLOW_PLAYER : RED_PLAYER
    }));
  }

  @Action(StopTheGame)
  stopTheGame(ctx: StateContext<GameModel>, action: StopTheGame) {
    ctx.setState(state => ({
      ...state,
      gameStopped: true,
      draw: action.draw
    }));
  }

  @Action(StartTheGame)
  startTheGame(ctx: StateContext<GameModel>) {
    ctx.setState(state => ({
      ...state,
      activePlayer: RED_PLAYER,
      gameStopped: false,
      draw: false,
      winningCells: []
    }));
  }
}
