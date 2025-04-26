import {
  Directive,
  Output,
  EventEmitter,
  Input,
  SimpleChange,
} from '@angular/core';

@Directive({
  standalone: true,
  selector: '[onCreate]',
})
export class OnCreate {
  @Output() onCreate: EventEmitter<any> = new EventEmitter<any>();
  constructor() {}
  ngOnInit() {
    this.onCreate.emit('');
  }
}
