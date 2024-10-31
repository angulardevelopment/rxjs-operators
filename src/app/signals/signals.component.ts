import { Component,  computed,
  effect,
  inject,
  signal,
  WritableSignal, } from '@angular/core';
  import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { BookService } from '../book.service';

@Component({
  selector: 'app-signals',
  templateUrl: './signals.component.html',
  styleUrls: ['./signals.component.scss']
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

  constructor() {
    effect(() => {
      console.log(`${this.fullName()} updated`);
    });
  }

  protected setName(name: WritableSignal<string>, event: Event) {
    name.set((event.target as HTMLInputElement).value || '');
  }
}
