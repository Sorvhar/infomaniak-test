import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngxs/store';
import { GameSettingsForm } from './models/game-settings-form.model';
import { NewGameDialogComponent } from './new-game-dialog/new-game-dialog.component';
import { ThemeService } from './shared/theme.service';
import { SetGameSettings } from './store/game-settings/game-settings.actions';
import { StartTheGame } from './store/game/game.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  constructor(
    private store: Store,
    public dialog: MatDialog,
    private themeSvc: ThemeService) { }

  ngOnInit() {
    this.themeSvc.isDarkTheme.subscribe(isDarkTheme => {
      if (isDarkTheme) {
        document.body.classList.add('dark-theme');
      } else {
        document.body.classList.remove('dark-theme');
      }
    });

    this.themeSvc.loadUserTheme();

    this.openNewGameDialog();
  }

  openNewGameDialog() {
    const dialogRef = this.dialog.open(NewGameDialogComponent, {
      autoFocus: true,
      disableClose: true,
      hasBackdrop: true
    });

    dialogRef.afterClosed().subscribe((result: GameSettingsForm) => {
      this.store.dispatch(new SetGameSettings(result)).subscribe(() => {
        this.store.dispatch(new StartTheGame());
      });
    });
  }
}
