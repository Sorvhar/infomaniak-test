import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext, StateToken, Store } from '@ngxs/store';
import { GameModel, GameState } from '../game/game.state';
import { AddToken, InitializeBoard, ResetBoard, SetWinningCells } from './board.actions';

export interface CellModel {
  column: number;
  row: number;
  value: string;
  isWinning: boolean;
}

export interface BoardModel {
  columns: CellModel[][];
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
  static getColumns(state: BoardModel): CellModel[][] {
    return state.columns;
  }

  @Selector()
  static lastPlayedTokenRowIndex(state: BoardModel): number {
    return state.lastPlayedTokenRowIndex;
  }

  @Action(InitializeBoard)
  initializeBoard(ctx: StateContext<BoardModel>, action: InitializeBoard) {
    ctx.setState(state => ({
      ...state,
      columns: Array(action.columns).fill([]).map((col, colIndex) => {
        return Array(action.rows).fill({}).map((cell, rowIndex) => {
          return {
            column: colIndex,
            row: rowIndex,
            value: null,
            isWinning: false
          };
        });
      }),
      tokenCount: 0
    }));
  }

  @Action(ResetBoard)
  resetBoard(ctx: StateContext<BoardModel>) {
    ctx.setState(state => ({
      ...state,
      columns: state.columns.map(col => {
        return col.map(cell => {
          return {
            ...cell,
            value: null,
            isWinning: false
          };
        });
      }),
      tokenCount: 0
    }));
  }

  @Action(AddToken)
  addToken(ctx: StateContext<BoardModel>, action: AddToken) {
    ctx.setState(state => {
      const game = this.store.selectSnapshot<GameModel>(GameState);
      const lastEmptyCell = state.columns[action.colIndex]
        .filter(c => c.value === null)
        .reduce((prev, curr) => {
          return curr.row > prev.row ? curr : prev;
        });

      // Update board to set the last cell of selected column to active player value
      return {
        ...state,
        columns: state.columns.map((arrColumn, colIndex) => {
          if (colIndex === action.colIndex) {
            return arrColumn.map((cell, rowIndex) => {
              if (rowIndex === lastEmptyCell.row) {
                return {
                  ...cell,
                  value: game.activePlayer.color,
                  isLastPlayed: true
                };
              }

              return cell;
            });
          }

          return arrColumn;
        }),
        tokenCount: state.tokenCount + 1,
        lastPlayedTokenRowIndex: lastEmptyCell.row
      };
    });
  }

  @Action(SetWinningCells)
  setWinningCells(ctx: StateContext<BoardModel>, action: SetWinningCells) {
    ctx.setState(state => {
      return {
        ...state,
        columns: state.columns.map(col => {
          return col.map(cell => {
            if (action.winningCells.find(x => x.column === cell.column && x.row === cell.row && x.value === cell.value)) {
              return {
                ...cell,
                isWinning: true
              };
            }

            return cell;
          });
        })
      };
    });
  }
}
