import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { IonicModule } from '@ionic/angular';
import { FormatFilterPipe } from './pipes/format-filter.pipe';
import { PopoverContentComponent } from './components/popover-content/popover-content.component';

@NgModule({
  declarations: [ HeaderComponent, FormatFilterPipe, PopoverContentComponent],
  imports: [
    IonicModule,
    CommonModule
  ],
  exports: [
    CommonModule,
    HeaderComponent,
    FormatFilterPipe,
    PopoverContentComponent
  ]
})
export class SharedModule { }
