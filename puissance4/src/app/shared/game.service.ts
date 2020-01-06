import { Injectable } from '@angular/core';
import { Store } from '@ngxs/store';
import { StartTheGame } from '../store/game/game.actions';

@Injectable({
  providedIn: 'root'
})
export class GameService {

  constructor(private store: Store) { }

  start() {
    this.store.dispatch(new StartTheGame());
  }
}
