import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Store } from '@ngxs/store';
import { GameSettingsForm } from '../../models/game-settings-form.model';
import { GameSettingsModel, GameSettingsState } from '../../store/game-settings/game-settings.state';
import { AvatarSelectionDialogComponent } from '../avatar-selection-dialog/avatar-selection-dialog.component';

export interface NewGameDialogParams {
  firstGame: boolean;
  loadPreviousSettings: boolean;
}

@Component({
  selector: 'app-new-game-dialog',
  templateUrl: './new-game-dialog.component.html',
  styleUrls: ['./new-game-dialog.component.scss']
})
export class NewGameDialogComponent implements OnInit {
  gameSettingsForm = this.fb.group({
    redPlayerAvatar: [1, Validators.required],
    redPlayerName: ['', Validators.required],
    yellowPlayerAvatar: [1, Validators.required],
    yellowPlayerName: ['', Validators.required],
    maxRounds: [3, [Validators.required, Validators.min(1), Validators.max(30)]]
  });

  constructor(
    public dialogRef: MatDialogRef<NewGameDialogComponent>,
    private fb: FormBuilder,
    public dialog: MatDialog,
    private store: Store,
    @Inject(MAT_DIALOG_DATA) public params: NewGameDialogParams) { }

  ngOnInit() {
    if (this.params.loadPreviousSettings) {
      const gameSettings = this.store.selectSnapshot<GameSettingsModel>(GameSettingsState);
      this.gameSettingsForm.patchValue({
        redPlayerAvatar: gameSettings.redPlayerAvatarId,
        redPlayerName: gameSettings.redPlayerName,
        yellowPlayerAvatar: gameSettings.yellowPlayerAvatarId,
        yellowPlayerName: gameSettings.yellowPlayerName,
        maxRounds: gameSettings.maxRounds
      });
    }
  }

  openAvatarSelectionDialog(formControlName: string) {
    const dialogRef = this.dialog.open(AvatarSelectionDialogComponent, {
      autoFocus: true,
      hasBackdrop: true
    });

    dialogRef.afterClosed().subscribe((avatarId: number) => {
      if (avatarId) {
        this.gameSettingsForm.patchValue({
          [formControlName]: avatarId
        });
      }
    });
  }

  getAvatarImagePath(formControlName: string) {
    const avatarId = this.gameSettingsForm.get(formControlName).value;
    return `./assets/images/avatars/64_${avatarId}.png`;
  }

  onSubmit() {
    this.dialogRef.close(new GameSettingsForm(this.gameSettingsForm.value));
  }

}
