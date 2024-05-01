import { Component, Input, OnInit } from "@angular/core";
import { Observable } from "rxjs";
import { SmartStoreService } from "./smart-store.service";

@Component({
  selector: "app-smart",
  templateUrl: "./smart.component.html",
  providers: [SmartStoreService]
})
export class SmartComponent implements OnInit {
  @Input() user;
  data$: Observable<number>;
  action$: Observable<string>;

  constructor(private smartService: SmartStoreService) {
    this.data$ = this.smartService.data();
    this.action$ = this.smartService.action();
  }

  random() {
    this.set(Math.floor(Math.random() * 10));
  }

  set(value: number) {
    this.smartService.send("SET", value);
  }

  ngOnInit() {}

  
}

@Component({
  selector: "app-smart-state",
  template: `
    <ng-content></ng-content>
  `
})
export class SmartStateComponent {
  constructor(public smartComponent: SmartComponent) {}
}
