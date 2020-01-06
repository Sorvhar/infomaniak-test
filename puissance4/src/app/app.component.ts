import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { NewGameDialogComponent } from './new-game-dialog/new-game-dialog.component';
import { Store } from '@ngxs/store';
import { SetGameSettings } from './store/game-settings/game-settings.actions';
import { GameSettingsForm } from './models/game-settings-form.model';
import { StartTheGame } from './store/game/game.actions';

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

    dialogRef.afterClosed().subscribe((result: GameSettingsForm) => {
      this.store.dispatch(new SetGameSettings(result)).subscribe(
        () => {
          this.store.dispatch(new StartTheGame());
        }
      );
    });
  }
}
