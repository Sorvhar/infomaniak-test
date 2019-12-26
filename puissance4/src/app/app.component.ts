import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  private readonly rows = 6;
  private readonly columns = 7;

  activePlayer = 'r';

  board: any[][] = [];

  gameStopped = false;

  ngOnInit() {
    this.initBoard();

    console.log(this.board);
  }

  private initBoard() {
    for (let i = 0; i < this.columns; i++) {
      let cells = [];
      for (let j = 0; j < this.rows; j++) {
        cells.push(null);
      }
      this.board.push(cells);
    }
  }

  addToken(colIndex: number) {
    if (!this.gameStopped && !this.isColumnFull(colIndex)) { // Add token only if the column is not full
      for (let rowIndex = this.board.length - 1; rowIndex >= 0; rowIndex--) {
        if (this.board[colIndex][rowIndex] === null) {
          this.board[colIndex][rowIndex] = this.activePlayer;

          if (!this.checkWin(this.activePlayer, colIndex, rowIndex)) {
            this.switchActivePlayer();
          } else {
            this.displayWinner();
            this.stopTheGame();
          }

          break;
        }
      }
    }
  }

  private isColumnFull(colIndex: number) {
    return this.board[colIndex].every(value => value !== null)
  }

  private switchActivePlayer() {
    this.activePlayer = this.activePlayer === 'r' ? 'y' : 'r';
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
    while (tmpColIndex < this.columns && tmpRowIndex < this.rows) {
      arrAscendingDiagonal.push(this.board[tmpColIndex][tmpRowIndex]);
      tmpColIndex++;
      tmpRowIndex++;
    }

    return this.hasWinningConditions(arrAscendingDiagonal);
  }
  private checkDescendingDiagonal(colIndex: number, rowIndex: number): boolean {
    let tmpColIndex = colIndex;
    let tmpRowIndex = rowIndex;

    while (tmpColIndex < this.columns - 1 && tmpRowIndex > 0) {
      tmpColIndex++;
      tmpRowIndex--;
    }

    const arrDescendingDiagonal: string[] = [];
    while (tmpColIndex > 0 && tmpRowIndex < this.rows) {
      console.log(tmpColIndex, tmpRowIndex);

      arrDescendingDiagonal.push(this.board[tmpColIndex][tmpRowIndex]);
      tmpColIndex--;
      tmpRowIndex++;
    }

    return this.hasWinningConditions(arrDescendingDiagonal);
  }

  private hasWinningConditions(arr: string[]): boolean {
    return arr.join('').match(/r{4}|y{4}/) !== null;
  }

  private displayWinner() {
    console.log(`Player ${this.activePlayer} wins !!!`);
  }
  private stopTheGame() {
    this.gameStopped = true;
  }
}
