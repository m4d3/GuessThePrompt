import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-user-txt-input',
  templateUrl: './user-txt-input.component.html',
  styleUrls: ['./user-txt-input.component.sass']
})
export class UserTxtInputComponent {
  value = '';

  @Output() onEnterEvent = new EventEmitter<string>();

  public OnSubmitEnter() {
    this.onEnterEvent.emit('eventDesc');
  }
}
