import { Component, EventEmitter, HostBinding, Input, Output } from '@angular/core';

@Component({
  selector: 'task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss']
})

export class TaskComponent {
  name = 'task';

  // Define class on core component
  @HostBinding('class.task') true;

  // Props
  @Input() task = {
    id: -1,
    name: 'New Task',
    estimatedTime: 0,
    description: 'This is a task that needs to be done.'
  };

  // Events
  @Output() removeTask = new EventEmitter<number>();

  // Methods
  handleRemoveTask() {
    this.removeTask.emit(this.task.id);
  }
}
