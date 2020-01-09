import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Select } from '@ngxs/store';
import { Observable } from 'rxjs';
import { GameSettingsModel, GameSettingsState } from '../../store/game-settings/game-settings.state';
import { GameModel, GameState } from '../../store/game/game.state';

export interface GameOverDialogParams {
  winnerName: string;
}

@Component({
  selector: 'app-game-over-dialog',
  templateUrl: './game-over-dialog.component.html',
  styleUrls: ['./game-over-dialog.component.scss']
})
export class GameOverDialogComponent implements OnInit {
  @Select(GameState) game$: Observable<GameModel>;
  @Select(GameSettingsState) gameSettings$: Observable<GameSettingsModel>;

  constructor(
    public dialogRef: MatDialogRef<GameOverDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public params: GameOverDialogParams) { }

  ngOnInit() {
  }
}
