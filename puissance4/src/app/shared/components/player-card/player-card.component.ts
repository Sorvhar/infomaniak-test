import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-player-card',
  templateUrl: './player-card.component.html',
  styleUrls: ['./player-card.component.scss']
})
export class PlayerCardComponent implements OnInit, OnChanges {
  @Input() playerType: 'red' | 'yellow';
  @Input() playerName: string;
  @Input() avatarId: number;
  @Input() isActive: boolean;
  @Input() playerWins: number;
  @Input() alignRight = false;
  @Input() verticalOrientation = false;
  @Input() hideWinsCounter = false;

  wins = [];

  constructor() { }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.playerWins && (changes.playerWins.currentValue !== changes.playerWins.previousValue)) {
      this.wins = Array(changes.playerWins.currentValue);
    }
  }

  getCardClasses() {
    return {
      'player__card--right': this.alignRight,
      'player__card--inactive': !this.isActive,
      'player__card--vertical': this.verticalOrientation
    };
  }

  getNameClasses() {
    return {
      'player__name--red': this.playerType === 'red',
      'player__name--yellow': this.playerType === 'yellow'
    };
  }
}
