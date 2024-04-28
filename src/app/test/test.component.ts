import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import {
  catchError, from, observable, range, delay, filter,
  combineLatest,  switchMap,mergeMap,fromEvent,exhaustMap,
  concatMap,
  interval,
  map,
  Observable,
  of,
  Subject,
  take,
  tap,
  timer,
  defer,
  takeUntil,
} from 'rxjs';

import { fromFetch } from 'rxjs/fetch';
@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss']
})
export class TestComponent implements OnInit {
  @ViewChild('saveButton') saveButton: ElementRef;

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.hgvjh();
  }

  ngAfterViewInit() {
    this.exhaEg();
  }

  hgvjh() {
    observable

    delay(150),

      tap(() => {

        console.log("Hello from setTimeout1");

      }),

      delay(300),

      tap(() => {

        console.log("Hello from setTimeout2");

      })

    console.log("Hello from functionNr1 before setTimeout in code");

    setTimeout(() => {

      console.log("Hello from setTimeout");

    }, 1000);

    let fakeResponse = [1, 2, 3];

    let delayedObservable = of(fakeResponse);

    (delayedObservable).pipe(

      delay(150),

      tap(() => {

        console.log("Hello from setTimeout1");

      }),

      delay(300),

      tap(() => {

        console.log("Hello from setTimeout2");

      })

    );

    range(1, 5)

      .pipe(filter(x => x % 2 === 1), map(x => x + x))

      .subscribe(x => console.log(x));


    delay(150), tap(

      () => console.log('150')

    )

    delay(300), tap(

      () => console.log('300')

    );
  }

  tapUsage() {
    const http$: Observable<any> = this.http.get(
      'https://jsonplaceholder.typicode.com/posts'
    );
    http$
      .pipe(
        tap(() => console.log('HTTP request executed')),
        catchError((err) => err),
        map((res) => Object.values(res))
      )
      .subscribe((courses) => console.log('courses', courses));
  }

  combineLatestUsage() {
    // 1. Define multiple observables
    let color = of('Black', 'Red', 'Blue');
    let brand = of('Jaguar', 'Ford', 'BMW');
    let price = of(100, 200, 300);

    // 2. Call combineLatest operator, inject multiple observables in array
    const joinStream = combineLatest(color, brand, price);

    // 3. Subscibe combineLatest observable
    const subscribe = joinStream.subscribe(([color, brand, price]) => {
      console.log(color + ' ' + brand + ' ' + 'costed me' + ' ' + price);
    });
  }

  catchErrorUsage() {
    of(1, 2, 3, 4, 5)
      .pipe(
        map((n) => {
          if (n === 4) {
            throw 'four!';
          }
          return n;
        }),
        catchError((err) => of('I', 'II', 'III', 'IV', 'V'))
      )
      .subscribe((x) => console.log(x));
  }

  customOperator() {
    let source = of('Black', 'Red', 'Blue');

    source
      .pipe(tap((val) => console.log(val)))
      .subscribe((courses) => console.log('courses', courses));
    function basicCustomOperator<T>() {
      return function (source: Observable<T>) {
        return source;
      };
    }
    source.pipe(basicCustomOperator());
  }


  fvdfvdf() {
    // timer(0, 1000).subscribe(n => console.log('timer', n));
    // interval(1000).subscribe(n => console.log('interval', n));

    const intervalCount = interval(1000);
    const takeFive = intervalCount.pipe(take(3));
    takeFive.subscribe(x => console.log(x));



    const source = of(1, 2, 3);
    timer(3000)
      .pipe(concatMap(() => source))
      .subscribe(x => console.log('source'));

    timer(0, 1000).pipe(
      take(3),
      map((secondsElapsed: number) => { return 3 - secondsElapsed; })
    )
      .pipe(
    )
      .subscribe((secondsLeft: number) => {
        console.log(secondsLeft, 'secondsLeft')

      })
  }

  awesomeMapping() {
    const namesObservable = of('Pete', 'Mike');
    namesObservable
      .pipe(map((name) => `${name} is awesome!`))
      .subscribe((result) => console.log(`${result}`));
    // CONSOLE:
    // Pete is awesome!
    // Mike is awesome!
  }

  Flattening() {
    // subscribing inside a subscribe
    const namesObservable = of('Pete', 'Mike');

    namesObservable
      .pipe(map((name) => this.getAwesomeMessagesObservable(name)))
      .subscribe((resultObservable) => {
        resultObservable.subscribe((result) => console.log(`${result}`));
      });
  }

  getAwesomeMessagesObservable(name): Observable<string> {
    return of(`${name} is awesome! (msg #1)`, `${name} is awesome! (msg #2)`);
  }

  // mergeMap is a combination of Observable merge and map. There are times when your map or projection will generate multiple Observables. For example, now I have an array of characters, and for each character, I would like to make a backend call and get some information.
  // mergemap: With this, you will not get data in sequence.
  MappingFlattening() {
    const namesObservable = of('Pete', 'Mike');

    namesObservable
      .pipe(mergeMap((name) => this.getAwesomeMessagesObservable(name)))
      .subscribe((resultObservable) => {
        console.log(resultObservable);
      });
  }

  // it cancels the request immediately and emits the latest values.
  switchMapFlattening() {
    const frameworkTweetsObservable = from(['Backbone', 'Angular']).pipe(
      tap((fwName) => console.log(`*** "${fwName}" tweet pops up ***`))
    );
    frameworkTweetsObservable
      .pipe(
        map((framework) => {
          from(['c', 'd']);
        }),
        switchMap((agency) => from(['e', 'f']))
      )
      .subscribe((recruit) => console.log(recruit));
  }

  switchEg() {
    const urls = [
      'https://jsonplaceholder.typicode.com/todos/1',
      'https://jsonplaceholder.typicode.com/todos/2',
    ];

    from(urls)
      .pipe(
        switchMap((url) => {
          return fromFetch(url);
        })
      )
      .subscribe((response) => console.log(response));
  }

  // get the data in sequence.
  concatMapFlattening() {
    const frameworkTweetsObservable = from(['Backbone', 'Angular']).pipe(
      tap((fwName) => console.log(`*** "${fwName}" tweet pops up ***`))
    );
    frameworkTweetsObservable
      .pipe(
        map((framework) => from(['c', 'd'])),
        concatMap((agency) => from(['e', 'f']))
      )
      .subscribe((recruit) => console.log(recruit));
  }

  concatmp() {
    const urls = [
      'https://jsonplaceholder.typicode.com/todos/1',
      'https://jsonplaceholder.typicode.com/todos/2',
    ];

    from(urls)
      .pipe(
        concatMap((url) => {
          return fromFetch(url);
        })
      )
      .subscribe((response) => console.log(response.status));
  }

  // disbale first http request   like login system
  exhaustMapFlattening() {
    const frameworkTweetsObservable = from(['Backbone', 'Angular']).pipe(
      tap((fwName) => console.log(`*** "${fwName}" tweet pops up ***`))
    );
    frameworkTweetsObservable
      .pipe(
        map((framework) => from(['c', 'd'])),
        exhaustMap((agency) => from(['e', 'f']))
      )
      .subscribe((recruit) => console.log(recruit, 'rec'));
  }

  //  map(framework => getAgency(framework) ),
  //   exhaustMap(agency => agency.getRecruitsObservable() )

  exhaEg() {
    fromEvent(this.saveButton.nativeElement, 'click')
      .pipe(exhaustMap(() => this.saveCourse('a')))
      .subscribe(console.log);
  }

  saveCourse(a) {
    // console.log(a);
    return a;
  }

  ofvsmap() {
    of([1, 2, 3]).subscribe((x) => console.log(x));
    from([1, 2, 3]).subscribe((x) => console.log(x));
  }

  // closure example
