import { Component, Input } from '@angular/core';
import { PopoverController } from '@ionic/angular';

@Component({
  selector: 'pantano-popover-content',
  templateUrl: './popover-content.component.html',
  styleUrls: ['./popover-content.component.scss'],
})
export class PopoverContentComponent {
  @Input() message;
  @Input() title;

  constructor(private popoverCtrl: PopoverController) { }

  next() {
    this.popoverCtrl.dismiss();
  }

}
