import { ChangeDetectorRef, Directive } from "@angular/core";
import { Subscription } from "rxjs";
import { SmartStoreService } from "./smart-store.service";

@Directive({
  selector: "[appSmartStore]",
  exportAs: "appSmartStore"
})
export class SmartStoreDirective {
  value: number;
  private subscription: Subscription;

  constructor(
    private smartService: SmartStoreService,
    private cd: ChangeDetectorRef
  ) {}

  send(action) {
    this.smartService.send(action);
  }

  get data() {
    if (!this.subscription) {
      this.subscription = this.smartService.data().subscribe(data => {
        this.value = data;
        this.cd.markForCheck();
      });
    }
    return this.value;
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
