import { Component, OnInit, ChangeDetectionStrategy } from "@angular/core";

@Component({
  selector: "app-dumb1",
  templateUrl: "./dumb1.component.html",
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Dumb1Component implements OnInit {
  constructor() {}

  ngOnInit() {}
}
