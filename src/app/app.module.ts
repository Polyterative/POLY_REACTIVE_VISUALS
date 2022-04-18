import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { GenerativeModule } from './components/generative/generative.module';
import { MainCanvasModule } from './components/generative/mainCanvas/main-canvas/main-canvas.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    RouterModule,
    GenerativeModule,
    MainCanvasModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
