import { Component, EventEmitter, HostBinding, Input, Output } from '@angular/core';

@Component({
  selector: 'modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})

export class ModalComponent {
  // Define class on core component
  @HostBinding('class.modal') true;

  // Data
  private _show = false;

  // Props
  @Input() closeFn;
  @Input() maxWidth = '100%';
  @Input() size = 'md';

  // Computed Properties
  get show(): boolean {
    return this._show;
  }
  @Input()
  set show(val: boolean) {
    this._show = val;
  }

  get styles(): object {
    return {
      'max-width': this.maxWidth
    };
  }

  // Events
  @Output() close = new EventEmitter<any>();

  // Methods
  handleClose() {
    this.close.emit();
  }
}
