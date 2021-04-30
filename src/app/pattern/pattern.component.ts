import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, timer } from "rxjs";
import { switchMap, tap } from "rxjs/operators";
import { createCustomCommand } from "./custom-command/custom-command";

@Component({
  selector: 'app-pattern',
  templateUrl: './pattern.component.html',
  styleUrls: ['./pattern.component.scss']
})
export class PatternComponent {

  constructor() {
  }

  $disabled = new BehaviorSubject<boolean>(false);

  command = createCustomCommand(() =>
    timer(2000).pipe(
      tap(() => {
        console.log("I have done executing");
      })
    )
  );

  otherCommand = createCustomCommand<number>(
    num$ =>
      num$.pipe(
        switchMap(num =>
          timer(2000).pipe(
            tap(() => {
              console.log("I have done executing with param ", num);
            })
          )
        )
      ),
    this.$disabled
  );
}
