import { TestBed, ComponentFixture, async } from '@angular/core/testing';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { FormsModule } from '@angular/forms';

import { BtnComponent } from '../button/button.component';
import { TaskBoardComponent } from '../taskboard/taskboard.component';
import { TimeCardComponent } from '../timecard/timecard.component';

import Task from '../../classes/Task';

describe('TaskBoardComponent', () => {
  let component: TaskBoardComponent;
  let fixture: ComponentFixture<TaskBoardComponent>;
  let estimatedTime = 0;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        BtnComponent,
        TaskBoardComponent,
        TimeCardComponent
      ],
      imports: [
        DragDropModule,
        FormsModule
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskBoardComponent);
    component = fixture.componentInstance;
    component.status = 'in-progress';

    const tasks = [];
    let count = 0;
    for (let i = 0; i < 10; i++) {
      const time = getRandomIntInclusive(1, 10);
      count += time;
      tasks.push(new Task(
        i,
        'Task ' + i,
        'This is a description.',
        time,
        'in-progress',
        i
      ));
    }
    estimatedTime = count;
    component.tasks = tasks;
    fixture.detectChanges();
  });

  // Test Component Creation
  it('should create the board', async(() => {
    expect(component).toBeDefined();
  }));

  // Test Component Title Rendering
  it(`should have a title 'In Progress'`, async(() => {
    expect(component.title).toEqual('In Progress');
  }));
  it(`should render a title 'In Progress'`, async(() => {
    const TaskBoardElement: HTMLElement = fixture.nativeElement;
    expect(TaskBoardElement.textContent).toContain('In Progress');
  }));
  it(`should calculate the estimated time for all tasks`, async(() => {
    expect(component.estimatedTime).toEqual(estimatedTime);
  }));
});

// Snatched from https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
