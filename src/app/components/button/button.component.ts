import { Component, HostBinding, Input } from '@angular/core';

@Component({
  selector: 'btn',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss']
})

export class BtnComponent {
  // Props
  @Input() label = 'Click Here';
  @Input() additionalClasses = '';
}
