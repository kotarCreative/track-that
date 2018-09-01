import { Component, HostBinding, Input, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'time-card',
  templateUrl: './timecard.component.html',
  styleUrls: ['./timecard.component.scss']
})

export class TimeCardComponent {
  @Input() time = 0;
  @HostBinding('class.timecard') true;
}
