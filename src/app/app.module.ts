import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { PatternComponent } from "./pattern/pattern.component";
import { CommandComponent } from "./command/command.component";
import { TestComponent } from './test/test.component';
import { SearchComponent } from './search/search.component';
import { FormsModule } from "@angular/forms";

import { SmartComponent, SmartStateComponent } from "./smart/smart.component";
import { DumbComponent } from "./dumb/dumb.component";
import { SmartStoreDirective } from "./smart/smart-store.directive";
import { SmartStoreComponent } from "./smart/smart-store.component";
import { Dumb1Component } from "./dumb/dumb1/dumb1.component";
import { Dumb2Component } from "./dumb/dumb1/dumb2/dumb2.component";
import { Dumb3Component } from "./dumb/dumb1/dumb3/dumb3.component";
import { SignalsComponent } from './signals/signals.component';
@NgModule({
  declarations: [AppComponent, PatternComponent, CommandComponent, TestComponent, SearchComponent,
    SmartComponent,
    SmartStateComponent,
    SmartStoreDirective,
    SmartStoreComponent,
    DumbComponent,
    Dumb1Component,
    Dumb2Component,
    Dumb3Component,
    SignalsComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule, FormsModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
