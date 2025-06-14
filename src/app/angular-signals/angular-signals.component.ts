import { ChangeDetectionStrategy, ChangeDetectorRef, Component, computed, effect, inject, signal, untracked } from '@angular/core';

@Component({
  selector: 'app-angular-signals',
  imports: [],
  templateUrl: './angular-signals.component.html',
  styleUrl: './angular-signals.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
})
export class AngularSignalsComponent {
  counter: number = 0;
  count = signal(0);

    increment() {
        this.counter++;
    }

      counterWithSignal = signal(0);

  constructor() {

    console.log(`counter value: ${this.counterWithSignal()}`)
     this.list().push("Again");

        this.object().title = "overwriting title";

        //The effect will be re-run whenever any 
// of the signals that it uses changes value.
effect(() => {

  // We just have to use the source signals 
  // somewhere inside this effect
  const currentCount = this.counterWithSignal();

  const derivedCounter = this.derivedCounter();

  console.log(`current values: ${currentCount} 
    ${derivedCounter}`);

});

 const effectRef = effect(() => {
    
      console.log(`current value: ${this.count()}`);
    },
        {
            manualCleanup: true
        });

    // we can manually destroy the effect 
    // at any time
    effectRef.destroy();

    effect((onCleanup) => {
    
      console.log(`current value: ${this.count()}`);

      onCleanup(() => {
        console.log("Perform cleanup action here");
      });
    });

      // this works as expected
        this.counterWithSignal.set(5);

        // this throws a compilation error
        // this.derivedCounter.set(50);

          const readOnlyCounter = this.counterWithSignal.asReadonly();

        // this throws a compilation error
        // readOnlyCounter.set(5);

  }

  incrementWithSignal() {

    console.log(`Updating counter...`)

    this.counterWithSignal.set(this.counterWithSignal() + 1);
  // this.counter.update(counter => counter + 1);
  }



  //  derivedCounter = computed(() => {

  //       return this.counterWithSignal() * 10;

  //   })

    //  derivedCounter = computed(() => {

    //     return untracked(this.counterWithSignal) * 10;

    // })

     multiplier: number = 0;

    derivedCounter = computed(() => {
        if (this.counterWithSignal() == 0) {
            return 0
        }
        else {
            return this.counterWithSignal() * this.multiplier;
        }
    })

     list = signal([
        "Hello",
        "World"
    ]);



    object = signal(
  {
    id: 1,
    title: "Angular For Beginners",
  },
  {
    equal: (a, b) => {
      return a.id === b.id && a.title == b.title;
    },
  }
);

 title = computed(() => {

        console.log(`Calling computed() function...`)

        const course = this.object();

        return course.title;

    })

    updateObject() {

      // We are setting the signal with the exact same 
      // object to see if the derived title signal will 
      // be recalculated or not
      this.object.set({
        id: 1,
        title: "Angular For Beginners"
      });

    }


 num = 1;

  private cdr = inject(ChangeDetectorRef);

  ngOnInit() {
    // setInterval(() => {
    //   this.num = this.num + 1;
    //   this.cdr.markForCheck();
    // }, 1000);
  }
}
