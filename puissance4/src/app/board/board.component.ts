import { Component, OnInit } from '@angular/core';
import { Select } from '@ngxs/store';
import { Observable } from 'rxjs';
import { BoardState, CellModel } from 'src/app/store/board/board.state';
import { BoardService } from './board.service';
import { RED_PLAYER, YELLOW_PLAYER } from '../shared/constants';
import { trigger, transition, style, animate, state } from '@angular/animations';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent implements OnInit {
  @Select(BoardState.getColumns) columns$: Observable<CellModel[][]>;

  constructor(private boardSvc: BoardService) { }

  ngOnInit() {
    this.boardSvc.initializeBoard();
  }

  addToken(colIndex: number) {
    this.boardSvc.addToken(colIndex);
  }

  getTokenClass(cell: CellModel) {
    switch (cell.value) {
      case RED_PLAYER:
        return 'board__token-r';

      case YELLOW_PLAYER:
        return 'board__token-y';

      default:
        return '';
    }
  }

  colTrackByFn(index: number, col: []) {
    return index;
  }

  cellTrackByFn(index: number, cell: CellModel) {
    return index;
  }
}
