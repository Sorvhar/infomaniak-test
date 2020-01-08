import { animate, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { RED_PLAYER, YELLOW_PLAYER } from '../shared/constants';
import { GameService } from '../shared/game.service';
import { GameSettingsModel, GameSettingsState } from '../store/game-settings/game-settings.state';
import { GameModel, GameState } from '../store/game/game.state';

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

  activePlayerName: string;
  isDraw: boolean;

  constructor(
    private gameSvc: GameService,
    private store: Store) { }

  ngOnInit() {
    this.game$.subscribe(game => {
      const gameSettings = this.store.selectSnapshot<GameSettingsModel>(GameSettingsState);
      switch (game.activePlayer) {
        case RED_PLAYER:
          this.activePlayerName = gameSettings.redPlayerName;
          break;

        case YELLOW_PLAYER:
          this.activePlayerName = gameSettings.yellowPlayerName;
          break;

        default:
          break;
      }
    });
  }

  newGame() {
    this.gameSvc.newGame(false);
  }

  startRound() {
    this.gameSvc.startRound();
  }
}
