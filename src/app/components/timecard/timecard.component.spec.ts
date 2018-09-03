import { TestBed, ComponentFixture, async } from '@angular/core/testing';

import { TimeCardComponent } from './timecard.component';

describe('TimeCardComponent', () => {
  let component: TimeCardComponent;
  let fixture: ComponentFixture<TimeCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        TimeCardComponent
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TimeCardComponent);
    component = fixture.componentInstance;
  });

  // Test Component Creation
  it('should create the timecard', async(() => {
    expect(component).toBeDefined();
  }));

  // Test Component Label Rendering
  it(`should have a time of '0' when initially rendered`, async(() => {
    expect(component.time).toEqual(0);
  }));
  it(`should have a new time of '10' after change detected`, async(() => {
    component.time = 10;
    fixture.detectChanges();
    expect(component.time).toEqual(10);
  }));
});
