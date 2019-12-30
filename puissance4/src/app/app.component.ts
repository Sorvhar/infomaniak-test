import { Component, OnInit } from '@angular/core';
import { RED_PLAYER, ROWS, COLUMNS, YELLOW_PLAYER, REGEX_WIN_CONDITION } from './shared/constants';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  activePlayer = RED_PLAYER;
  board: any[][] = [];
  gameStopped = false;
  tokenCount = 0;
  winMessage = '';

  ngOnInit() {
    this.initBoard();
  }

  addToken(colIndex: number) {
    if (!this.gameStopped && !this.isColumnFull(colIndex)) { // Add token only if the column is not full
      const rowIndex = this.board[colIndex].lastIndexOf(null);
      this.board[colIndex][rowIndex] = this.activePlayer;
      this.tokenCount++;

      if (this.checkWin(this.activePlayer, colIndex, rowIndex)) {
        this.stopTheGame(this.activePlayer);
      } else {
        this.switchActivePlayer();
      }
    }

    this.checkTokenCount();
  }

  reset() {
    this.initBoard();
    this.activePlayer = RED_PLAYER;
    this.gameStopped = false;
    this.tokenCount = 0;
  }

  checkTokenCount() {
    if (this.tokenCount === ROWS * COLUMNS) {
      this.stopTheGame(null);
    }
  }

  private initBoard() {
    this.board = Array(COLUMNS).fill([])
      .map(x => Array(ROWS).fill(null));
  }

  private isColumnFull(colIndex: number) {
    return this.board[colIndex].every(value => value !== null)
  }

  private switchActivePlayer() {
    this.activePlayer = this.activePlayer === RED_PLAYER ? YELLOW_PLAYER : RED_PLAYER;
  }

  private checkWin(activePlayer: string, colIndex: number, rowIndex: number): boolean {
    return this.checkColumn(colIndex)
      || this.checkRow(rowIndex)
      || this.checkAscendingDiagonal(colIndex, rowIndex)
      || this.checkDescendingDiagonal(colIndex, rowIndex);
  }
  private checkColumn(colIndex: number): boolean {
    return this.hasWinningConditions(this.board[colIndex])
  }
  private checkRow(rowIndex: number) {
    return this.hasWinningConditions(this.board.map(col => col[rowIndex]))
  }
  private checkAscendingDiagonal(colIndex: number, rowIndex: number) {
    let tmpColIndex = colIndex;
    let tmpRowIndex = rowIndex;

    while (tmpColIndex > 0 && tmpRowIndex > 0) {
      tmpColIndex--;
      tmpRowIndex--;
    }

    const arrAscendingDiagonal: string[] = [];
    while (tmpColIndex < COLUMNS && tmpRowIndex < ROWS) {
      arrAscendingDiagonal.push(this.board[tmpColIndex][tmpRowIndex]);
      tmpColIndex++;
      tmpRowIndex++;
    }

    return this.hasWinningConditions(arrAscendingDiagonal);
  }
  private checkDescendingDiagonal(colIndex: number, rowIndex: number): boolean {
    let tmpColIndex = colIndex;
    let tmpRowIndex = rowIndex;

    while (tmpColIndex < COLUMNS - 1 && tmpRowIndex > 0) {
      tmpColIndex++;
      tmpRowIndex--;
    }

    const arrDescendingDiagonal: string[] = [];
    while (tmpColIndex > 0 && tmpRowIndex < ROWS) {
      arrDescendingDiagonal.push(this.board[tmpColIndex][tmpRowIndex]);
      tmpColIndex--;
      tmpRowIndex++;
    }

    return this.hasWinningConditions(arrDescendingDiagonal);
  }

  private hasWinningConditions(arr: string[]): boolean {
    return arr.join('').match(REGEX_WIN_CONDITION) !== null;
  }

  private stopTheGame(winner: string) {
    this.gameStopped = true;

    switch (winner) {
      case RED_PLAYER:
        this.winMessage = 'Red player wins !';
        break;

      case YELLOW_PLAYER:
        this.winMessage = 'Yellow player wins !';
        break;

      case null:
        this.winMessage = 'No one wins.';
        break;

      default:
        break;
    }
  }
}
