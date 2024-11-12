import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import {
  catchError, from, observable, range, delay, filter,
  combineLatest, switchMap, mergeMap, fromEvent, exhaustMap,
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
  debounceTime,
  distinctUntilChanged,
  forkJoin,
  throwError,
  BehaviorSubject,
  Subscription,
} from 'rxjs';

import { fromFetch } from 'rxjs/fetch';
const BTC_PRICE_HOST = 'https://api.coindesk.com/v1/bpi/currentprice/BTC.json';
@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss']
})
export class TestComponent implements OnInit, OnDestroy {
  @ViewChild('saveButton') saveButton: ElementRef;

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    // this.hgvjh();
  }

  ngAfterViewInit() {
    // this.exhaEg();
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


  exam() {
    function tapOnceFirstTry<T>(fn: (value) => void) {
      return function (source: Observable<T>) {
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


  name = 'Angular';
  heroes = [{ name: 'jhbj' }]
  public timeLeft$!: Observable<any>;
  public destroy$: Subject<void> = new Subject();
  dvadsfv = true;

  sfrdsra() {
    //  console.log(new Date(), new Date().valueOf())
    //  const jknjk = new Date().valueOf();
    //       let endDay = new Date('2024-02-15T13:22:00Z').valueOf();
    // 	const timeDifference = endDay - jknjk;
    //   console.log(timeDifference)
    // 2024-02-15T10:56:45.380Z
    // this.sfrdsra();

    function calcDateDiff() {
      // const tim = '2024 -02 - 20T16: 15:00Z';
      // const tim = '2024-02-15T13:23:00Z';

      /*
       * 2023-08-20T20:21:00
       *
       */
      /*

  */

      let endDay = new Date('2024-02-15T13:43:00Z');
      let hjbkj = new Date().valueOf();

      const dDay = endDay.valueOf();
      // console.log(dDay, hjbkj, 'endDay');
      const milliSecondsInASecond = 1000;
      const hoursInADay = 24;
      const minutesInAnHour = 60;
      const secondsInAMinute = 60;

      const timeDifference = dDay - hjbkj;

      const hoursToDday = Math.floor(
        (timeDifference /
          (milliSecondsInASecond * minutesInAnHour * secondsInAMinute)) %
        hoursInADay
      );

      const minutesToDday = Math.floor(
        (timeDifference / (milliSecondsInASecond * minutesInAnHour)) %
        secondsInAMinute
      );

      const secondsToDday =
        Math.floor(timeDifference / milliSecondsInASecond) % secondsInAMinute;
      console.log(secondsToDday, minutesToDday, hoursToDday, 'secondsToDday, minutesToDday, hoursToDday');

      // if (!secondsToDday) {
      // 	return { secondsToDday: 0, minutesToDday: 0, hoursToDday: 0 };
      // }
      return { secondsToDday, minutesToDday, hoursToDday };
    }
    // const hjb = calcDateDiff();
    // if(this.dvadsfv){
    this.timeLeft$ = interval(1000).pipe(
      map((x) => {
        console.log(x, 'x');

        const hjb = calcDateDiff();
        console.log(hjb, 'hjb');

        if (!hjb?.secondsToDday) {
          this.dvadsfv = false;
        }
        return hjb;
        //  }
        // return { secondsToDday: 0, minutesToDday: 0, hoursToDday: 0 };
      }),
      // takeWhile(secondsToDday => secondsToDday > 0)
    );
    // }
  }

  ngOnDestroy() {
    // this.destroy$.next();

    // dispose of the observable with unsubscribe() method.
    // this.simpleObservable.unsubscribe();
  }


  REST_API_SERVER =
    'https://bizcallcrmforms.com/response.php?section=filtertopcoursepage&coursekeyword=';
  temp = [];
  @ViewChild('input', { static: true }) input: ElementRef;

  serversidesearch() {
    fromEvent(this.input.nativeElement, 'keyup')
      .pipe(
        filter(Boolean),
        debounceTime(1500),
        distinctUntilChanged(),
        tap((event: KeyboardEvent) => {
          const val = this.input.nativeElement.value;
          console.log(event);
          console.log(this.input.nativeElement.value);
          this.sendGetRequest(val).subscribe((data: any[]) => {
            console.log(data);
            this.temp = data['data'];
          });
        })
      )
      .subscribe();
  }

  public sendGetRequest(val) {
    return this.http.get(this.REST_API_SERVER + val);
  }


  withdelay() {
    // https://rxjs.dev/deprecations/array-argument
    const data$ = forkJoin(
      of('a').pipe(delay(2000)),
      of('b').pipe(delay(3000)),
      of('c').pipe(delay(1000))
    );
    data$.subscribe(console.log); // ["a", "b", "c"]
  }

  withpromise() {
    Promise.all([
      Promise.resolve(3),
      new Promise((resolve, reject) => setTimeout(resolve, 3000, 'hi')),
      42,
    ]).then((values) => console.log(values));
    [3, 'hi', 42];
  }

  withTap() {
    const data$ = forkJoin(
      of('completed!'),
      interval(1000).pipe(tap((i) => console.log(`tick ${i}`)))
    );
    data$.subscribe(console.log);
  }

  withHttp() {
    console.log('multiple req');

    const api1 = this.getData('india');
    const api2 = this.http.get('https://restcountries.eu/rest/v1/name/us');
    const api3 = this.http.get('https://restcountries.eu/rest/v1/name/ame');
    const api4 = this.http.get('https://restcountries.eu/rest/v1/name/ja');
    // const responseData= [];
    // responseData.push(request1);
    // responseData.push(request2);
    // responseData.push(request3);
    // responseData.push(request4);
    forkJoin([api1, api2]).subscribe(
      (results) => {
        console.log(results, 'results');
        // this.data = results;
      },
      (err) => {
        console.log(err);
      }
    );
  }

  getData(val): Observable<any> {
    return this.http.get('https://restcountries.eu/rest/v1/name/' + val);
  }

  uiUpdate(d): Observable<any> {
    return of(d);
  }
  // non blocking code dont use combinelatest
  makeitnonblocking() {
    forkJoin([
      this.getData('A').pipe(switchMap((p) => this.uiUpdate(p))),
      this.getData('B').pipe(switchMap((p) => this.uiUpdate(p))),
      this.getData('c').pipe(switchMap((p) => this.uiUpdate(p))),
      this.getData('d').pipe(switchMap((p) => this.uiUpdate(p))),
    ]).pipe((ord) => {
      console.log('final', ord);
      return ord;
    });
  }

  multi() {
    const api1 = '';
    const api2 = '';
    return forkJoin([api1, api2]).pipe(
      map((result) => {
        console.log(result);

        return true;
      }),
      catchError((error: any) => {
        return throwError(error);
      })
    );
  }

  simpleObservable: Observable<string>;
  simpleSubject = new Subject();
  subscription: Subscription;

  simpleSubject$ = this.simpleSubject.asObservable(); // prefer to use like that

  readonly asyncExample = of(1).pipe(map((etaMinutes) => etaMinutes * 60));

  // error handling with async pipe
  priceError: string;
  bitcoinPrice$ = interval(5000).pipe(
      switchMap(() => this.http.get<{ last: number }>(BTC_PRICE_HOST)),
      map(data => data.last),
      catchError((e: HttpErrorResponse) => {
          this.priceError = e.message;
          return throwError(() => e.message)
      })
  );

  // bitcoinPrice$ = interval(1000).pipe(
  //   switchMap(() => this.http.get<any>(BTC_PRICE_HOST)),
  //   map((data) => data),
  //   catchError((e: HttpErrorResponse) => {
  //     this.priceError = e.message;
  //     return throwError(() => e.message);
  //   })
  // );

  sub1 = new Subject();
  sub2 = new BehaviorSubject(2);

  SubjectEg() {
    let output = '';

    this.sub1.next('1');

    this.sub2.subscribe((val) => {
      console.log(output, 'behSubject');
      output += val;
    });

    this.sub1.subscribe((val) => {
      console.log(output, 'Subject');
      output += val;
    });

    console.log(output, 'output');
  }

  createobs() {
    this.simpleObservable = new Observable((observer) => {
      observer.next('hlo' + Math.random()); // observable execution
      observer.complete();
    });

    // var observable = interval(1000);
    //   this.subscription = observable.subscribe(x => console.log(x));
  }

  getobs() {
    // subscribe to the observable
    this.simpleObservable.subscribe((data) => {
      console.log(data, 'simpleObservable'); //"hlo"
    });
    this.simpleObservable.subscribe((res) => {
      console.log('subscription a :', res); //subscription a :0.2859800202682865
    });

    this.simpleObservable.subscribe((res) => {
      console.log('subscription b :', res); //subscription b :0.694302021731573
    });
  }

  getsub() {
    this.simpleSubject.subscribe((res) => {
      console.log('subscription a :', res); // subscription a : 0.91767565496093
    });

    this.simpleSubject.subscribe((res) => {
      console.log('subscription b :', res); // subscription b : 0.91767565496093
    });
  }

  createsub() {
    this.simpleSubject.next(Math.random());
  }

  createbehsub() {
    const subject = new BehaviorSubject(0);
    subject.next(1);
    subject.subscribe((x) => console.log(x));
  }

  // How to execute 2 Observables in parallel
  ObservablesEg() {
    const ob1 = new Observable<string>((observer) => {
      console.log('observable 1 called');
    });

    const ob2 = new Observable<string>((observer) => {
      console.log('observable 2 called');
    });
  }



}

interface timeComponents {
  secondsToDday: number;
  minutesToDday: number;
  hoursToDday: number;
}
