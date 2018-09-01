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
  filterStatuses(status) {
    return this.tasks.filter(t => t.status === status);
  }

  handleRemoveTask(id) {
    this.tasks = this.tasks.filter(t => t.id !== id);
  }
}
