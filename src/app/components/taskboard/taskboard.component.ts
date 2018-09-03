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

  // Data
  connectedLists = ['in-progress', 'planned', 'complete'];

  // Props
  @Input() status;
  @Input() tasks = [];

  // Events
  @Output() addTask = new EventEmitter<string>();
  @Output() changeTaskStatus = new EventEmitter<object>();
  @Output() removeTask = new EventEmitter<object>();
  @Output() reorderTask = new EventEmitter<object>();

  // Computed Properties
  get estimatedTime() {
    return this.tasks.reduce((count, t) => count + t.estimatedTime, 0) || 0;
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

  handleDrop(event) {
    if (event.item.data.status !== this.status) {
      this.changeTaskStatus.emit({ event: event, status: this.status });
    } else {
      this.reorderTask.emit({ id: event.item.data.id, order: event.currentIndex });
    }
  }

  handleRemoveTask(task) {
    this.removeTask.emit(task);
  }

  toggleTimer(task) {
    if (task.timerRunning) {
      task.stopTimer();
    } else {
      task.startTimer();
    }
  }
}
