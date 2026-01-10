import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { firstValueFrom, take } from 'rxjs';
import * as Rx from 'rxjs';
import { of, map, fromEvent } from 'rxjs';

@Component({
  selector: 'app-dumb',
  templateUrl: './dumb.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false,
})
export class DumbComponent implements OnInit {
  constructor() {}

  ngOnInit() {}


}
