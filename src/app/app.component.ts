import { Component, AfterContentInit } from '@angular/core';
import { moveItemInArray } from '@angular/cdk/drag-drop';
import Task from './classes/Task';
import dummyData from './dummyData';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterContentInit {
  title = 'trackthat';

  // Data
  activeTask: Task = new Task(-1, '', '', 0, 'in-progress', -1);
  errorMessage: string;
  showAddTaskModal = false;
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

  // Mounted
  ngAfterContentInit() {
    if (window.localStorage.getItem('trackThatTasks')) {
      this.tasks = JSON.parse(window.localStorage.getItem('trackThatTasks'));
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

  handleAddTask(status) {
    this.activeTask = new Task(this.tasks.length, '', '', 0, status, this.tasks.length);
    this.showAddTaskModal = true;
  }

  handleRemoveTask(task) {
    this.activeTask = task;
    this.showRemoveTaskModal = true;
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

  removeTask() {
    this.tasks = this.tasks.filter(t => t.id !== this.activeTask.id);
    this.showRemoveTaskModal = false;
    this.showNotification('Task successfully removed.');
    this.save();
  }

  reorderTask({ id, order }) {
    const task = this.tasks.find(t => t.id === id);

    // Moving down the list
    if (order > task.order) {
      for (let i = task.order; i > order; i--) {
        if (this.tasks[i]) {
          this.tasks[i].order--;
        }
      }

    // Moving up the list
    } else if (order < task.order) {
      for (let i = order; i < task.order; i++) {
        if (this.tasks[i]) {
          this.tasks[i].order++;
        }
      }
    }

    if (task) {
      task.order = order;
    }

    this.save();
  }

  resetActiveTask() {
    this.activeTask = new Task(-1, '', '', 0, 'in-progress', -1);
  }

  save() {
    window.localStorage.setItem('trackThatTasks', JSON.stringify(this.tasks));
  }

  showNotification(message) {
    this.successMessage = message;

    // Remove success message after a period of time.
    setTimeout(_ => {
      this.successMessage = null;
    }, 5000);
  }
}
