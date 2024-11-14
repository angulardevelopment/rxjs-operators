import { Component, ChangeDetectionStrategy, OnInit } from "@angular/core";
import { firstValueFrom, take } from "rxjs";
import * as Rx from "rxjs";

@Component({
  selector: "app-dumb",
  templateUrl: "./dumb.component.html",
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DumbComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
  
  ops(){
    // firstValueFrom turns Observable into a Promise so you can use async/await:
    const value = await firstValueFrom(myStore$.pipe(
      take(1)
    ));
    // Basically using take(1) or firstValueFrom is the same because they access the value asynchronously:
    myStore$.pipe(
      take(1)
    ).subscribe(value => {...});



const observable = Rx.Observable.fromEvent(document, 'click');

// subscription 1
observable.subscribe((event) => {
console.log(event.clientX); // x position of click
});

// subscription 2
observable.subscribe((event) => {
console.log(event.clientY); // y position of click
});

import { of, map } from 'rxjs';

of(1, 2, 3)
.pipe(map((x) => x * x))
.subscribe((v) => console.log(value: ${v}));
  }
}
