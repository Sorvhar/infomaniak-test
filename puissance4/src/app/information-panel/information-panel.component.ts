import { Component, OnInit } from '@angular/core';
import { GameService } from '../shared/game.service';
import { BoardService } from '../board/board.service';
import { Select, Store } from '@ngxs/store';
import { GameState } from '../store/game/game.state';
import { Observable } from 'rxjs';
import { RED_PLAYER, YELLOW_PLAYER } from '../shared/constants';
import { GameSettingsModel, GameSettingsState } from '../store/game-settings/game-settings.state';

@Component({
  selector: 'app-information-panel',
  templateUrl: './information-panel.component.html',
  styleUrls: ['./information-panel.component.scss']
})
export class InformationPanelComponent implements OnInit {
  @Select(GameState.getActivePlayer) activePlayer$: Observable<string>;

  activePlayerName: string;

  constructor(
    private gameSvc: GameService,
    private boardSvc: BoardService,
    private store: Store) { }

  ngOnInit() {
    this.activePlayer$.subscribe(player => {
      const gameState = this.store.selectSnapshot<GameSettingsModel>(GameSettingsState);

      switch (player) {
        case RED_PLAYER:
          this.activePlayerName = gameState.redPlayerName;
          break;

        case YELLOW_PLAYER:
          this.activePlayerName = gameState.yellowPlayerName;
          break;

        default:
          break;
      }
    });
  }

  restart() {
    this.gameSvc.start();
    this.boardSvc.initializeBoard();
  }
}
