import { State, StateToken, Action, StateContext, Actions } from '@ngxs/store';
import { SwitchPlayer } from './game.actions';
import { Injectable } from '@angular/core';
import { RED_PLAYER, YELLOW_PLAYER } from 'src/app/shared/constants';

export interface GameModel {
    activePlayer: string;
    gameStopped: boolean;
    winMessage: string;
}

const GAME_STATE_TOKEN = new StateToken<GameModel>('game');

@State({
    name: GAME_STATE_TOKEN,
    defaults: {
        activePlayer: RED_PLAYER,
        gameStopped: false,
        winMessage: ''
    }
})
@Injectable()
export class GameState {
    @Action(SwitchPlayer)
    switchPlayer(ctx: StateContext<GameModel>) {
        ctx.setState(state => ({
            ...state,
            activePlayer: state.activePlayer === RED_PLAYER ? YELLOW_PLAYER : RED_PLAYER
        }));
    }
}