import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { GameSettingsForm } from '../models/game-settings-form.model';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-new-game-dialog',
  templateUrl: './new-game-dialog.component.html',
  styleUrls: ['./new-game-dialog.component.scss']
})
export class NewGameDialogComponent implements OnInit {
  gameSettingsForm = this.fb.group({
    redPlayerName: ['jerome', Validators.required],
    yellowPlayerName: ['jessica', Validators.required]
  });

  constructor(
    public dialogRef: MatDialogRef<NewGameDialogComponent>,
    private fb: FormBuilder) { }

  ngOnInit() {
  }

  onSubmit() {
    this.dialogRef.close(new GameSettingsForm(this.gameSettingsForm.value));
  }

}
