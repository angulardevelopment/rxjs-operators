import { Component,  computed,
  effect,
  signal,
  WritableSignal, } from '@angular/core';
  import { toObservable } from '@angular/core/rxjs-interop';

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

  constructor() {
    effect(() => {
      console.log(`${this.fullName()} updated`);
    });
  }

  protected setName(name: WritableSignal<string>, event: Event) {
    name.set((event.target as HTMLInputElement).value || '');
  }
}
