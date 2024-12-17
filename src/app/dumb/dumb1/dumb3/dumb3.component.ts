import {
  Component,
  EventEmitter,
  Input,
  ChangeDetectionStrategy,
  Output
} from "@angular/core";

@Component({
  selector: "app-dumb3",
  templateUrl: "./dumb3.component.html",
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false
})
export class Dumb3Component {
  @Input() counter = 0;
  @Output() send: EventEmitter<string> = new EventEmitter<string>();
  onAdd() {
    this.send.emit("ADD");
  }
  onSub() {
    this.send.emit("SUB");
  }
}
