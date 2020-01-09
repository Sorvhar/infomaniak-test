import { Injectable } from '@angular/core';
import { ReplaySubject } from 'rxjs';
import { DARK_THEME_STORAGE_VALUE, THEME_STORAGE_KEY } from '../constants';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private darkThemeSource = new ReplaySubject<boolean>();
  isDarkTheme = this.darkThemeSource.asObservable();

  constructor() { }

  setTheme(isDarkTheme: boolean) {
    this.darkThemeSource.next(isDarkTheme);

    if (isDarkTheme) {
      localStorage.setItem(THEME_STORAGE_KEY, DARK_THEME_STORAGE_VALUE);
    } else {
      localStorage.removeItem(THEME_STORAGE_KEY);
    }
  }

  loadUserTheme() {
    const userTheme = localStorage.getItem(THEME_STORAGE_KEY);
    this.setTheme(userTheme === DARK_THEME_STORAGE_VALUE ? true : false);
  }
}
