import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngxs/store';
import { GameSettingsForm } from '../models/game-settings-form.model';
import { NewGameDialogComponent } from '../new-game-dialog/new-game-dialog.component';
import { ResetBoard } from '../store/board/board.actions';
import { SetGameSettings } from '../store/game-settings/game-settings.actions';
import { StartTheGame } from '../store/game/game.actions';

@Injectable({
  providedIn: 'root'
})
export class GameService {

  constructor(
    private store: Store,
    public dialog: MatDialog) { }

  restart() {
    this.store.dispatch([
      new StartTheGame(),
      new ResetBoard()
    ]);
  }

  newGame(firstGame: boolean) {
    const dialogRef = this.dialog.open(NewGameDialogComponent, {
      autoFocus: true,
      disableClose: firstGame,
      hasBackdrop: true,
      data: {
        firstGame
      }
    });

    dialogRef.afterClosed().subscribe((result: GameSettingsForm) => {
      if (result) {
        this.store.dispatch(new SetGameSettings(result)).subscribe(() => {
          const actions = [new StartTheGame()];
          if (!firstGame) {
            actions.push(new ResetBoard());
          }
          this.store.dispatch(actions);
        });
      }
    });
  }
}
