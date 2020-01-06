import { Component, OnInit } from '@angular/core';
import { Select } from '@ngxs/store';
import { GameSettingsState, GameSettingsModel } from '../store/game-settings/game-settings.state';
import { Observable } from 'rxjs';
import { GameState } from '../store/game/game.state';
import { RED_PLAYER, YELLOW_PLAYER } from '../shared/constants';

@Component({
  selector: 'app-players-bar',
  templateUrl: './players-bar.component.html',
  styleUrls: ['./players-bar.component.scss']
})
export class PlayersBarComponent implements OnInit {
  @Select(GameSettingsState) gameSettings$: Observable<GameSettingsModel>;
  @Select(GameState.getActivePlayer) activePlayer$: Observable<string>;

  isRedPlayerActive: boolean;
  isYellowPlayerActive: boolean;

  constructor() { }

  ngOnInit() {
    this.activePlayer$.subscribe(player => {
      this.isRedPlayerActive = player === RED_PLAYER;
      this.isYellowPlayerActive = player === YELLOW_PLAYER;
    });
  }

}
