import {
  afterRenderEffect,
  Component,
  computed,
  Directive,
  effect,
  ElementRef,
  inject,
  input,
  linkedSignal,
  resource,
  Signal,
  signal,
  untracked,
  viewChild,
  WritableSignal,
} from '@angular/core';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { BookService } from '../services/book.service';

@Component({
  selector: 'app-signals',
  templateUrl: './signals.component.html',
  styleUrls: ['./signals.component.scss'],
  standalone: false
})
export class SignalsComponent {
  protected readonly firstName = signal('demo');
  protected readonly lastName = signal('new');
  protected readonly fullName = computed(
    () => `${this.firstName()} ${this.lastName()}`
  );
  protected readonly fullNameStream = toObservable(this.fullName);
  readonly bookService = inject(BookService);
  readonly books = toSignal(this.bookService.getAll());

  userId = input<number>(1);
  // Data fetching
  user = resource({
    request: () => this.userId(),
    loader: async ({ request: id }) =>{
      const response = await this.bookService.getUser(id).toPromise();
    return response;
  }
  });

  userData(){
    console.log('user:', this.user.value());
  }
  // user = httpResource(() =>
  //  `/data/user/${this.userIdid()}`
  // );

  // user = httpResource(() => ({
  //   method: 'GET',
  //   url: `/data/${id()}`,
  //   headers: {
  //       'X-Page': this.page(),
  //   }
  // }));

  constructor() {
    effect(() => {
      console.log(`${this.fullName()} updated`);
    });
  }

  ngOnInit(): void {
   
  }

  Test() {
    // Creating and reading a signal:
    const count = signal(0);
    // Signals are getter functions - calling them reads their value.
    console.log('The count is: ' + count());
    // Setting or updating the value:
    // Setting a new signal value
    count.set(3);
    // Updating the existing value
    // Increment the count by 1.
    count.update((value) => value + 1);
    // Creating a computed signal:
    const count1: WritableSignal<number> = signal(0);
    const doubleCount: Signal<number> = computed(() => count1() * 2);
    // Creating an effect:
    effect(() => {
      console.log(`The current count is: ${count1()}`);
    });
    // Utilizing an untracked:
    const currentUser = signal('I am a user');
    effect(() => {
      console.log(
        `User set to ${currentUser()} and the counter is ${untracked(count)}`
      );
    });
  }

  protected setName(name: WritableSignal<string>, event: Event) {
    name.set((event.target as HTMLInputElement).value || '');
  }

  // effectVersion(){
  //   id = injectParams('id');

  //   idNumber = computed(() => Number(this.id()));

  //   todo = derivedAsync<Todo>(() =>
  //     fetch(`https://jsonplaceholder.typicode.com/todos/${this.id()}`).then(
  //       (response) => response.json()
  //     )
  //   );

  //   prevId = computed(() => Math.max(this.idNumber() - 1, 1));
  //   nextId = computed(() => this.idNumber() + 1);
  // }

  id() {}

  idNumber() {
    return 1;
  }

  // ResolverVersion(){
  //   todo = injectRouteData<Todo>('data');

  //   idNumber = computed(() => this.todo()!.id);

  //   prevId = computed(() => Math.max(this.idNumber() - 1, 1));
  //   nextId = computed(() => this.idNumber() + 1);
  // }

  todo() {
    return { id: 2 };
  }

  options = signal([
    'apple',
    'banana',
    'fig'
  ]);

  // linkedSignal works similarly to signal with one key difference— instead of passing a default value, you pass a computation function, just like computed. When the value of the computation changes, the value of the linkedSignal changes to the computation result. This is useful when you want to create a signal that depends on another signal.
  choice = linkedSignal(
    () => this.options()[0]
  );

  setOption(option: string) {
    this.choice.set(option);
    console.log('Option:', this.choice());
  }

    // Data stored in signals
    data = signal({
      first: "Pawel",
      last: "K",
    });

    // Form state derived from data
    // form = signalForm(this.data);

    quantity = signal(1);

    qtyAvailable = signal([1, 2, 3, 4, 5, 6]);

    selectedVehicle = signal<Vehicle>({
      id: 1,
      name: 'AT-AT',
      price: 19416.13
    });

    vehicles = signal<Vehicle[]>([]);

    onQuantitySelected(qty: number) {
      this.quantity.set(qty);

      this.quantity.set(5);
      this.quantity.set(42);
    }

    totalPrice = computed(() => this.selectedVehicle().price * this.quantity());

    color = computed(() => this.totalPrice() > 50000 ? 'green' : 'blue');
}

export interface Todo {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}

export interface  Vehicle{
  id: number;
  name: string,
  price: number
}
@Directive()
export class UserProfile {
  first = input<string>();
  last  = input.required<string>();

  fullName = computed(() =>
    this.first() ?
      `${this.first()} ${this.last()}`:
      this.last()
  );
}

@Directive()
export class App {
  firstItem = viewChild<ElementRef>('item');

  constructor() {
    afterRenderEffect(() => {
 this.firstItem()?.nativeElement.focus();
    });
  }
}


// ou can think of a signal as a value plus a change notification. A signal is just a special type of variable that holds a value

// Signals let us understand changes to the data model (what gets modified) and how the model is used (templates that need update).

// With this precise info we can just update templates that read changed values, instead of dirty-checking the entire application / all templates.

// A side observation is that we are getting more and more streams (like media capture) in the browser. Signals are a great way create a reactive interface to those streams. And that is something that is going to be more and more important in the future.

// You can still use Observables. You can still use Promises. You can still use the async pipe.

// The problem Angular Signals solves is:

// Adds the missing reactive primitive in Javascript.

// Allows very fine-grained control over when and how the view is updated.

// Enables future zone-less applications.

// Bridge the gap between the imperative and reactive world

// RxJs follows the observer pattern, where you have an observable that emits values, and observers that subscribe to receive and react to those values. Signals, on the other hand, are a concept used in some programming languages and frameworks for handling events and asynchronous operations.

// Example-

// let x = 5;
// let y = 3;
// let z = x + y;
// console.log(z);

// let x = 5;
// let y = 3;
// let z = x + y;
// console.log(z);

// x = 10;
// console.log(z);

// It still logs out 8! That's because a value is assigned to z when the expression is first evaluated. The z variable does not react to changes in x or y.

// const x = signal(5);
// const y = signal(3);
// const z = computed(() => x() + y());
// console.log(z()); // 8

// x.set(10);
// console.log(z()); // 13

// if you use signal it react to those changes.

// Reactivity. Powered by signals.
// Reactive inputs, model and queries:
// participate in the reactive graph;
// improved type safety;
// reviewed and simplified API surface;
// Reactive inputs, model, queries and outputs are stable in Angular v19.

// $ ng generate @angular/core:signals

// // or run individual, focused migrations
// @angular/core:signal-input-migration
// @angular/core:signal-queries-migration
// @angular/core:output-migration

// New reactive primitives:
// afterRenderEffect -> Combines effect + afterRender hook:
// effect track reactive dependencies
// runs when it is safe to do changes to the DOM

// linkedSignal -> State that depends on another reactive state:
// It is a writable signal
// Initialized and reset based on the dependencies change.
// Describes a relationship without using effects.

// signals meet async data: resource
// Asynchronous data meet signals:
// Asynchronously loads data in response to dependencies change
// Exposes loaded data as signal
// Loading and error states are signals too
// There is a rxResource version

// httpResource-
// resource wrapping HTTPClient:
// Reusing existing interceptors
// Testing story is here as well
// Simplified API , More advanced API version


