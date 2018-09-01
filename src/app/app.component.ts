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
  activeTask: Task;
  showAddTaskModal = false;
  showRemoveTaskModal = false;
  successMessage: string;
  tasks: Task[] = [];

  // Methods
  addTask() {
    this.tasks.push(this.activeTask);
    this.resetActiveTask();
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
    this.successMessage = 'Task successfully removed.';

    // Remove success message after a period of time.
    setTimeout(_ => {
      this.successMessage = null;
    }, 5000);
  }

  resetActiveTask() {
    this.activeTask = null;
  }
}
