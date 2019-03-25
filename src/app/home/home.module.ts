import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';

import { HomePage } from './home.page';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [
    SharedModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild([
      {
        path: '',
        component: HomePage
      }
    ])    
  ],
  declarations: [HomePage]
})
export class HomePageModule {}
