import { Component } from '@angular/core';
import dummyData from './dummyData';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'trackthat';

  // Data
  activeTaskID = -1;
  showRemoveTaskModal = false;
  successMessage: string;
  tasks = dummyData.tasks;

  // Computed Properties
  get completedTasks() {
    return this.filterStatuses('completed');
  }
  get inProgressTasks() {
    return this.filterStatuses('in-progress');
  }
  get plannedTasks() {
    return this.filterStatuses('planned');
  }

  // Methods
  cancelRemoveTask() {
    this.activeTaskID = -1;
    this.showRemoveTaskModal = false;
  }

  filterStatuses(status) {
    return this.tasks.filter(t => t.status === status);
  }

  handleRemoveTask(id) {
    this.activeTaskID = id;
    this.showRemoveTaskModal = true;
  }

  removeTask() {
    this.tasks = this.tasks.filter(t => t.id !== this.activeTaskID);
    this.showRemoveTaskModal = false;
    this.successMessage = 'Task successfully removed.';

    // Remove success message after a period of time.
    setTimeout(_ => {
      this.successMessage = null;
    }, 5000);
  }
}
