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
  protected readonly firstName = signal('demo');
  protected readonly lastName = signal('new');
  protected readonly fullName = computed(
    () => `${this.firstName()} ${this.lastName()}`
  );

  protected readonly fullNameStream = toObservable(this.fullName);
  readonly bookService = inject(BookService);
  readonly books = toSignal(this.bookService.getAll());

  constructor() {
    effect(() => {
      console.log(`${this.fullName()} updated`);
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

  choice = linkedSignal(
    () => this.options()[0]
  );

    userId = input<number>();
    // Data fetching
    user = resource({
      request: () => this.userId(),
      loader: async ({ request: id }) =>
        await this.bookService.getUser(id),
    });

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

    // Data stored in signals
    data = signal({
      first: "Pawel",
      last: "K",
    });

    // Form state derived from data
    // form = signalForm(this.data);


}

export interface Todo {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
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




