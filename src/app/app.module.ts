import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';

import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatInputModule } from '@angular/material/input';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatDialogModule, MAT_DIALOG_DEFAULT_OPTIONS } from '@angular/material/dialog';

import { ImgCardComponent } from './img-card/img-card.component';
import { UserTxtInputComponent } from './user-txt-input/user-txt-input.component';
import { FinishDialogComponent } from './finish-dialog/finish-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    ImgCardComponent,
    UserTxtInputComponent,
    FinishDialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatSlideToggleModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatGridListModule,
    MatInputModule,
    FormsModule,
    MatDialogModule,
    MatToolbarModule
  ],
  providers: [

  ],
  bootstrap: [AppComponent],
  entryComponents: [
    FinishDialogComponent
  ]
})
export class AppModule {

 }

export interface DialogData {
  score: 0;
}
