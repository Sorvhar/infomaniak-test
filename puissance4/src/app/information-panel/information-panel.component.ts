import { Component, OnInit } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { BoardService } from '../board/board.service';
import { RED_PLAYER, YELLOW_PLAYER } from '../shared/constants';
import { GameService } from '../shared/game.service';
import { GameSettingsModel, GameSettingsState } from '../store/game-settings/game-settings.state';
import { GameModel, GameState } from '../store/game/game.state';

@Component({
  selector: 'app-information-panel',
  templateUrl: './information-panel.component.html',
  styleUrls: ['./information-panel.component.scss']
})
export class InformationPanelComponent implements OnInit {
  @Select(GameState) game$: Observable<GameModel>;

  activePlayerName: string;
  isDraw: boolean;

  constructor(
    private gameSvc: GameService,
    private boardSvc: BoardService,
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
