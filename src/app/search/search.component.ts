import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {
  concatMap,
  delay,
  map,
  mergeMap,
  Observable,
  Subject,
  switchMap,
  from as observableFrom,
  of,
  concat,
  tap,
} from 'rxjs';
@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
  standalone: false
})
export class SearchComponent implements OnInit {

  search = '';
  searchString: Subject<string> = new Subject();
  searchString$: Observable<string> = this.searchString.asObservable();
  switch$: Observable<string>;
  concat$: Observable<string>;
  merge$: Observable<string>;

  constructor(private httpClient: HttpClient) {}

  getPosts = () =>
    this.httpClient.get('https://jsonplaceholder.typicode.com/posts');

  getComments = (post) =>
    this.httpClient.get(
      `https://jsonplaceholder.typicode.com/posts/${post[0].id}/comments`
    );

  getCommentsWithPost = (post) =>
    this.getComments(post).pipe(map((comments) => ({ post, comments })));
  c$ = this.getPosts().pipe(mergeMap(this.getCommentsWithPost));

  updateSearch(value) {
    this.searchString.next(value);
  }

  ngOnInit() {


    // this.concatMapExample();

    // this.mapExample();

    // this.mergeMapUsage();
  }

  concatMapExample() {
    // const a1$ = of('a', 'b');
    // const a2$ = of('x', 'y');
    // const a3$ = of('45', '34');
    // const result$ = concat(a1$, a2$, a3$);
    // result$.subscribe(console.log);
    // or
    // result$.subscribe(data=>{
    // console.log(data)
    // });

    // const oneSecondSource = of('1 second http request').pipe(delay(1000));
    // const twoSecondSource = of('2 second http request').pipe(delay(2000));
    // const threeSecondSource = of('3 second http request').pipe(delay(3000));
    // const fourSecondSource = of('4 second http request').pipe(delay(4000));
    // const fiveSecondSource = of('5 second http request').pipe(delay(5000));
    // const map = observableFrom([
    //   fiveSecondSource,
    //   oneSecondSource,
    //   twoSecondSource,
    //   threeSecondSource,
    //   fourSecondSource,
    // ])
    //   .pipe(concatMap((res) => res))
    //   .subscribe((res) => console.log(res));

// firstPOSTCallToAPI('url', data).pipe(
//     concatMap(result1 => secondPOSTCallToAPI('url', result1))
//       concatMap( result2 => thirdPOSTCallToAPI('url', result2))
//        concatMap(result3 => fourthPOSTCallToAPI('url', result3))
//     ....
// ).subscribe(
//     success => { /* display success msg */ },
//     errorData => { /* display error msg */ }
// );


// this.http.get('http://test.localhost/api.php?timeout=1')
//       .pipe(
//         tap(res => console.log('First result', res)),
//         concatMap((res: { timeout: number }) => this.http.get(`http://test.localhost/api.php?timeout=${+res.timeout + 1}`)),
//         tap(res => console.log('Second result', res)),
//         concatMap((res: { timeout: number }) => this.http.get(`http://test.localhost/api.php?timeout=${+res.timeout + 3}`)),
//         tap(res => console.log('Third result', res)),
//       )
//       .subscribe(res => console.log('Latest result', res));
  }

  allOps() {
    this.switch$ = this.searchString$.pipe(
      switchMap((x) =>
        observableFrom(['a', 'b', 'c']).pipe(
          delay(1000),
          map((y) => `outer: ${x}, inner: ${y}`)
        )
      )
    );

    this.concat$ = this.searchString$.pipe(
      concatMap((x) =>
        observableFrom(['a', 'b', 'c']).pipe(
          delay(1000),
          map((y) => `outer: ${x}, inner: ${y}`)
        )
      )
    );

    this.merge$ = this.searchString$.pipe(
      mergeMap((x) =>
        observableFrom(['a', 'b', 'c']).pipe(
          delay(1000),
          map((y) => `outer: ${x}, inner: ${y}`)
        )
      )
    );
  }

  mapExample() {
    const simpleObservable$ = new Observable((observer) => {
      observer.next({ data: 'cs' });
      observer.complete();
    });
    simpleObservable$
      .pipe(
        tap(() => console.log('Api mock')),
        map((res) => {
          console.log(res['data']);
        })
      )
      .subscribe((finalData) => console.log('response', finalData));
  }

  mergeMapUsage(){
        this.getCommentsWithPost([{ id: 1 }]).subscribe((res) => {
      console.log(res);
    });
  }
}
