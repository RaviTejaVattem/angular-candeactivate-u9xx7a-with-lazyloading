import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";

import {
  AppComponent,
  RootRoutingModule,
  AComponent,
  BComponent,
  CComponent
} from "./app.component";

import { LazyModule } from "./lazy.module";

@NgModule({
  imports: [BrowserModule, RootRoutingModule, LazyModule],
  declarations: [AppComponent, AComponent, BComponent, CComponent],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
