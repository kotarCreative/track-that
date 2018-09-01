import { Component, Input } from '@angular/core';

@Component({
  selector: 'btn',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss']
})

export class BtnComponent {
  name = 'btn';

  // Props
  @Input() label = 'Click Here';
  @Input() additionalClasses = '';
}
