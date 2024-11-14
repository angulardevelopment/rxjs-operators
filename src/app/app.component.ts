import { Component } from '@angular/core';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  DEMO(){
    const mySubject = new Subject();

mySubject.next(1);

const subscription1 = mySubject.subscribe(x => {
  console.log('From subscription 1:', x);  // 2  3
});

mySubject.next(2);

const subscription2 = mySubject.subscribe(x => {
  console.log('From subscription 2:', x); // 3 // 4
});

mySubject.next(3);

subscription1.unsubscribe();

mySubject.next(4);

// Behavior subjects: are similar to replay subjects, but will re-emit only the last emitted value, or a default value if no value has been previously emitted:
  }
}
