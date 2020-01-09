import { animate, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { Select } from '@ngxs/store';
import { Observable } from 'rxjs';
import { GameService } from '../shared/services/game.service';
import { GameModel, GameState } from '../shared/store/game/game.state';

@Component({
  selector: 'app-information-panel',
  templateUrl: './information-panel.component.html',
  styleUrls: ['./information-panel.component.scss'],
  animations: [
    trigger('informationInAnimation', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('1s', style({ opacity: 1 }))
      ])
    ]),
    trigger('buttonInAnimation', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateX(100%)' }),
        animate('500ms', style({ opacity: 1, transform: 'translateX(0)' }))
      ])
    ]),
  ]
})
export class InformationPanelComponent implements OnInit {
  @Select(GameState) game$: Observable<GameModel>;

  constructor(
    private gameSvc: GameService) { }

  ngOnInit() {

  }

  newGame() {
    this.gameSvc.newGame(false, true);
  }

  startRound() {
    this.gameSvc.startRound();
  }
}
