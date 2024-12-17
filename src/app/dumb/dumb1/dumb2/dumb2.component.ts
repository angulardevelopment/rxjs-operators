
import {
  Component,
  EventEmitter,
  Input,
  ChangeDetectionStrategy,
  Output
} from "@angular/core";

@Component({
  selector: "app-dumb2",
  templateUrl: "./dumb2.component.html",
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false
})
export class Dumb2Component {
  @Input() counter = 0;
  @Output() send: EventEmitter<string> = new EventEmitter<string>();
  onClick() {
    this.send.emit("RESET");
  }
}
