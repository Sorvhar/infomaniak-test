import { Injectable, OnDestroy } from '@angular/core';
import { Store } from '@ngxs/store';
import { GameModel, GameState } from '../store/game/game.state';
import { BoardModel, BoardState } from '../store/board/board.state';
import { strict } from 'assert';
import { AddToken, InitializeBoard } from '../store/board/board.actions';
import { COLUMNS, ROWS, REGEX_WIN_CONDITION } from '../shared/constants';
import { SwitchPlayer, StopTheGame } from '../store/game/game.actions';

@Injectable({
  providedIn: 'root'
})
export class BoardService implements OnDestroy {

  constructor(private store: Store) { }

  initializeBoard() {
    this.store.dispatch(new InitializeBoard(COLUMNS, ROWS));
  }

  addToken(colIndex: number) {
    const gameState = this.store.selectSnapshot<GameModel>(GameState);
    const boardState = this.store.selectSnapshot<BoardModel>(BoardState);

    const isColumnFull = boardState.columns[colIndex].every(value => value !== null);

    if (!gameState.gameStopped && !isColumnFull) {
      this.store.dispatch(new AddToken(colIndex)).subscribe(
        () => {
          if (this.checkWin(colIndex)) {
            this.store.dispatch(new StopTheGame(false));
          } else if (this.isBoardFull()) {
            this.store.dispatch(new StopTheGame(true))
          } else {
            this.store.dispatch(new SwitchPlayer());
          }
        }
      )
    }
  }

  ngOnDestroy() {

  }

  private checkWin(colIndex: number): boolean {
    const board = this.store.selectSnapshot<BoardModel>(BoardState);

    return this.checkColumn(board.columns, colIndex)
      || this.checkRow(board.columns, board.lastPlayedTokenRowIndex)
      || this.checkAscendingDiagonal(board.columns, colIndex, board.lastPlayedTokenRowIndex)
      || this.checkDescendingDiagonal(board.columns, colIndex, board.lastPlayedTokenRowIndex);
  }
  private checkColumn(columns: string[][], colIndex: number): boolean {
    return this.hasWinningConditions(columns[colIndex])
  }
  private checkRow(columns: string[][], rowIndex: number) {
    return this.hasWinningConditions(columns.map(col => col[rowIndex]))
  }
  private checkAscendingDiagonal(columns: string[][], colIndex: number, rowIndex: number) {
    let tmpColIndex = colIndex;
    let tmpRowIndex = rowIndex;

    // Find indexes of the diagonal's starting point (i.e the top left cell)
    while (tmpColIndex > 0 && tmpRowIndex > 0) {
      tmpColIndex--;
      tmpRowIndex--;
    }

    // Create an array with all the diagonal's values
    const arrAscendingDiagonal: string[] = [];
    while (tmpColIndex < COLUMNS && tmpRowIndex < ROWS) {
      arrAscendingDiagonal.push(columns[tmpColIndex][tmpRowIndex]);
      tmpColIndex++;
      tmpRowIndex++;
    }

    return this.hasWinningConditions(arrAscendingDiagonal);
  }
  private checkDescendingDiagonal(columns: string[][], colIndex: number, rowIndex: number): boolean {
    let tmpColIndex = colIndex;
    let tmpRowIndex = rowIndex;

    // Find indexes of the diagonal's starting point (i.e the top right cell)
    while (tmpColIndex < COLUMNS - 1 && tmpRowIndex > 0) {
      tmpColIndex++;
      tmpRowIndex--;
    }

    // Create an array with all the diagonal's values
    const arrDescendingDiagonal: string[] = [];
    while (tmpColIndex > 0 && tmpRowIndex < ROWS) {
      arrDescendingDiagonal.push(columns[tmpColIndex][tmpRowIndex]);
      tmpColIndex--;
      tmpRowIndex++;
    }

    return this.hasWinningConditions(arrDescendingDiagonal);
  }
  private hasWinningConditions(arrCells: string[]): boolean {
    return arrCells.join('').match(REGEX_WIN_CONDITION) !== null;
  }

  private isBoardFull(): boolean {
    const board = this.store.selectSnapshot<BoardModel>(BoardState);
    return board.tokenCount === ROWS * COLUMNS;
  }
}
