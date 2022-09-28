import { Component, OnInit } from '@angular/core';
import { delay, filter, map, take, tap } from 'rxjs/operators';
import { Observable, of, from, observable, range } from 'rxjs';
@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss']
})
export class TestComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    this.hgvjh();
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


  delay(150),tap(

      () => console.log('150')

  )
  
  delay(300), tap(

      () => console.log('300')

  );
}

}