//  function basicCustomOperator<T>() {
//   return function(source: Observable<T>) {
//       return source;
//   };


exam(){
function tapOnceFirstTry<T>(fn: (value) => void) {
  return function(source: Observable<T>) {
    const sub = source
      .pipe(
        take(1),
        tap(value => fn(value))
      )
      .subscribe();
    return source;
  };
}

function tapOnce<T>(fn: (value) => void) {
  return source =>
    defer(() => {
      let first = true;
      return source.pipe(
        tap(payload => {
          if (first) {
            fn(payload);
          }
          first = false;
        })
      );
    });
}

function notSubscribingExample() {
  const sourceSubject = new Subject();

  const source = sourceSubject.pipe(
    tapOnceFirstTry(x => console.log(`tapOnceFirstTry ${x}`)),
    tapOnce(x => console.log(`tapOnce ${x}`))
  );

  sourceSubject.next("1");
  sourceSubject.next("2");
  sourceSubject.next("3");
}

function multipleSubscriptionsExample() {
  const sourceSubject = new Subject();

  const source = sourceSubject.pipe(
    tapOnceFirstTry(x => console.log(`tapOnceFirstTry ${x}`)),
    tapOnce(x => console.log(`tapOnce ${x}`))
  );

  source.subscribe();
  source.subscribe();

  sourceSubject.next("1");
  sourceSubject.next("2");
  sourceSubject.next("3");
}

function takeUntilExample() {
  const sourceSubject = new Subject();
  const takeUntilSubject = new Subject();

  const source = sourceSubject.pipe(
    tapOnceFirstTry(x => console.log(`tapOnceFirstTry ${x}`)),
    tapOnce(x => console.log(`tapOnce ${x}`)),
    takeUntil(takeUntilSubject)
  );

  source.subscribe();

  takeUntilSubject.next('');
  sourceSubject.next("1");
  sourceSubject.next("2");
  sourceSubject.next("3");
}

takeUntilExample();
notSubscribingExample()
multipleSubscriptionsExample()
}
}
