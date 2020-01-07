import { LayoutModule } from '@angular/cdk/layout';
import { TitleCasePipe } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';
import { NgxsLoggerPluginModule } from '@ngxs/logger-plugin';
import { NgxsModule } from '@ngxs/store';
import { environment } from 'src/environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AddTokenDirective } from './board/add-token.directive';
import { BoardComponent } from './board/board.component';
import { HeaderComponent } from './header/header.component';
import { InformationPanelComponent } from './information-panel/information-panel.component';
import { NewGameDialogComponent } from './new-game-dialog/new-game-dialog.component';
import { PlayerCardComponent } from './players-bar/player-card/player-card.component';
import { PlayersBarComponent } from './players-bar/players-bar.component';
import { BoardState } from './store/board/board.state';
import { GameSettingsState } from './store/game-settings/game-settings.state';
import { GameState } from './store/game/game.state';


@NgModule({
  declarations: [
    AppComponent,
    BoardComponent,
    HeaderComponent,
    InformationPanelComponent,
    PlayerCardComponent,
    AddTokenDirective,
    NewGameDialogComponent,
    PlayersBarComponent,
  ],
  entryComponents: [
    NewGameDialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatCardModule,
    NgxsModule.forRoot([GameState, GameSettingsState, BoardState], {
      developmentMode: !environment.production
    }),
    NgxsReduxDevtoolsPluginModule.forRoot(),
    NgxsLoggerPluginModule.forRoot(),
    LayoutModule,
    MatToolbarModule,
    MatIconModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatTooltipModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    TitleCasePipe
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
