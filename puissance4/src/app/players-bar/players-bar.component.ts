import { Component, OnInit } from '@angular/core';
import { Select } from '@ngxs/store';
import { Observable } from 'rxjs';
import { RED_PLAYER, YELLOW_PLAYER } from '../shared/constants';
import { GameSettingsModel, GameSettingsState } from '../store/game-settings/game-settings.state';
import { GameModel, GameState } from '../store/game/game.state';

@Component({
  selector: 'app-players-bar',
  templateUrl: './players-bar.component.html',
  styleUrls: ['./players-bar.component.scss']
})
export class PlayersBarComponent implements OnInit {
  @Select(GameSettingsState) gameSettings$: Observable<GameSettingsModel>;
  @Select(GameState) game$: Observable<GameModel>;

  isRedPlayerActive: boolean;
  isYellowPlayerActive: boolean;

  constructor() { }

  ngOnInit() {
    this.game$.subscribe(game => {
      this.isRedPlayerActive = game.activePlayer === RED_PLAYER;
      this.isYellowPlayerActive = game.activePlayer === YELLOW_PLAYER;
    });
  }

}
