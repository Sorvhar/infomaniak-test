import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ThemeService } from '../shared/services/theme.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  isDarkTheme: Observable<boolean>;

  constructor(
    private themeSvc: ThemeService) { }

  ngOnInit() {
    this.isDarkTheme = this.themeSvc.isDarkTheme;
  }

  toggleDarkTheme(isDarkTheme: boolean) {
    this.themeSvc.setTheme(isDarkTheme);
  }

}
