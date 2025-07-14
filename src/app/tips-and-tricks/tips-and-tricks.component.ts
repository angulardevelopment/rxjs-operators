import { Component } from '@angular/core';
import { interval, map, Observable, takeWhile } from 'rxjs';
import * as moment from 'moment';
@Component({
  selector: 'app-tips-and-tricks',
  imports: [],
  templateUrl: './tips-and-tricks.component.html',
  styleUrl: './tips-and-tricks.component.scss'
})
export class TipsAndTricksComponent {
public time: number;
public countDown: Observable<string>;
public currentUnix;
constructor() {
    this.currentUnix = moment().unix();
    this.time = moment(1503773977000).unix() - this.currentUnix;
}
ngOnInit() {
  this.countDown = interval(1000).pipe(
    map(() => {
      this.time = this.time - 1;
      return this.time;
    }),
    takeWhile(time => time >= 0),
    map(time => {
      const timeLeft = moment.duration(time, 'seconds');
      let string = '';

      if (timeLeft.days() > 0)
        string += `${timeLeft.days()} Days`;
      if (timeLeft.hours() > 0)
        string += ` ${timeLeft.hours()} Hours`;
      if (timeLeft.minutes() > 0)
        string += ` ${timeLeft.minutes()} Mins`;

      string += ` ${timeLeft.seconds()} Secs`;

      console.log('string', string);
      return string;
    })
  );

  // Subscribe to start countdown
  this.countDown.subscribe(formattedTime => {
    // Use `formattedTime` in template or store it in a variable
    console.log('Formatted Countdown:', formattedTime);
  });
}
}
