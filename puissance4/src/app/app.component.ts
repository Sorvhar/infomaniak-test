import { Component, OnInit } from '@angular/core';
import { AVATAR_LIST } from './shared/constants';
import { GameService } from './shared/services/game.service';
import { ThemeService } from './shared/services/theme.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  constructor(
    private themeSvc: ThemeService,
    private gameSvc: GameService) { }

  ngOnInit() {
    this.themeSvc.isDarkTheme.subscribe(isDarkTheme => {
      if (isDarkTheme) {
        document.body.classList.add('dark-theme');
      } else {
        document.body.classList.remove('dark-theme');
      }
    });

    this.initAvatarList();

    this.themeSvc.loadUserTheme();

    this.gameSvc.newGame(true);
  }

  private initAvatarList() {
    for (let i = 1; i <= 16; i++) {
      AVATAR_LIST.push(i);
    }
  }
}
