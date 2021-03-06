import { Component, AfterContentInit, OnInit } from '@angular/core';
import { moveItemInArray } from '@angular/cdk/drag-drop';
import Task from './classes/Task';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterContentInit, OnInit {
  title = 'trackthat';

  // Data
  activeTask: Task = new Task(-1, '', '', 0, 0, 'in-progress', -1);
  errorMessage: string;
  estimatedTimeHours = null;
  estimatedTimeMinutes = null;
  showAddTaskModal = false;
  showIntro = true;
  showRemoveTaskModal = false;
  successMessage: string;
  tasks: Task[] = [];

  // Computed Properties
  get completeTasks() {
    return this.tasks.filter(t => t.status === 'complete');
  }

  get inProgressTasks() {
    return this.tasks.filter(t => t.status === 'in-progress');
  }

  get plannedTasks() {
    return this.tasks.filter(t => t.status === 'planned');
  }

  // Created
  ngOnInit() {
    if (typeof window.localStorage.getItem('trackThatIntro') !== 'undefined' && window.localStorage.getItem('trackThatIntro') === 'false') {
      this.showIntro = false;
    }
    window.onbeforeunload = _ => { this.save(); };
  }

  // Mounted
  ngAfterContentInit() {
    if (window.localStorage.getItem('trackThatTasks')) {
      const tasks = JSON.parse(window.localStorage.getItem('trackThatTasks'));
      tasks.forEach(t => {
        this.tasks.push(new Task(t.id, t.name, t.description, t.estimatedTime, t.actualTime, t.status, t.order));
      });
    } else {
      window.localStorage.setItem('trackThatTasks', '');
    }
  }

  // Methods
  addTask() {
    if (!this.activeTask.validate()) {
      this.errorMessage = 'All fields must be filled out.';
      return;
    }
    this.tasks.push(this.activeTask);
    this.cancelAddTask();
    this.showNotification('Task successfully added.');
    this.save();
  }

  cancelAddTask() {
    this.resetActiveTask();
    this.showAddTaskModal = false;
  }

  cancelRemoveTask() {
    this.activeTask.id = -1;
    this.showRemoveTaskModal = false;
  }

  changeTaskStatus({ event, status }) {
    const task = this.tasks.find(t => t.id === event.item.data.id);

    if (task) {
      task.status = status;
      this.reorderTask({ id: event.item.data.id, order: event.currentIndex });
    }
  }

  getTasks(status) {
    let taskKey = status.toLowerCase().split('-');
    for (let i = 1; i < taskKey.length; i++) {
        taskKey[i] = taskKey[i].split('');
        taskKey[i][0] = taskKey[i][0].toUpperCase();
        taskKey[i] = taskKey[i].join('');
    }

    taskKey = taskKey.join('') + 'Tasks';
    return this[taskKey].sort((a, b) => a.order > b.order);
  }

  handleAddTask(status) {
    this.activeTask = new Task(this.tasks.length, '', '', null, null, status, this.tasks.length);
    this.showAddTaskModal = true;
  }

  handleCloseIntro() {
    this.showIntro = false;
    window.localStorage.setItem('trackThatIntro', 'false');
  }

  handleOpenIntro() {
    this.showIntro = true;
    window.localStorage.removeItem('trackThatIntro');
  }

  handleRemoveTask(task) {
    this.activeTask = task;
    this.showRemoveTaskModal = true;
  }

  removeTask() {
    this.tasks = this.tasks.filter(t => t.id !== this.activeTask.id);
    this.showRemoveTaskModal = false;
    this.showNotification('Task successfully removed.');
    this.save();
  }

  reorderTask({ id, order }) {
    const task = this.tasks.find(t => t.id === id),
          idx = this.tasks.findIndex(t => t.id === id);

    if (task) {
      task.order = order;
    }

    // Moving down the list
    if (order > idx) {
      for (let i = order; i > idx; i--) {
        if (this.tasks[i]) {
          this.tasks[i].order--;
        }
      }

    // Moving up the list
    } else if (order < idx) {
      for (let i = order; i < idx; i++) {
        if (this.tasks[i]) {
          this.tasks[i].order++;
        }
      }
    }

    this.save();
  }

  resetActiveTask() {
    this.estimatedTimeHours = null;
    this.estimatedTimeMinutes = null;
    this.activeTask = new Task(-1, '', '', null, null, 'planned', -1);
  }

  save() {
    if (this.tasks.length > 0) {
      window.localStorage.setItem('trackThatTasks', JSON.stringify(this.tasks));
    } else {
      window.localStorage.removeItem('trackThatTasks');
    }
  }

  showNotification(message) {
    this.successMessage = message;

    // Remove success message after a period of time.
    setTimeout(_ => {
      this.successMessage = null;
    }, 5000);
  }

  updateNewTaskEstimatedTime() {
    this.activeTask.estimatedTime = Number(this.estimatedTimeHours) + (Number(this.estimatedTimeMinutes) / 60);
  }

  validateNewTaskEstimatedTime(event, type) {
    const keyCode = event.which || event.keyCode,
          otherKey = event.metaKey || event.altKey || event.ctrlKey || event.shiftKey,
          specialKeys = [ 8, 110, 190 ];

    // Short circuit on tabs and backspaces.
    if ([8, 9].includes(keyCode)) {
      this['estimatedTime' + type] = event.target.value;
      return;
    }

    if (!otherKey
        && (this['estimatedTime' + type] === null || String(this['estimatedTime' + type]).length < 2)
        && (keyCode >= 48 && keyCode <= 57)
        && ((type === 'Hours' && event.target.value <= 24) || (type === 'Minutes' && event.target.value <= 60))) {
        this['estimatedTime' + type] = event.target.value;
        return;
    } else {
       event.preventDefault();
      return;
    }
  }
}
