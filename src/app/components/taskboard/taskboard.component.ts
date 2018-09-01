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
  @Input() estimatedTime = 0;
  @Input() tasks = [];
  @Input() title;

  // Mounted
  ngOnInit() {
  }

  // Methods
  addTask() {
    console.log('Add Task');
  }
}
