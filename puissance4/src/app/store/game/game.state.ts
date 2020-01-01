import { State, StateToken, Action, StateContext, Actions, Selector, Store } from '@ngxs/store';
import { SwitchPlayer, StopTheGame, ResetTheGame } from './game.actions';
import { Injectable } from '@angular/core';
import { RED_PLAYER, YELLOW_PLAYER } from 'src/app/shared/constants';

export interface GameModel {
    activePlayer: string;
    gameStopped: boolean;
    draw: boolean;
}

const GAME_STATE_TOKEN = new StateToken<GameModel>('game');

@State({
    name: GAME_STATE_TOKEN,
    defaults: {
        activePlayer: RED_PLAYER,
        gameStopped: false,
        draw: false
    }
})
@Injectable() // Make it Ivy compatible. See https://www.ngxs.io/advanced/ivy-migration-guide
export class GameState {

    constructor(private store: Store) { }

    @Selector()
    static isGameStopped(state: GameModel) {
        return state.gameStopped;
    }

    @Selector()
    static getActivePlayer(state: GameModel) {
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

    @Action(ResetTheGame)
    resetTheGame(ctx: StateContext<GameModel>) {
        ctx.setState(state => ({
            ...state,
            activePlayer: RED_PLAYER,
            gameStopped: false,
            draw: false,
            winningCells: []
        }));
    }
}
