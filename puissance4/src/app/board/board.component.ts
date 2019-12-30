import { Component, OnInit } from '@angular/core';
import { Store, Select } from '@ngxs/store';
import { COLUMNS, ROWS } from 'src/app/shared/constants';
import { Observable } from 'rxjs';
import { BoardState } from 'src/app/states/board/board.state';
import { InitializeBoard } from 'src/app/states/board/board.actions';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent implements OnInit {
  @Select(BoardState.getBoard) board$: Observable<string[][]>;

  constructor(private store: Store) { }

  ngOnInit() {
    this.store.dispatch(new InitializeBoard(COLUMNS, ROWS));
  }

  addToken(colIndex: number) {

  }
}
