import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { GameSettingsForm } from '../models/game-settings-form.model';
import { AvatarSelectionDialogComponent } from './avatar-selection-dialog/avatar-selection-dialog.component';

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

  firstGame: boolean;

  constructor(
    public dialogRef: MatDialogRef<NewGameDialogComponent>,
    private fb: FormBuilder,
    public dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
    this.firstGame = this.data.firstGame;
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
