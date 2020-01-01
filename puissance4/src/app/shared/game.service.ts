import { Injectable } from '@angular/core';
import { Store } from '@ngxs/store';
import { RestartTheGame } from '../store/game/game.actions';

@Injectable({
  providedIn: 'root'
})
export class GameService {

  constructor(private store: Store) { }

  restart() {
    this.store.dispatch(new RestartTheGame());
  }
}
