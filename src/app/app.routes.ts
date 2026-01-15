// src/app/app.routes.ts
import { Routes } from '@angular/router';
import { SignalsComponent } from './signals/signals.component';
import { TestComponent } from './test/test.component';
import { PatternComponent } from './pattern/pattern.component';
import { TipsAndTricksComponent } from './tips-and-tricks/tips-and-tricks.component';
import { SmartComponent } from './smart/smart.component';
import { CommandComponent } from './command/command.component';
export const routes: Routes = [
  // Add your routes here
  { path: 'SignalsComponent', component: SignalsComponent },
  { path: '', component: TestComponent },
  { path: 'PatternComponent', component: PatternComponent },
  { path: 'TipsAndTricksComponent', component: TipsAndTricksComponent },
  { path: 'SmartComponent', component: SmartComponent },
  { path: 'CommandComponent', component: CommandComponent },
];
