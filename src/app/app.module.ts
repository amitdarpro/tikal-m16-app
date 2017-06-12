import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { MissionsDataService } from "./services/missions-data.service";
import { CountryComponent } from './country/country.component';

@NgModule({
  declarations: [
    AppComponent,
    CountryComponent,
  ],
  imports: [
    BrowserModule
  ],
  providers: [MissionsDataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
