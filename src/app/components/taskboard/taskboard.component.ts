import { Component, EventEmitter, HostBinding, Input, Output } from '@angular/core';

@Component({
  selector: 'task-board',
  templateUrl: './taskboard.component.html',
  styleUrls: ['./taskboard.component.scss']
})

export class TaskBoardComponent {
  name = 'taskBoard';

  // Define class on core component
  @HostBinding('class.task-board') true;

  // Props
  @Input() tasks = [];
  @Input() title;

  // Events
  @Output() removeTask = new EventEmitter<number>();

  // Computed Properties
  get estimatedTime() {
    return this.tasks.reduce((count, t) => count + t.estimatedTime, 0);
  }

  // Methods
  addTask() {
    console.log('Add Task');
  }

  handleRemoveTask(id) {
    this.removeTask.emit(id);
  }
}
