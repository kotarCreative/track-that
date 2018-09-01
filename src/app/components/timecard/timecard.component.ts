import { Component, HostBinding, Input } from '@angular/core';

@Component({
  selector: 'time-card',
  templateUrl: './timecard.component.html',
  styleUrls: ['./timecard.component.scss']
})

export class TimeCardComponent {
  // Define class on core component
  @HostBinding('class.timecard') true;

  // Props
  @Input() time = 0;
}
