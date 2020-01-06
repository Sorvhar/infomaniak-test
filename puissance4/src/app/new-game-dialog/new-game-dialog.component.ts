import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { GameSettings } from '../models/game-settings.model';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-new-game-dialog',
  templateUrl: './new-game-dialog.component.html',
  styleUrls: ['./new-game-dialog.component.scss']
})
export class NewGameDialogComponent implements OnInit {
  gameSettingsForm = this.fb.group({
    player1Name: ['jerome', Validators.required],
    player2Name: ['jessica', Validators.required]
  });

  constructor(
    public dialogRef: MatDialogRef<NewGameDialogComponent>,
    private fb: FormBuilder) { }

  ngOnInit() {
  }

  onSubmit() {
    this.dialogRef.close(new GameSettings(this.gameSettingsForm.value));
  }

}
