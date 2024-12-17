import {
  Component,
  computed,
  effect,
  inject,
  Signal,
  signal,
  untracked,
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
}

export interface Todo {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}
