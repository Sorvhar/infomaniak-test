import { Component, OnInit } from '@angular/core';
import { Store, Select } from '@ngxs/store';
import { Observable } from 'rxjs';
import { BoardState } from 'src/app/store/board/board.state';
import { BoardService } from './board.service';
import { GameService } from '../shared/game.service';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent implements OnInit {
  @Select(BoardState.getColumns) columns$: Observable<string[][]>;

  constructor(
    private store: Store,
    private boardSvc: BoardService,
    private gameSvc: GameService) { }

  ngOnInit() {
    this.boardSvc.initializeBoard();
  }

  addToken(colIndex: number) {
    this.boardSvc.addToken(colIndex);
  }

  reset() {
    this.gameSvc.resetTheGame();
    this.boardSvc.initializeBoard();
  }
}
