import { Component } from '@angular/core';
import Task from './classes/Task';
import dummyData from './dummyData';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'trackthat';

  // Data
  activeTask: Task = new Task(-1, '', '', 'in-progress');
  errorMessage: string;
  showAddTaskModal = false;
  showRemoveTaskModal = false;
  successMessage: string;
  tasks: Task[] = [];

  // Methods
  addTask() {
    if (!this.activeTask.validate()) {
      this.errorMessage = 'All fields must be filled out.';
      return;
    }
    this.tasks.push(this.activeTask);
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

  handleAddTask(status) {
    this.activeTask = new Task(this.tasks.length, '', '', status);
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

  resetActiveTask() {
    this.activeTask = new Task(-1, '', '', 'in-progress');
  }

  showNotification(message) {
    this.successMessage = message;

    // Remove success message after a period of time.
    setTimeout(_ => {
      this.successMessage = null;
    }, 5000);
  }
}
