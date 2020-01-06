import { Component, OnInit } from '@angular/core';
import { RED_PLAYER, ROWS, COLUMNS, YELLOW_PLAYER, REGEX_WIN_CONDITION } from './shared/constants';
import { MatDialog } from '@angular/material/dialog';
import { NewGameDialogComponent } from './new-game-dialog/new-game-dialog.component';
import { Store } from '@ngxs/store';
import { SetGameSettings } from './store/game-settings/game-settings.actions';
import { GameSettings } from './models/game-settings.model';
import { GameState } from './store/game/game.state';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  constructor(
    private store: Store,
    public dialog: MatDialog) { }


  ngOnInit() {
    const dialogRef = this.dialog.open(NewGameDialogComponent, {
      autoFocus: true,
      disableClose: true,
      hasBackdrop: true
    });

    dialogRef.afterClosed().subscribe((result: GameSettings) => {
      this.store.dispatch(new SetGameSettings(result));
    });
  }
}
