import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { IonicModule } from '@ionic/angular';
import { FormatFilterPipe } from './pipes/format-filter.pipe';

@NgModule({
  declarations: [ HeaderComponent, FormatFilterPipe ],
  imports: [
    IonicModule,
    CommonModule
  ],
  exports: [
    CommonModule,
    HeaderComponent,
    FormatFilterPipe
  ]
})
export class SharedModule { }
