import { Injectable } from "@angular/core";
import { BehaviorSubject, Subject, Observable } from "rxjs";

@Injectable()
export class SmartStoreService {
  private value = 20;
  private valueSubject = new BehaviorSubject<number>(this.value);
  private actionSubject = new Subject<string>();

  send(action: string, payload?: any): void {
    this.actionSubject.next(action);

    console.log(`Action ${action} with payload ${payload}`);
    switch (action) {
      case "ADD":
        this.valueSubject.next(++this.value);
        break;
      case "SUB":
        this.valueSubject.next(--this.value);
        break;
      case "RESET":
        this.valueSubject.next((this.value = 0));
        break;
      case "SET":
        this.value = payload;
        this.valueSubject.next(payload);
        break;
    }
  }

  data(): Observable<number> {
    return this.valueSubject.asObservable();
  }

  action(): Observable<string> {
    return this.actionSubject.asObservable();
  }

  snapshot(): number {
    return this.value;
  }
}
