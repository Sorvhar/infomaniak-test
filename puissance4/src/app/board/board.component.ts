import { Component, OnInit } from '@angular/core';
import { Select } from '@ngxs/store';
import { Observable } from 'rxjs';
import { RED_PLAYER, YELLOW_PLAYER } from '../shared/constants';
import { BoardState, CellModel } from '../shared/store/board/board.state';
import { BoardService } from './board.service';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent implements OnInit {
  @Select(BoardState.getColumns) columns$: Observable<CellModel[][]>;

  isBrowserEdge = false;

  constructor(private boardSvc: BoardService) { }

  ngOnInit() {
    this.boardSvc.initializeBoard();
    this.isBrowserEdge = window.navigator.userAgent.toLowerCase().includes('edge');
  }

  addToken(colIndex: number) {
    this.boardSvc.addToken(colIndex);
  }

  getCellClass(cell: CellModel) {
    return {
      'board__cell--winning': cell.isWinning
    };
  }

  getTokenClass(cell: CellModel) {
    return {
      'board__token--red': cell.value === RED_PLAYER,
      'board__token--yellow': cell.value === YELLOW_PLAYER
    };
  }

  colTrackByFn(index: number, col: []) {
    return index;
  }

  cellTrackByFn(index: number, cell: CellModel) {
    return index;
  }
}
