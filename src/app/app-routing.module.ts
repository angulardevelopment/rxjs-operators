import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SignalsComponent } from './signals/signals.component';
import { TestComponent } from './test/test.component';
import { PatternComponent } from './pattern/pattern.component';
import { TipsAndTricksComponent } from './tips-and-tricks/tips-and-tricks.component';
import { SmartComponent } from './smart/smart.component';
import { CommandComponent } from './command/command.component';

const routes: Routes = [
  { path: 'SignalsComponent', component: SignalsComponent },
  { path: 'TestComponent', component: TestComponent },
  { path: 'PatternComponent', component: PatternComponent },
  { path: 'TipsAndTricksComponent', component: TipsAndTricksComponent },
  {path: 'SmartComponent', component: SmartComponent},
  { path: 'CommandComponent', component: CommandComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
