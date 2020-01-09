import { Injectable } from '@angular/core';
import { Store } from '@ngxs/store';
import { COLUMNS, REGEX_WIN_CONDITION, ROWS } from '../shared/constants';
import { AddToken, InitializeBoard, SetWinningCells } from '../store/board/board.actions';
import { BoardModel, BoardState, CellModel } from '../store/board/board.state';
import { EndRound, SwitchPlayer } from '../store/game/game.actions';
import { GameModel, GameState } from '../store/game/game.state';

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
      this.store.dispatch(new AddToken(colIndex)).subscribe(() => {
        this.checkWin(colIndex);
      });
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

    if (winningCells && winningCells.length >= 4) {
      this.store.dispatch([new EndRound(false), new SetWinningCells(winningCells)]);
    } else if (this.isBoardFull(boardState)) {
      this.store.dispatch(new EndRound(true));
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

    // Find indexes of the diagonal starting point (i.e the top left cell)
    while (tmpColIndex > 0 && tmpRowIndex > 0) {
      tmpColIndex--;
      tmpRowIndex--;
    }

    // Create an array with all the diagonal values
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

    // Find indexes of the diagonal starting point (i.e the top right cell)
    while (tmpColIndex < COLUMNS - 1 && tmpRowIndex > 0) {
      tmpColIndex++;
      tmpRowIndex--;
    }

    // Create an array with all the diagonal values
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

    if (arrCells.map(c => c.value || '_').join('').match(REGEX_WIN_CONDITION) !== null) {
      return arrCells.filter(c => c.value === game.activePlayer);
    }
  }

  private isBoardFull(boardState: BoardModel): boolean {
    return boardState.tokenCount === ROWS * COLUMNS;
  }
}
