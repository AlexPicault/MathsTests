;
import { HomeComponent } from './home/home.component'
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { OpService } from "../services/operations";
import { GridService } from "../services/grid";

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
  ],
  imports: [
    BrowserModule
  ],
  providers: [
    OpService,
    GridService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
