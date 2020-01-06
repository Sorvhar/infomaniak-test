import { Component, Input, OnInit, AfterViewInit } from '@angular/core';
import { RED_PLAYER, YELLOW_PLAYER } from 'src/app/shared/constants';
import { Select } from '@ngxs/store';
import { GameState } from 'src/app/store/game/game.state';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-player-card',
  templateUrl: './player-card.component.html',
  styleUrls: ['./player-card.component.scss']
})
export class PlayerCardComponent implements OnInit {
  @Select(GameState.getActivePlayer) activePlayer$: Observable<string>;

  @Input() playerType: 'red' | 'yellow';
  @Input() playerName: string;
  @Input() alignRight = false;
  @Input() avatarId: number;
  @Input() isActive: boolean;

  constructor() { }

  ngOnInit() {

  }

  getCardClasses() {
    return {
      'player__card--right': this.alignRight,
      'player__card--inactive': !this.isActive
    };
  }

  getNameClasses() {
    return {
      'player__name--red': this.playerType === 'red',
      'player__name--yellow': this.playerType === 'yellow'
    };
  }
}
