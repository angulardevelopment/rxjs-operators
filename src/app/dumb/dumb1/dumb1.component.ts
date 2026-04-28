import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { SmartStoreComponent } from '../../smart/smart-store.component';
import { Dumb2Component } from './dumb2/dumb2.component';
import { Dumb3Component } from './dumb3/dumb3.component';

@Component({
  selector: 'app-dumb1',
  templateUrl: './dumb1.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [SmartStoreComponent, Dumb2Component, Dumb3Component],
})
export class Dumb1Component implements OnInit {
  constructor() {}

  ngOnInit() {}
}
