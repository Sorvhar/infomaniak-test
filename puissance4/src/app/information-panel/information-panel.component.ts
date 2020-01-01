import { Component, OnInit } from '@angular/core';
import { GameService } from '../shared/game.service';
import { BoardService } from '../board/board.service';

@Component({
  selector: 'app-information-panel',
  templateUrl: './information-panel.component.html',
  styleUrls: ['./information-panel.component.scss']
})
export class InformationPanelComponent implements OnInit {

  constructor(
    private gameSvc: GameService,
    private boardSvc: BoardService) { }

  ngOnInit() {
  }


  restart() {
    this.gameSvc.restart();
    this.boardSvc.initializeBoard();
  }
}
