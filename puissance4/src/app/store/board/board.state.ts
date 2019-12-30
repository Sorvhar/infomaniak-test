import { State, StateToken, Action, StateContext, Selector, Store } from '@ngxs/store';
import { Injectable } from '@angular/core';
import { InitializeBoard, AddToken } from './board.actions';
import { GameState, GameModel } from '../game/game.state';
import { strict } from 'assert';
import { state } from '@angular/animations';
import { COLUMNS, ROWS, REGEX_WIN_CONDITION } from 'src/app/shared/constants';

export interface BoardModel {
    columns: string[][];
    tokenCount: number;
    lastPlayedTokenRowIndex: number;
}

const BOARD_STATE_TOKEN = new StateToken<BoardModel>('board');

@State({
    name: BOARD_STATE_TOKEN,
    defaults: {
        columns: [],
        tokenCount: 0,
        lastPlayedTokenRowIndex: null
    }
})
@Injectable() // Make it Ivy compatible. See https://www.ngxs.io/advanced/ivy-migration-guide
export class BoardState {

    constructor(private store: Store) { }

    @Selector()
    static getColumns(state: BoardModel): string[][] {
        return state.columns;
    }

    @Selector()
    static getTokenCount(state: BoardModel): number {
        return state.tokenCount;
    }

    @Action(InitializeBoard)
    initializeBoard(ctx: StateContext<BoardModel>, action: InitializeBoard) {
        ctx.setState(state => ({
            ...state,
            columns: Array(action.columns).fill([])
                .map(x => Array(action.rows).fill(null)),
            tokenCount: 0
        }));
    }

    @Action(AddToken)
    addToken(ctx: StateContext<BoardModel>, action: AddToken) {
        ctx.setState(state => {
            const game = this.store.selectSnapshot<GameModel>(GameState);
            const lastRowIndex = state.columns[action.colIndex].lastIndexOf(null);

            // Update board to set the last cell of selected column to active player value
            return {
                ...state,
                columns: state.columns.map((arrColumn, index) => {
                    if (index === action.colIndex) {
                        return arrColumn.map((cell, index) => {
                            if (index === lastRowIndex) {
                                return game.activePlayer;
                            }
                            return cell;
                        });
                    }
                    return arrColumn;
                }),
                tokenCount: state.tokenCount + 1,
                lastPlayedTokenRowIndex: lastRowIndex
            }
        });
    }
}