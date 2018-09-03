import { TestBed, ComponentFixture, async } from '@angular/core/testing';

import { BtnComponent } from '../button/button.component';

describe('BtnComponent', () => {
  let component: BtnComponent;
  let fixture: ComponentFixture<BtnComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        BtnComponent
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BtnComponent);
    component = fixture.componentInstance;
  });

  // Test Component Creation
  it('should create the button', async(() => {
    expect(component).toBeDefined();
  }));

  // Test Component Title Rendering
  it(`should have the title 'Click Here' when initially rendered`, async(() => {
    expect(component.label).toEqual('Click Here');
  }));
  it(`should have the new title 'Test Btn' after change detected`, async(() => {
    component.label = 'Test Btn';
    fixture.detectChanges();
    expect(component.label).toEqual('Test Btn');
  }));
  it(`should render the new label`, async(() => {
    component.label = 'Test Btn';
    fixture.detectChanges();
    const BtnElement: HTMLElement = fixture.nativeElement;
    expect(BtnElement.textContent).toContain('Test Btn');
  }));
  it(`should have extra class 'test' added to it.`, async(() => {
    component.additionalClasses = 'test';
    fixture.detectChanges();
    const BtnElement = fixture.debugElement.nativeElement;
    expect(BtnElement.querySelector('button').classList.contains('test')).toBeTruthy();
  }));
});

// Snatched from https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
