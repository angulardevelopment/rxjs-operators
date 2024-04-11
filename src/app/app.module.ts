import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { PatternComponent } from "./pattern/pattern.component";
import { BasicComponent } from "./basic/basic.component";
import { TestComponent } from './test/test.component';
import { SearchComponent } from './search/search.component';
import { FormsModule } from "@angular/forms";

@NgModule({
  declarations: [AppComponent, PatternComponent, BasicComponent, TestComponent, SearchComponent],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule, FormsModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
