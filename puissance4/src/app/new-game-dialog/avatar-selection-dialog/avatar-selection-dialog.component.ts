import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { AVATAR_LIST } from 'src/app/shared/constants';

@Component({
  selector: 'app-avatar-selection-dialog',
  templateUrl: './avatar-selection-dialog.component.html',
  styleUrls: ['./avatar-selection-dialog.component.scss']
})
export class AvatarSelectionDialogComponent implements OnInit {
  readonly avatarIds = AVATAR_LIST;

  constructor(
    public dialogRef: MatDialogRef<AvatarSelectionDialogComponent>) { }

  ngOnInit() {

  }

  selectAvatar(id: number) {
    this.dialogRef.close(id);
  }
}
