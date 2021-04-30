import {
  isObservable,
  Observable,
  of,
  ReplaySubject,
  Subject,
  Subscription
} from "rxjs";
import { finalize, takeUntil, tap } from "rxjs/operators";

export class CustomCommand<TExecute> {
  execute: Observable<TExecute>;

  private $canExecute = new ReplaySubject<boolean>(1);
  private $unsubscribe = new Subject();

  private canExecuteSubscription: Subscription;
  private executeSubscription?: Subscription | null;

  constructor(
    execute: Observable<TExecute>,
    canExecute: Observable<boolean> = of(true)
  ) {
    this.execute = execute;
    this.canExecuteSubscription = canExecute.subscribe(
      this.$canExecute.next.bind(this.$canExecute)
    );
  }

  get canExecute$(): Observable<boolean> {
    return this.$canExecute.asObservable();
  }

  get unsubscribe$() {
    return this.$unsubscribe.asObservable();
  }

  invoke() {
    if (this.executeSubscription != null) {
      this.executeSubscription.unsubscribe();
      this.executeSubscription = null;
    }

    this.$canExecute.next(false);
    this.executeSubscription = this.execute
      .pipe(
        tap(() => this.$canExecute.next(true)),
        finalize(() => this.$canExecute.next(true))
      )
      .subscribe();
  }

  unsubscribe() {
    this.canExecuteSubscription?.unsubscribe();
    this.executeSubscription?.unsubscribe();
    this.$unsubscribe.next();
    this.$unsubscribe.complete();
  }
}

export function createCustomCommand<
  // This type quickly became part of effect 'API'
  ProvidedType = void,
  // The actual origin$ type, which could be unknown, when not specified
  OriginType extends Observable<ProvidedType> | unknown = Observable<
    ProvidedType
  >,
  // Unwrapped actual type of the origin$ Observable, after default was applied
  ObservableType = OriginType extends Observable<infer A> ? A : never,
  ExecuteType = ProvidedType | ObservableType extends void
    ? () => void
    : (observableOrValue: ObservableType | Observable<ObservableType>) => void,
  // Return either an empty callback or a function requiring specific types as inputs
  ReturnType = {
    execute: ExecuteType;
    canExecute$: Observable<boolean>;
    unsubscribe: () => void;
  },
  TExecute = unknown
>(
  generator: (origin$: OriginType) => Observable<TExecute>,
  canExecute?: Observable<boolean>
): ReturnType {
  const origin$ = new Subject<ObservableType>();
  const command = new CustomCommand(
    generator(origin$ as OriginType),
    canExecute
  );
  const execute = (((
    observableOrValue?: ObservableType | Observable<ObservableType>
  ) => {
    command.invoke();
    const observable$ = isObservable(observableOrValue)
      ? observableOrValue
      : of(observableOrValue);
    observable$.pipe(takeUntil(command.unsubscribe$)).subscribe((value) => {
      origin$.next(value);
    });
  }) as unknown) as ExecuteType;

  return ({
    execute,
    canExecute$: command.canExecute$,
    unsubscribe: command.unsubscribe
  } as unknown) as ReturnType;
}
