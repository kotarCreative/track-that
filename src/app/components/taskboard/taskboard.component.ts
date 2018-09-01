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
  @Input() status;
  @Input() tasks = [];

  // Events
  @Output() addTask = new EventEmitter<string>();
  @Output() removeTask = new EventEmitter<object>();

  // Computed Properties
  get estimatedTime() {
    return this.tasks.reduce((count, t) => count + t.estimatedTime, 0) || 0;
  }

  get filteredTasks() {
    return this.tasks.filter(t => t.status === this.status);
  }

  get title() {
    const str = this.status.toLowerCase().split('-');

    for (let i = 0; i < str.length; i++) {
        str[i] = str[i].split('');
        str[i][0] = str[i][0].toUpperCase();
        str[i] = str[i].join('');
    }

    return str.join(' ');
  }

  // Methods
  handleAddTask() {
    this.addTask.emit(this.status);
  }

  handleRemoveTask(task) {
    this.removeTask.emit(task);
  }
}
