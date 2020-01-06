import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-player-card',
  templateUrl: './player-card.component.html',
  styleUrls: ['./player-card.component.scss']
})
export class PlayerCardComponent implements OnInit {
  @Input() playerName: string;
  @Input() alignRight = false;
  @Input() avatarId: number;

  constructor() { }

  ngOnInit() {
  }

  getCardClass() {
    return this.alignRight ? 'player__card--right' : '';
  }
}
