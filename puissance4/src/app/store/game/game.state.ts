import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext, StateToken, Store } from '@ngxs/store';
import { RED_PLAYER, YELLOW_PLAYER } from 'src/app/shared/constants';
import { GameSettingsModel, GameSettingsState } from '../game-settings/game-settings.state';
import { EndRound, StartNewGame, StartRound, SwitchPlayer } from './game.actions';

export interface GameModel {
  activePlayer: string;
  gameStopped: boolean;
  draw: boolean;
  redPlayerWinCount: number;
  yellowPlayerWinCount: number;
  gameOver: boolean;
}

const GAME_STATE_TOKEN = new StateToken<GameModel>('game');

@State({
  name: GAME_STATE_TOKEN,
  defaults: {
    activePlayer: null,
    gameStopped: false,
    draw: false,
    redPlayerWinCount: 0,
    yellowPlayerWinCount: 0,
    gameOver: false
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

  @Action(StartNewGame)
  startNewGame(ctx: StateContext<GameModel>) {
    ctx.setState(state => ({
      ...state,
      redPlayerWinCount: 0,
      yellowPlayerWinCount: 0,
      gameOver: false
    }));
  }

  @Action(StartRound)
  startRound(ctx: StateContext<GameModel>) {
    ctx.setState(state => {
      return {
        ...state,
        activePlayer: RED_PLAYER,
        gameStopped: false,
        draw: false,
        winningCells: [],
      };
    });
  }

  @Action(EndRound)
  endRound(ctx: StateContext<GameModel>, action: EndRound) {
    const gameSettings = this.store.selectSnapshot<GameSettingsModel>(GameSettingsState);

    ctx.setState(state => {
      const redPlayerWinCount = state.redPlayerWinCount + (state.activePlayer === RED_PLAYER && !action.draw ? 1 : 0);
      const yellowPlayerWinCount = state.yellowPlayerWinCount + (state.activePlayer === YELLOW_PLAYER && !action.draw ? 1 : 0);

      return {
        ...state,
        gameStopped: true,
        draw: action.draw,
        redPlayerWinCount,
        yellowPlayerWinCount,
        gameOver: redPlayerWinCount === gameSettings.maxRounds || yellowPlayerWinCount === gameSettings.maxRounds
      };
    });
  }
}
