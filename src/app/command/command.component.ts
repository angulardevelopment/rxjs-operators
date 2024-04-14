import { Component, OnInit, VERSION } from "@angular/core";
import { BehaviorSubject, Subject, TimeoutError, timer } from "rxjs";
import {
  delay,
  filter,
  finalize,
  first,
  mergeMap,
  switchMap,
  takeUntil,
  tap
} from "rxjs/operators";

@Component({
  selector: "app-command",
  templateUrl: "./command.component.html",
  styleUrls: ["./command.component.css"]
})
export class CommandComponent implements OnInit {
  public readonly name = "Angular " + VERSION.major;

  public command$ = new Subject<boolean>();
  public commandDisabled$ = new BehaviorSubject<boolean>(false);

  public otherCommand$ = new Subject<number>();
  public otherCommandDisabled$ = new BehaviorSubject<boolean>(false);

  private _destroyed$ = new Subject<void>();

  public ngOnInit(): void {
    this.command$
      .pipe(
        tap(() => this.commandDisabled$.next(true)),
        mergeMap(() => timer(2000)),
        tap(() => {
          console.log("I have done executing");
        }),
        finalize(() => this.commandDisabled$.next(false)),
        takeUntil(this._destroyed$)
      )
      .subscribe();

    this.otherCommand$
      .pipe(
        tap(() => this.otherCommandDisabled$.next(true)),
        mergeMap((num) =>
          timer(2000).pipe(
            tap(() => {
              console.log("I have done executing with param ", num);
            })
          )
        ),
        finalize(() => this.otherCommandDisabled$.next(false)),
        takeUntil(this._destroyed$)
      )
      .subscribe();
  }

  public ngOnDestroy(): void {
    this._destroyed$.next(undefined);
    this._destroyed$.complete();
  }
}
