import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import {
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormControl } from '@angular/forms';
import {
  catchError,
  from,
  range,
  delay,
  filter,
  combineLatest,
  switchMap,
  mergeMap,
  fromEvent,
  exhaustMap,
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
  firstValueFrom,
  merge,
  retry,
  ReplaySubject,
  shareReplay,
  scan,
  throttleTime,
  startWith,
  AsyncSubject,
} from 'rxjs';

import { fromFetch } from 'rxjs/fetch';
import { th } from 'zod/v4/locales';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss'],
  standalone: false,
})
export class TestComponent implements OnInit, OnDestroy {
  @ViewChild('saveButton') saveButton: ElementRef;
  @ViewChild('searchBox', { static: true }) searchBox: ElementRef;
  items = of([1, 2, 3]);
  simpleObservable: Observable<string>;
  simpleSubject = new Subject();
  subscription: Subscription;
  simpleSubject$ = this.simpleSubject.asObservable(); // prefer to use like that
  readonly asyncExample = of(1).pipe(map((etaMinutes) => etaMinutes * 60));
  apiUrl = 'https://jsonplaceholder.typicode.com/posts'
  //  public counter$: Subject<string> = new Subject<number>().pipe(
  //   scan((acc: number, current: number): number => acc + current, 0),
  //   map((value: number): string => `Sum of clicks: ${value}`)
  //  )
  counter$ = new Subject<number>();

  // error handling with async pipe
  priceError: string;
  // bitcoinPrice$ = interval(5000).pipe(
  //   switchMap(() => this.http.get<{ title: number }>('https://jsonplaceholder.typicode.com/todos/1')),
  //   map((data) => data.title),
  //   catchError((e: HttpErrorResponse) => {
  //     this.priceError = e.message;
  //     return throwError(() => e.message);
  //   }),
  // );

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
  REST_API_SERVER = 'https://api.tvmaze.com/search/shows?q='; // demo server
  temp = [];
  @ViewChild('serverSideSearchInput', { static: true }) input: ElementRef;
  heroes = [{ name: 'hero' }];
  public timeLeft$!: Observable<any>;
  public destroy$: Subject<void> = new Subject();
  dvadsfv = true;
    count = 0;
      searchControl = new FormControl('');
  searchTerm = '';
    filteredPosts$!: Observable<Post[]>;

  constructor(private http: HttpClient) { 
    this.counter$.subscribe(console.log.bind(console))

    this.searchControl.valueChanges.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      map(term => term?.trim() || '')
    ).subscribe(term => {
      this.searchTerm = term;
    });

