import { Component, ChangeDetectionStrategy, OnInit } from "@angular/core";

@Component({
  selector: "app-dumb",
  templateUrl: "./dumb.component.html",
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DumbComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}
