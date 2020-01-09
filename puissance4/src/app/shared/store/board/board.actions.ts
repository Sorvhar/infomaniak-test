import { CellModel } from './board.state';

export class InitializeBoard {
  static readonly type = '[Board] Initialize';
  constructor(public columns: number, public rows: number) { }
}

export class ResetBoard {
  static readonly type = '[Board] Reset';
  constructor() { }
}

export class AddToken {
  static readonly type = '[Board] AddToken';
  constructor(public colIndex: number) { }
}

export class SetWinningCells {
  static readonly type = '[Board] SetWinningCells';
  constructor(public winningCells: CellModel[]) { }
}
