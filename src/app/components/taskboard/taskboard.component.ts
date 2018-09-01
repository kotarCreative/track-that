import { Component, HostBinding, Input, OnInit } from '@angular/core';

@Component({
  selector: 'task-board',
  templateUrl: './taskboard.component.html',
  styleUrls: ['./taskboard.component.scss']
})

export class TaskBoardComponent implements OnInit {
  name = 'taskBoard';

  // Define class on core component
  @HostBinding('class.task-board') true;

  // Props
  @Input() tasks = [];
  @Input() title;

  // Mounted
  ngOnInit() {
  }

  // Computed Properties
  get estimatedTime() {
    console.log(this.tasks.reduce((t, count) => count + t.estimatedTime, 0));
    return this.tasks.reduce((count, t) => count + t.estimatedTime, 0);
  }

  // Methods
  addTask() {
    console.log('Add Task');
  }
}
