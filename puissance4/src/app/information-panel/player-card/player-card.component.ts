import { Component, OnInit } from '@angular/core';
import { Select } from '@ngxs/store';
import { GameState } from 'src/app/store/game/game.state';
import { Observable } from 'rxjs';
import { RED_PLAYER, YELLOW_PLAYER } from 'src/app/shared/constants';

@Component({
  selector: 'app-player-card',
  templateUrl: './player-card.component.html',
  styleUrls: ['./player-card.component.scss']
})
export class PlayerCardComponent implements OnInit {
  @Select(GameState.getActivePlayer) activePlayer$: Observable<string>;

  badgeClass: any;

  constructor() { }

  ngOnInit() {
    this.activePlayer$.subscribe(value => {
      switch (value) {
        case RED_PLAYER:
          this.badgeClass = 'player__badge--active-r';
          break;

        case YELLOW_PLAYER:
          this.badgeClass = 'player__badge--active-y';
          break;

        default:
          break;
      }
    });
  }
}
