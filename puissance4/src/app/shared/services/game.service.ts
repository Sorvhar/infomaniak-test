import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { filter } from 'rxjs/operators';
import { GameOverDialogComponent, GameOverDialogParams } from '../components/game-over-dialog/game-over-dialog.component';
import { NewGameDialogComponent, NewGameDialogParams } from '../components/new-game-dialog/new-game-dialog.component';
import { GameSettingsForm } from '../models/game-settings-form.model';
import { ResetBoard } from '../store/board/board.actions';
import { SetGameSettings } from '../store/game-settings/game-settings.actions';
import { StartNewGame, StartRound } from '../store/game/game.actions';
import { GameModel, GameState } from '../store/game/game.state';

@Injectable({
  providedIn: 'root'
})
export class GameService {
  @Select(GameState.gameOver) gameOver$: Observable<boolean>;

  constructor(
    private store: Store,
    public dialog: MatDialog) {
    this.gameOver$
      .pipe(filter(x => x === true))
      .subscribe(gameOver => {
        this.gameOver();
      });
  }

  newGame(firstGame: boolean, loadPreviousSettings: boolean = false) {
    const dialogRef = this.dialog.open(NewGameDialogComponent, {
      disableClose: firstGame,
      hasBackdrop: true,
      data: {
        firstGame,
        loadPreviousSettings
      } as NewGameDialogParams
    });

    dialogRef.afterClosed()
      .pipe(filter(result => result)) // Proceed only if a value is returned from the dialog
      .subscribe((result: GameSettingsForm) => {
        this.store.dispatch(new SetGameSettings(result)).subscribe(() => {
          const actions = [new StartNewGame(), new StartRound()];
          if (!firstGame) {
            actions.push(new ResetBoard());
          }
          this.store.dispatch(actions);
        });
      });
  }

  startRound() {
    this.store.dispatch([new StartRound(), new ResetBoard()]);
  }

  gameOver() {
    const game = this.store.selectSnapshot<GameModel>(GameState);

    const dialogRef = this.dialog.open(GameOverDialogComponent, {
      disableClose: true,
      hasBackdrop: true,
      data: {
        winnerName: game.activePlayer.name
      } as GameOverDialogParams
    });

    dialogRef.afterClosed()
      .pipe(filter((newGame: boolean) => newGame === true))
      .subscribe((newGame: boolean) => {
        this.newGame(false, true);
      });
  }
}
