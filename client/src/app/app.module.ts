import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderBarComponent } from './header-bar/header-bar.component';
import { AngularSetupComponent } from './angular-setup/angular-setup.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTabsModule } from "@angular/material/tabs";
import { TicTacToeComponent } from './tic-tac-toe/tic-tac-toe.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderBarComponent,
    AngularSetupComponent,
    TicTacToeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatTabsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
