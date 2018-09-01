import { Component, HostBinding, Input, ViewEncapsulation } from '@angular/core';

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
    name: 'New Task',
    estimatedTime: 0,
    description: 'This is a task that needs to be done.'
  };

  // Methods
  confirmTaskRemoval() {
    console.log('Task Removed');
  }
}
