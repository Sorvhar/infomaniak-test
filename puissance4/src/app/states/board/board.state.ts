import { State, StateToken, Action, StateContext, Selector } from '@ngxs/store';
import { Injectable } from '@angular/core';
import { InitializeBoard } from './board.actions';

export interface BoardModel {
    board: string[][];
    tokenCount: number;
}

const BOARD_STATE_TOKEN = new StateToken<BoardModel>('board');

@State({
    name: BOARD_STATE_TOKEN,
    defaults: {
        board: [],
        tokenCount: 0
    }
})
@Injectable()
export class BoardState {
    @Selector()
    static getBoard(state: BoardModel) {
        return state.board;
    }

    @Action(InitializeBoard)
    initializeBoard(ctx: StateContext<BoardModel>, action: InitializeBoard) {
        ctx.setState({
            board: Array(action.columns).fill([])
                .map(x => Array(action.rows).fill(null)),
            tokenCount: 0
        });
    }
}