import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { NewlistPage } from './newlist';

@NgModule({
  declarations: [
    NewlistPage,
  ],
  imports: [
    IonicPageModule.forChild(NewlistPage),
  ],
})
export class NewlistPageModule {}
