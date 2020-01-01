import { Component, OnInit } from '@angular/core';
import { Select } from '@ngxs/store';
import { Observable } from 'rxjs';
import { BoardState, CellModel } from 'src/app/store/board/board.state';
import { BoardService } from './board.service';
import { RED_PLAYER, YELLOW_PLAYER } from '../shared/constants';

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

  getCellClass(cell: CellModel) {
    return {
      'main__cell--active-r': cell.value === RED_PLAYER,
      'main__cell--active-y': cell.value === YELLOW_PLAYER
    };
  }

  addToken(colIndex: number) {
    this.boardSvc.addToken(colIndex);
  }
}
