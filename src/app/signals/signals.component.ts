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
import { z } from "zod";
import { ApiService, Todo } from '../resource-api-demo/api.service';
import { BehaviorSubject, from, map, Observable, switchMap } from 'rxjs';

@Component({
  selector: 'app-signals',
  templateUrl: './signals.component.html',
  styleUrls: ['./signals.component.scss'],
  standalone: false
})
export class SignalsComponent {
  constructor(public api: ApiService) {
    // only be used within an injection context such as a constructor
    effect(() => {
      console.log(`${this.fullName()} updated`);
    });

        // Creating an effect:
        effect(() => {
          console.log(`The current count is: ${this.count1()}`);
        });

        effect(() => {
          console.log(
            `User set to ${this.currentUser()} and the counter is ${untracked(this.count)}`
          );
        });
  }

  ngOnInit() {
    this.creatingReadingSignal();
    }

  protected readonly firstName = signal('first');     // Data stored in signals
  protected readonly lastName = signal('last');
  protected readonly fullName = computed(
    () => `${this.firstName()} ${this.lastName()}`
  );
  protected readonly fullNameStream = toObservable(this.fullName);
  readonly bookService = inject(BookService);
  readonly books = toSignal(this.bookService.getAll());

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
  todo = 
  resource({
    request: () => this.id(), // Request function to get the ID
    loader: async ({ request: id }) => {
      const response: Todo = await this.api.getTodoById(id).toPromise(); // Fetch todo based on the ID
      return response;
    }
    });
  
  // Define id as a BehaviorSubject (RxJS way of handling state)
  // id$ = new BehaviorSubject<number>(1);

  // // Create observables for previous and next id
  // prevId$ = this.id$.pipe(map(id => Math.max(id - 1, 1)));
  // nextId$ = this.id$.pipe(map(id => id + 1));

  // // Observable for fetching todo based on id
  // todo$: Observable<Todo> = this.id$.pipe(
  //   switchMap(id => this.todoService.getTodoById(id)) // Replace with actual service call
  // );

  // constructor(private todoService: TodoService) {}

  // // Update id value
  // setId(id: number): void {
  //   this.id$.next(id); // Update the current id
  // }

  userId = input<number>(1); // InputSignal
  // Data fetching with signals
  // The resource function is used to create a resource that can be used to fetch data asynchronously.
  // The resource function takes a request function and a loader function as arguments.
  user = resource({
    request: () => this.userId(),
    loader: async ({ request: id }) =>{
      const response = await this.bookService.getUser(id).toPromise();
    return response;
  }
  });

  id1 = signal(1);
  swPersonResource = resource({
    // request: () => `https://swapi.dev/api/people/${this.id1()}`,
    request: () => this.id1(),
    loader: async ({ request, abortSignal }) => {
      const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${request}`, {
        signal: abortSignal,
      });
      if (!response.ok) throw new Error("Unable to load users!");
      return (await response.json());
  }
  });
  
  form = signal({
      first: "Pawel",
      last: "K",
    });

// Initialize form state with data
 initializeForm(data) {
  this.form.set({ first: data.name, last: data.email });
}

submitData(){
  console.log('Form data:', this.todo.value());
}
    quantity = signal(1);
    qtyAvailable = signal([1, 2, 3, 4, 5, 6]);
    selectedVehicle = signal<Vehicle>({
      id: 1,
      name: 'AT-AT',
      price: 19416.13
    });
    vehicles = signal<Vehicle[]>([]);
    totalPrice = computed(() => this.selectedVehicle().price * this.quantity());
    color = computed(() => this.totalPrice() > 50000 ? 'green' : 'blue');

    onQuantitySelected(qty: number) {
      this.quantity.set(qty);
    }



  userData(){
    console.log('user:', this.user.value(), this.swPersonResource.value());
  }

  count1: WritableSignal<number>;
  currentUser;
  count;
  creatingReadingSignal() {
    this.count = signal(0);
    // Signals are getter functions - calling them reads their value.
    console.log('The count is: ' + this.count());
    // Setting or updating the value:
    // Setting a new signal value
    this.count.set(3);
    // Updating the existing value
    // Increment the count by 1.
    this.count.update((value) => value + 1);
    // Creating a computed signal:
    this.count1  = signal(0);
    const doubleCount: Signal<number> = computed(() => this.count1() * 2);

    // Utilizing an untracked:
    this.currentUser = signal('I am a user');

  }

  protected setName(name: WritableSignal<string>, event: Event) {
    name.set((event.target as HTMLInputElement).value || '');
  }


   id = signal(2);
   idNumber = computed(() => Number(this.id()));
   // Use this to compute previous and next IDs
   prevId$ = computed(() => Math.max(this.idNumber() - 1, 1))
   nextId$ = computed(() => this.idNumber() + 1);
 
   // Set a new ID value
   setId(id: number): void {
     this.id.set(id);
   }
  
    // let id = signal(1); // injectParams('id');

    // let idNumber = computed(() => Number(this.id()));

    // // there is no built-in concept called derivedAsync like in Solid.js or Svelte. However, you can achieve similar functionality by leveraging Angular's reactive programming features, such as RxJS observables and async pipe for handling asynchronous data.
    // let todo = derivedAsync<Todo>(() =>
    //   fetch(`https://jsonplaceholder.typicode.com/todos/${this.id()}`).then(
    //     (response) => response.json()
    //   )
    // );

    // let prevId = computed(() => Math.max(this.idNumber() - 1, 1));
    // let nextId = computed(() => this.idNumber() + 1);

  // ResolverVersion(){
  //   todo = injectRouteData<Todo>('data');

  //   idNumber = computed(() => this.todo()!.id);

  //   prevId = computed(() => Math.max(this.idNumber() - 1, 1));
  //   nextId = computed(() => this.idNumber() + 1);
  // }

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
  }

  changeOption() {
    this.options.set(['apple', 'banana', 'grape']);
  }
 
  siggy = signal(1);
//   linky = linkedSignal({
//   source: this.siggy,
//   computation: (value, previous) => value * 2,
// });
linky = linkedSignal(() => this.siggy() * 2);

// setting the new value, skiping the computation
setSiggy(value: number) {
this.siggy.set(value); 
}
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


// You can think of a signal as a value plus a change notification. A signal is just a special type of variable that holds a value

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



  // Zod Schema
  export const starWarsPersonSchema = z.object({
    name: z.string(),
    height: z.number({ coerce: true }),
    edited: z.string().datetime(),
    films: z.array(z.string()),
    title: z.string(),
    })