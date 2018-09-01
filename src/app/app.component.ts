import { Component, AfterContentInit } from '@angular/core';
import {CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop';
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
  activeTask: Task = new Task(-1, '', '', 'in-progress', -1);
  errorMessage: string;
  showAddTaskModal = false;
  showRemoveTaskModal = false;
  successMessage: string;
  tasks: Task[] = [];

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
    window.localStorage.setItem('trackThatTasks', JSON.stringify(this.tasks));
    this.cancelAddTask();
    this.showNotification('Task successfully added.');
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
    }
  }

  handleAddTask(status) {
    this.activeTask = new Task(this.tasks.length, '', '', status, this.tasks.length);
    this.showAddTaskModal = true;
  }

  handleRemoveTask(task) {
    this.activeTask = task;
    this.showRemoveTaskModal = true;
  }

  removeTask() {
    this.tasks = this.tasks.filter(t => t.id !== this.activeTask.id);
    this.showRemoveTaskModal = false;
    this.showNotification('Task successfully removed.');
  }

  reorderTask(event) {
    moveItemInArray(this.tasks, event.previousIndex, event.currentIndex);
  }

  resetActiveTask() {
    this.activeTask = new Task(-1, '', '', 'in-progress', -1);
  }

  showNotification(message) {
    this.successMessage = message;

    // Remove success message after a period of time.
    setTimeout(_ => {
      this.successMessage = null;
    }, 5000);
  }
}
