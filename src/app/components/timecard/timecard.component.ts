import { Component, HostBinding, Input } from '@angular/core';

@Component({
  selector: 'time-card',
  templateUrl: './timecard.component.html',
  styleUrls: ['./timecard.component.scss']
})

export class TimeCardComponent {
  // Define class on core component
  @HostBinding('class.timecard-wrapper') true;

  // Props
  @Input() time = 0;
  @Input() timeType = 'estimated';
  @Input() showLabel = true;

  // Computed
  get formattedTime() {
    const time = String(this.time).split('.'),
          minutes = time[1] ? Math.round(Number('0.' + time[1]) * 60) : 0;

    let minutesStr = String(minutes);

    if (minutes < 10) {
      minutesStr = '0' + String(minutes);
    }
    return time[0] + ':' + minutesStr;
  }
}