     const searchTerm$ = this.searchControl.valueChanges.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      map(term => term?.trim().toLowerCase() || ''),
      startWith('')
    );
    this.filteredPosts$ = combineLatest([this.getPosts(), searchTerm$]).pipe(
      map(([posts, term]) =>
        term ? posts.filter(post => post.title.toLowerCase().includes(term)) : posts
      )
    );

  // Use in the constructor or as a field initializer to leverage injection context
    // interval(1000)
    //   .pipe(takeUntilDestroyed())
    //   .subscribe((value) => {
    //     this.count = value;
    //     console.log(value);
    //   });
  
  }

  
  ngAfterViewInit() {

  }

  delayTap() {
    (delay(150),
      tap(() => {
        console.log('Hello from setTimeout1');
      }),
      delay(300),
      tap(() => {
        console.log('Hello from setTimeout2');
      }));

    console.log('Hello from functionNr1 before setTimeout in code');

    setTimeout(() => {
      console.log('Hello from setTimeout');
    }, 1000);

    let fakeResponse = [1, 2, 3];

    let delayedObservable = of(fakeResponse);

    delayedObservable.pipe(
      delay(150),

      tap(() => {
        console.log('Hello from setTimeout1');
      }),

      delay(300),

      tap(() => {
        console.log('Hello from setTimeout2');
      }),
    );

    range(1, 5)
      .pipe(
        filter((x) => x % 2 === 1),
        map((x) => x + x),
      )

      .subscribe((x) => console.log(x));

    (delay(150), tap(() => console.log('150')));

    (delay(300), tap(() => console.log('300')));
  }

  tapUsage() {
    const http$: Observable<any> = this.http.get(this.apiUrl);
    http$
      .pipe(
        tap(() => console.log('HTTP request executed')),
        catchError((err) => err),
        map((res) => Object.values(res)),
      )
      .subscribe((courses) => console.log('courses', courses));

          const data$ = forkJoin(
      of('completed!'),
      interval(1000).pipe(tap((i) => console.log(`tick ${i}`))),
    );
    data$.subscribe(console.log);
  }

  intervalUsage() {
    const secondsCounter = interval(1000);
    secondsCounter
      .pipe(take(5))
      .subscribe((n) => console.log(`It's been ${n} seconds since subscribing!`));
  }

  pipeUsage() {
    of(1, 2, 3)
      .pipe(
        map((x) => x * x),
        filter((x) => x > 3),
      )
      .subscribe((v) => console.log(`value: ${v}`));
  }

  combineLatestUsage() {
    // 1. Define multiple observables
    let color = of('Black', 'Red', 'Blue');
    let brand = of('Jaguar', 'Ford', 'BMW');
    let price = of(100, 200, 300);

    // 2. Call combineLatest operator, inject multiple observables in array
    const joinStream = combineLatest(color, brand, price);

    // 3. Subscibe combineLatest 
    const subscribe = joinStream.subscribe(([color, brand, price]) => {
      console.log(color + ' ' + brand + ' ' + 'costed me' + ' ' + price);
    });

    const weight$ = of(70, 72, 76, 79, 75).pipe(delay(1000));
const height$ = of(1.76, 1.77, 1.78).pipe(delay(2000));

// Combine the latest values of weight and height
const bmi$ = combineLatest([weight$, height$]).pipe(
  map(([weight, height]) => { // Destructure the array of latest values
    return weight / (height * height);
  })
);

bmi$.subscribe(bmi => console.log('BMI is ' + bmi));
// Initial emission occurs only after both weight$ (1s) and height$ (2s) have emitted at least once.
// Logs:
// BMI is 24.21... (after 2 seconds, using latest weight 70 and latest height 1.76)
// BMI is 23.93... (when new weight emits, using weight 72 and latest height 1.76)
// ...and so on.
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
        catchError((err) => of('I', 'II', 'III', 'IV', 'V')),
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

  mapOperator() {
    const namesObservable = of('Pete', 'Mike');
    namesObservable
      .pipe(map((name) => `${name} is awesome!`))
      .subscribe((result) => console.log(`${result}`));
    // CONSOLE:
    // Pete is awesome!
    // Mike is awesome!

       const simpleObservable$ = new Observable((observer) => {
      observer.next({ data: 'cs' });
      observer.complete();
    });
    simpleObservable$
      .pipe(
        tap(() => console.log('Api mock')),
        map((res) => {
          console.log(res['data']);
        }),
      )
      .subscribe((finalData) => console.log('response', finalData));
  }

  flattening() {
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

  mergeMapFlattening() {
    const namesObservable = of('Pete', 'Mike');

    namesObservable
      .pipe(mergeMap((name) => this.getAwesomeMessagesObservable(name)))
      .subscribe((resultObservable) => {
        console.log(resultObservable);
      });

          this.getCommentsWithPost([{ id: 1 }]).subscribe((res) => {
      console.log(res);
    });

   // Simulate a list of files (could be File objects from an <input type="file">)
  const fileList = ['file1.txt', 'file2.txt', 'file3.txt'];

  // Simulate an upload function that returns an Observable
  const uploadFile = (file: string): Observable<string> => {
    // Simulate upload delay and result
    return of(`Uploaded: ${file}`).pipe(delay(1000));
  };

  from(fileList)
    .pipe(
      mergeMap(file => uploadFile(file)) // uploadFile returns an observable
    )
    .subscribe(result => {
      console.log('Upload result:', result);
    });
  }

  switchMapFlattening() {
    const frameworkTweetsObservable = from(['Backbone', 'Angular']).pipe(
      tap((fwName) => console.log(`*** "${fwName}" tweet pops up ***`)),
    );
    frameworkTweetsObservable
      .pipe(
        map((framework) => {
          from(['c', 'd']);
        }),
        switchMap((agency) => from(['e', 'f'])),
      )
      .subscribe((recruit) => console.log(recruit));

      const urls = [
      'https://jsonplaceholder.typicode.com/todos/1',
      'https://jsonplaceholder.typicode.com/todos/2',
    ];

    from(urls)
      .pipe(
        switchMap((url) => {
          return fromFetch(url);
        }),
      )
      .subscribe((response) => console.log(response));

        // non blocking code dont use combinelatest makeitnonblocking
    forkJoin([
      this.getData('A').pipe(switchMap((p) => this.uiUpdate(p))),
      this.getData('B').pipe(switchMap((p) => this.uiUpdate(p))),
      this.getData('c').pipe(switchMap((p) => this.uiUpdate(p))),
      this.getData('d').pipe(switchMap((p) => this.uiUpdate(p))),
    ]).pipe((ord) => {
      console.log('final', ord);
      return ord;
    });

  // Simulate an API call that returns an observable
  const searchApi = (query: string): Observable<string[]> => {
    // Replace this with your real HTTP call if needed
    return of([`Result for "${query}"`]).pipe(delay(500));
  };

  fromEvent(this.searchBox.nativeElement, 'input').pipe(
    debounceTime(300),
    map((e: any) => e.target.value),
    switchMap(query => searchApi(query)) // searchApi returns an observable
  ).subscribe(result => {
    console.log('Search results:', result);
  });
  }

  concatMapFlattening() {
    const frameworkTweetsObservable = from(['Backbone', 'Angular']).pipe(
      tap((fwName) => console.log(`*** "${fwName}" tweet pops up ***`)),
    );
    frameworkTweetsObservable
      .pipe(
        map((framework) => from(['c', 'd'])),
        concatMap((agency) => from(['e', 'f'])),
      )
      .subscribe((recruit) => console.log(recruit));

    const urls = [
      'https://jsonplaceholder.typicode.com/todos/1',
      'https://jsonplaceholder.typicode.com/todos/2',
    ];

    from(urls)
      .pipe(
        concatMap((url) => {
          return fromFetch(url);
        }),
      )
      .subscribe((response) => console.log(response));

    timer(0, 1000).subscribe(n => console.log('timer', n));
    interval(1000).subscribe(n => console.log('interval', n));
    const intervalCount = interval(1000);
    const takeFive = intervalCount.pipe(take(3));
    takeFive.subscribe((x) => console.log(x));

    const source = of(1, 2, 3);
    timer(3000)
      .pipe(concatMap(() => source))
      .subscribe((x) => console.log('source'));

    timer(0, 1000)
      .pipe(
        take(3),
        map((secondsElapsed: number) => {
          return 3 - secondsElapsed;
        }),
      )
      .pipe()
      .subscribe((secondsLeft: number) => {
        console.log(secondsLeft, 'secondsLeft');
      });

      const a1$ = of('a', 'b');
    const a2$ = of('x', 'y');
    const a3$ = of('45', '34');
    const result$ = from([a1$, a2$, a3$]);
    result$.subscribe(console.log);
   
    result$.subscribe(data=>{
    console.log(data)
    });
    const oneSecondSource = of('1 second http request').pipe(delay(1000));
    const twoSecondSource = of('2 second http request').pipe(delay(2000));
    const threeSecondSource = of('3 second http request').pipe(delay(3000));
    const fourSecondSource = of('4 second http request').pipe(delay(4000));
    const fiveSecondSource = of('5 second http request').pipe(delay(5000));
    const sourceMap = from([
      fiveSecondSource,
      oneSecondSource,
      twoSecondSource,
      threeSecondSource,
      fourSecondSource,
    ])
      .pipe(concatMap((res) => res))
      .subscribe((res) => console.log(res));
      
      const firstPOSTCallToAPI = (url: string, data: any) => of(data); // Mock function
      const secondPOSTCallToAPI = (url: string, result: any) => of(result); // Mock function
      const thirdPOSTCallToAPI = (url: string, result: any) => of(result); // Mock function
      const fourthPOSTCallToAPI = (url: string, result: any) => of(result); // Mock function
      const data = {}; // Mock data

      firstPOSTCallToAPI('url', data).pipe(
        concatMap(result1 => secondPOSTCallToAPI('url', result1)),
        concatMap(result2 => thirdPOSTCallToAPI('url', result2)),
        concatMap(result3 => fourthPOSTCallToAPI('url', result3))
    ).subscribe(
        success => { /* display success msg */ },
        errorData => { /* display error msg */ }
    );
    
    this.http.get('https://jsonplaceholder.typicode.com/todos/3')
          .pipe(
            tap(res => console.log('First result', res)),
            concatMap((res: { timeout: number }) => this.http.get(`http://test.localhost/api.php?timeout=${+res.timeout + 1}`)),
            tap(res => console.log('Second result', res)),
            concatMap((res: { timeout: number }) => this.http.get(`http://test.localhost/api.php?timeout=${+res.timeout + 3}`)),
            tap(res => console.log('Third result', res)),
          )
          .subscribe(res => console.log('Latest result', res));

  // Simulate a list of form steps
  const formSteps = ['step1', 'step2', 'step3'];

  // Simulate a save function that returns an Observable
  const saveStep = (step: string): Observable<string> => {
    // Simulate save delay and result
    return of(`Saved: ${step}`).pipe(delay(1000));
  };

  from(formSteps).pipe(
    concatMap(step => saveStep(step)) // saveStep returns an observable
  ).subscribe(result => {
    console.log('Step saved:', result);
  });
  }

  // disbale first http request   like login system
  exhaustMapFlattening() {
    const frameworkTweetsObservable = from(['Backbone', 'Angular']).pipe(
      tap((fwName) => console.log(`*** "${fwName}" tweet pops up ***`)),
    );
    frameworkTweetsObservable
      .pipe(
        map((framework) => from(['c', 'd'])),
        exhaustMap((agency) => from(['e', 'f'])),
      )
      .subscribe((recruit) => console.log(recruit, 'rec'));

         fromEvent(this.saveButton.nativeElement, 'click')
      .pipe(exhaustMap(() => this.saveCourse('a')))
      .subscribe(console.log);

        //  map(framework => getAgency(framework) ),
  //   exhaustMap(agency => agency.getRecruitsObservable() )
  }

  saveCourse(a) {
    // console.log(a);
    return a;
  }

  ofAndFrom() {
    of([1, 2, 3]).subscribe((x) => console.log(x));
    from([1, 2, 3]).subscribe((x) => console.log(x));
  }

  // closure example
  //  function basicCustomOperator<T>() {
  //   return function(source: Observable<T>) {
  //       return source;
  //   };

  tapOnce<T>(fn: (value) => void) {
      return (source) =>
        defer(() => {
          let first = true;
          return source.pipe(
            tap((payload) => {
              if (first) {
                fn(payload);
              }
              first = false;
            }),
          );
        });
    }

    tapOnceFirstTry<T>(fn: (value) => void) {
      return function (source: Observable<T>) {
        const sub = source
          .pipe(
            take(1),
            tap((value) => fn(value)),
          )
          .subscribe();
        return source;
      };
    }

  closureCustomOperator() {
 
    function notSubscribingExample() {
      const sourceSubject = new Subject();

      const source = sourceSubject.pipe(
        this.tapOnceFirstTry((x) => console.log(`tapOnceFirstTry ${x}`)),
        this.tapOnce((x) => console.log(`tapOnce ${x}`)),
      );

      sourceSubject.next('1');
      sourceSubject.next('2');
      sourceSubject.next('3');
    }

    function multipleSubscriptionsExample() {
      const sourceSubject = new Subject();

      const source = sourceSubject.pipe(
        this.tapOnceFirstTry((x) => console.log(`tapOnceFirstTry ${x}`)),
        this.tapOnce((x) => console.log(`tapOnce ${x}`)),
      );

      source.subscribe();
      source.subscribe();

      sourceSubject.next('1');
      sourceSubject.next('2');
      sourceSubject.next('3');
    }

    notSubscribingExample();
    multipleSubscriptionsExample();
  }

  // Use takeUntil with Subject to Avoid Memory Leaks in Subscriptions
      takeUntilExample() {
      const sourceSubject = new Subject();
      const takeUntilSubject = new Subject();

      const source = sourceSubject.pipe(
        this.tapOnceFirstTry((x) => console.log(`tapOnceFirstTry ${x}`)),
        this.tapOnce((x) => console.log(`tapOnce ${x}`)),
        takeUntil(takeUntilSubject),
      );

      source.subscribe();

      takeUntilSubject.next('');
      sourceSubject.next('1');
      sourceSubject.next('2');
      sourceSubject.next('3');
    }

  timerRelated() {


 
    //   console.log(timeDifference)
    // 2024-02-15T10:56:45.380Z

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
      let timeInM = new Date().valueOf();

      const dDay = endDay.valueOf();
  
      const milliSecondsInASecond = 1000;
      const hoursInADay = 24;
      const minutesInAnHour = 60;
      const secondsInAMinute = 60;

      const timeDifference = dDay - timeInM;

      const hoursToDday = Math.floor(
        (timeDifference /
          (milliSecondsInASecond * minutesInAnHour * secondsInAMinute)) %
        hoursInADay,
      );

      const minutesToDday = Math.floor(
        (timeDifference / (milliSecondsInASecond * minutesInAnHour)) %
        secondsInAMinute,
      );

      const secondsToDday =
        Math.floor(timeDifference / milliSecondsInASecond) % secondsInAMinute;
      console.log(
        secondsToDday,
        minutesToDday,
        hoursToDday,
        'secondsToDday, minutesToDday, hoursToDday',
      );

      // if (!secondsToDday) {
      // 	return { secondsToDday: 0, minutesToDday: 0, hoursToDday: 0 };
      // }
      return { secondsToDday, minutesToDday, hoursToDday };
    }
    // const hjb = calcDateDiff();

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


// serversidesearch
  debounceTimeUsage() {
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
        }),
      )
      .subscribe();
  }

  public sendGetRequest(val) {
    return this.http.get(this.REST_API_SERVER + val);
  }

  withPromise() {
    Promise.all([
      Promise.resolve(3),
      new Promise((resolve, reject) => setTimeout(resolve, 3000, 'hi')),
      42,
    ]).then((values) => console.log(values));
    [3, 'hi', 42];
  }

  withForkJoin() {
    console.log('multiple req');
    const request3 = this.http.get('');
    // Testcase:
    // To test this change the third API URL so that it breaks and show an error.
    // Now console will show this error so that we can correct this easily-
    // {
    // HttpErrorResponse {headers: {...}, status: 404, statusText: "OK", url: "https://restcountries.eu/rest/v1/name/"...}
    // error: null
    // headers: HttpHeaders
    // message: "Http failure response for https://restcountries.eu/rest/v1/name/: 404 OK"
    // name: "HttpErrorResponse"
    // ok: false
    // status: 404
    // statusText: "OK"
    // url: "https://restcountries.eu/rest/v1/name/"
    // }

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
      },
    );

        // https://rxjs.dev/deprecations/array-argument
    const data$ = forkJoin(
      of('a').pipe(delay(2000)),
      of('b').pipe(delay(3000)),
      of('c').pipe(delay(1000)),
    );
    data$.subscribe(console.log); // ["a", "b", "c"]

    // multiple http requests with error handling
    return forkJoin([api1, api2]).pipe(
      map((result) => {
        console.log(result);

        return true;
      }),
      catchError((error: any) => {
        return throwError(error);
      }),
    );
  }

  getData(val): Observable<any> {
    return this.http.get('https://restcountries.eu/rest/v1/name/' + val);
  }

  uiUpdate(d): Observable<any> {
    return of(d);
  }


  subjectEg() {
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

      this.simpleSubject.next(Math.random());

  


        this.simpleSubject.subscribe((res) => {
      console.log('subscription a :', res); // subscription a : 0.91767565496093
    });

    this.simpleSubject.subscribe((res) => {
      console.log('subscription b :', res); // subscription b : 0.91767565496093
    });
  }

  behaviorSubjectEg() {
         const subject = new BehaviorSubject(0);
    subject.next(1);
    subject.subscribe((x) => console.log(x));
  }

  replaySubjectUsage() {
    const subject = new ReplaySubject(2); // buffer 2 values for new subscribers

    subject.next(1);
    subject.next(2);
    subject.next(3);

    // Subscriber A
    subject.subscribe((x) => console.log('Subscriber A: ' + x));

    subject.next(4);

    // Subscriber B
    subject.subscribe((x) => console.log('Subscriber B: ' + x));

    subject.next(5);
  }

  observableHandle() {
    this.simpleObservable = new Observable((observer) => {
      observer.next('hlo' + Math.random()); // observable execution
      observer.complete();
    });

    // var observable = interval(1000);
    //   this.subscription = observable.subscribe(x => console.log(x));

      // How to execute 2 Observables in parallel
        const ob1 = new Observable<string>((observer) => {
      console.log('observable 1 called');
    });

    const ob2 = new Observable<string>((observer) => {
      console.log('observable 2 called');
    });

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

   search = '';
  searchString: Subject<string> = new Subject();
  searchString$: Observable<string> = this.searchString.asObservable();
  switch$: Observable<string>;
  concat$: Observable<string>;
  merge$: Observable<string>;

  getPosts = (): Observable<Post[]> =>
    this.http.get<Post[]>(this.apiUrl);

  getComments = (post) =>
    this.http.get(
      `${this.apiUrl}/${post[0].id}/comments`,
    );

  //     getPosts(): Observable<Post[]> {
  //   return this.http.get<Post[]>(this.apiUrl).pipe(
  //     map(posts => posts.slice(0, 10))
  //   );
  // }
  getPost(id: string): Observable<Post> {
    return this.http.get<Post>(`${this.apiUrl}/${id}`);
  }
  getCommentsWithPost = (post) =>
    this.getComments(post).pipe(map((comments) => ({ post, comments })));
  c$ = this.getPosts().pipe(mergeMap(this.getCommentsWithPost));

  updateSearch(value) {
    this.searchString.next(value);
  }

  ngOnInit() {
    // this.allOps();
  }

  allOps() {
    // from as observableFrom
    this.switch$ = this.searchString$.pipe(
      switchMap((x) =>
        from(['a', 'b', 'c']).pipe(
          delay(1000),
          map((y) => `outer: ${x}, inner: ${y}`),
        ),
      ),
    );

    this.concat$ = this.searchString$.pipe(
      concatMap((x) =>
        from(['a', 'b', 'c']).pipe(
          delay(1000),
          map((y) => `outer: ${x}, inner: ${y}`),
        ),
      ),
    );

    this.merge$ = this.searchString$.pipe(
      mergeMap((x) =>
        from(['a', 'b', 'c']).pipe(
          delay(1000),
          map((y) => `outer: ${x}, inner: ${y}`),
        ),
      ),
    );
  }

    async firstValueFromAndTake() {
    const myStore$: any = of();
    // firstValueFrom turns Observable into a Promise so you can use async/await:
    const value = await firstValueFrom(myStore$.pipe(take(1)));
    // Basically using take(1) or firstValueFrom is the same because they access the value asynchronously:
    myStore$.pipe(take(1)).subscribe((value) => {
      console.log(value);
    });
  }

  fromEventOperator(){
        const observable = fromEvent(document, 'click');

    // subscription 1
    observable.subscribe((event: MouseEvent) => {
      console.log(event.clientX); // x position of click
    });

    // subscription 2
    observable.subscribe((event: MouseEvent) => {
      console.log(event.clientY); // y position of click
    });

    of(1, 2, 3)
      .pipe(map((x) => x * x))
      .subscribe((v) => console.log(`value: ${v}`));
  }

  mergeOperator(){
    
const clicks = fromEvent(document, 'click');
const timer = interval(1000).pipe(take(4));
const clicksOrTimer = merge(clicks, timer);

/**
 * incase of, @asyncrynous code
 */
clicksOrTimer.subscribe({
  next: x => console.log(x),
  complete: ()=>{
    console.log("heello i am ccompleted")
  }
});

/**
 * incase of, @sycronous code
 */
merge(of(1,1,1,1,), of("aa", "bb") ).subscribe({
  next: (s) => {
    console.log(s)
  },
  complete: ()=>{
    console.log("completeing sycronous code")
  }
})
// It won't wait to complete all observable,
// it just will gives your stream of data.
// here we are printing, a interval. If we try to click the document

const a = interval(500).pipe(map((v) => 'a' + v), take(3));
const b = interval(500).pipe(map((v) => 'b' + v), take(3));
merge(a, b).subscribe((value) => console.log(value));
  }


  retryOperator(){
    const source = interval(1000);
const result = source.pipe(
  mergeMap(val => {
    if (val > 2) { // Simulate an error condition
      return throwError(() => 'Error!'); 
    }
    return of(val);
  }),
  retry(2) // Retries 2 times on error before finally failing
);

result.subscribe({
  next: value => console.log(value),
  error: err => console.log(`${err}: Retried 2 times then quit!`)
});
  }


    getReposForUser(user: string): Observable<any> {
    return this.http
      .get(`https://api.github.com/users/${user}/repos`)
      .pipe(map((res: any) => res.json()))
  }

  shareOperator(){
    const repos$ = this.getReposForUser('octocat').pipe(
      shareReplay(1) // Cache the latest emitted value for new subscribers
    );

    // First subscription triggers the HTTP request
    repos$.subscribe(repos => {
      console.log('Subscriber 1:', repos);
    });

    // Second subscription receives the cached result without triggering a new HTTP request
    repos$.subscribe(repos => {
      console.log('Subscriber 2:', repos);
    });
  }

    getReposForUserShareOperator(user: string): Observable<any> {
    return this.http
      .get(`https://api.github.com/users/${user}/repos`)
      .pipe(
        map((res: any) => res.json()),
        shareReplay(1)
      );
  }

   incrementCounter() {
    this.counter$.next(1); // Emit a value
  }

  scanOperator(){
    const clicks = fromEvent(document, 'click');
const counter = clicks.pipe(
  scan(acc => acc + 1, 0) // Accumulate the number of clicks
);
  }

  throttleTimeOperator(){
    const clicks = fromEvent(document, 'click');
const result = clicks.pipe(
  throttleTime(2000) // Emit a click event at most once every 2 seconds
);

result.subscribe(x => console.log(x));
  }

  asyncSubjectOperator(){
    const subject = new AsyncSubject<number>();

// Subscriber A
subject.subscribe({
  next: (v) => console.log(`Subscriber A: ${v}`),
  complete: () => console.log('Subscriber A: Complete')
});

// Emit values
subject.next(1);
subject.next(2);
subject.next(3);

// Subscriber B
subject.subscribe({
  next: (v) => console.log(`Subscriber B: ${v}`),
  complete: () => console.log('Subscriber B: Complete')
});

// Complete the subject
subject.complete();
  }
  
}

interface timeComponents {
  secondsToDday: number;
  minutesToDday: number;
  hoursToDday: number;
}

interface Post {
  id: number;
  title: string;
  body: string;
}