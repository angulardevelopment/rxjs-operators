import { ChangeDetectorRef, Component } from "@angular/core";
import { SmartStoreDirective } from "./smart-store.directive";
import { SmartStoreService } from "./smart-store.service";

@Component({
  selector: "app-smart-store",
  template: `
    <ng-content></ng-content>
  `,
  standalone: false
})
export class SmartStoreComponent extends SmartStoreDirective {
  constructor(smartService: SmartStoreService, cd: ChangeDetectorRef) {
    super(smartService, cd);
  }
}
