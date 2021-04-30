import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { PatternComponent } from "./pattern/pattern.component";
import { BasicComponent } from "./basic/basic.component";

@NgModule({
  declarations: [AppComponent, PatternComponent, BasicComponent],
  imports: [BrowserModule, AppRoutingModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
