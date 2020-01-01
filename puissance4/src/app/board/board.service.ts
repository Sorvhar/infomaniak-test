import { Injectable, OnDestroy } from '@angular/core';
import { Store } from '@ngxs/store';
import { GameModel, GameState } from '../store/game/game.state';
import { BoardModel, BoardState, CellModel } from '../store/board/board.state';
import { strict } from 'assert';
import { AddToken, InitializeBoard, SetWinningCells } from '../store/board/board.actions';
import { COLUMNS, ROWS, REGEX_WIN_CONDITION } from '../shared/constants';
import { SwitchPlayer, StopTheGame } from '../store/game/game.actions';

@Injectable({
  providedIn: 'root'
})
export class BoardService {

  constructor(private store: Store) { }

  initializeBoard() {
    this.store.dispatch(new InitializeBoard(COLUMNS, ROWS));
  }

  addToken(colIndex: number) {
    const gameState = this.store.selectSnapshot<GameModel>(GameState);
    const boardState = this.store.selectSnapshot<BoardModel>(BoardState);

    const isColumnFull = boardState.columns[colIndex].every(cell => cell.value !== null);

    if (!gameState.gameStopped && !isColumnFull) {
      this.store.dispatch(new AddToken(colIndex)).subscribe(
        () => {
          this.checkWin(colIndex);
        }
      );
    }
  }

  private checkWin(colIndex: number) {
    // Read the new board state
    const boardState = this.store.selectSnapshot<BoardModel>(BoardState);

    const winningCells =
      this.checkColumn(boardState.columns, colIndex)
      || this.checkRow(boardState.columns, boardState.lastPlayedTokenRowIndex)
      || this.checkAscendingDiagonal(boardState.columns, colIndex, boardState.lastPlayedTokenRowIndex)
      || this.checkDescendingDiagonal(boardState.columns, colIndex, boardState.lastPlayedTokenRowIndex);

    if (winningCells && winningCells.length === 4) {
      this.store.dispatch([new StopTheGame(false), new SetWinningCells(winningCells)]);
    } else if (this.isBoardFull(boardState)) {
      this.store.dispatch(new StopTheGame(true));
    } else {
      this.store.dispatch(new SwitchPlayer());
    }
  }
  private checkColumn(columns: CellModel[][], colIndex: number): CellModel[] {
    return this.getWinningCells(columns[colIndex]);
  }
  private checkRow(columns: CellModel[][], rowIndex: number) {
    return this.getWinningCells(columns.map(col => col[rowIndex]));
  }
  private checkAscendingDiagonal(columns: CellModel[][], colIndex: number, rowIndex: number): CellModel[] {
    let tmpColIndex = colIndex;
    let tmpRowIndex = rowIndex;

    // Find indexes of the diagonal's starting point (i.e the top left cell)
    while (tmpColIndex > 0 && tmpRowIndex > 0) {
      tmpColIndex--;
      tmpRowIndex--;
    }

    // Create an array with all the diagonal's values
    const arrAscendingDiagonal: CellModel[] = [];
    while (tmpColIndex < COLUMNS && tmpRowIndex < ROWS) {
      arrAscendingDiagonal.push(columns[tmpColIndex][tmpRowIndex]);
      tmpColIndex++;
      tmpRowIndex++;
    }

    return this.getWinningCells(arrAscendingDiagonal);
  }
  private checkDescendingDiagonal(columns: CellModel[][], colIndex: number, rowIndex: number): CellModel[] {
    let tmpColIndex = colIndex;
    let tmpRowIndex = rowIndex;

    // Find indexes of the diagonal's starting point (i.e the top right cell)
    while (tmpColIndex < COLUMNS - 1 && tmpRowIndex > 0) {
      tmpColIndex++;
      tmpRowIndex--;
    }

    // Create an array with all the diagonal's values
    const arrDescendingDiagonal: CellModel[] = [];
    while (tmpColIndex > 0 && tmpRowIndex < ROWS) {
      arrDescendingDiagonal.push(columns[tmpColIndex][tmpRowIndex]);
      tmpColIndex--;
      tmpRowIndex++;
    }

    return this.getWinningCells(arrDescendingDiagonal);
  }
  private getWinningCells(arrCells: CellModel[]): CellModel[] {
    const game = this.store.selectSnapshot<GameModel>(GameState);

    if (arrCells.map(c => c.value).join('').match(REGEX_WIN_CONDITION) !== null) {
      return arrCells.filter(c => c.value === game.activePlayer);
    }
  }

  private isBoardFull(boardState: BoardModel): boolean {
    return boardState.tokenCount === ROWS * COLUMNS;
  }
}
