import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SignalsComponent } from './signals/signals.component';
import { SearchComponent } from './search/search.component';
import { TestComponent } from './test/test.component';
import { PatternComponent } from './pattern/pattern.component';

const routes: Routes = [{path:'SignalsComponent', component: SignalsComponent},
  {path:'SearchComponent', component: SearchComponent},
  {path:'TestComponent', component: TestComponent},
  {path:'PatternComponent', component: PatternComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
