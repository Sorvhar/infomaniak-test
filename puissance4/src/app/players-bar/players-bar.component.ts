import { Component, OnInit } from '@angular/core';
import { Select } from '@ngxs/store';
import { GameSettingsState, GameSettingsModel } from '../store/game-settings/game-settings.state';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-players-bar',
  templateUrl: './players-bar.component.html',
  styleUrls: ['./players-bar.component.scss']
})
export class PlayersBarComponent implements OnInit {
  @Select(GameSettingsState) gameSettings$: Observable<GameSettingsModel>;

  constructor() { }

  ngOnInit() {
  }

}
