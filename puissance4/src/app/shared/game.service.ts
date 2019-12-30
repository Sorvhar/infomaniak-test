import { Injectable } from '@angular/core';
import { Store } from '@ngxs/store';
import { ResetTheGame } from '../store/game/game.actions';

@Injectable({
  providedIn: 'root'
})
export class GameService {

  constructor(private store: Store) { }

  resetTheGame() {
    this.store.dispatch(new ResetTheGame());
  }
}
