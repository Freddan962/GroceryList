import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { NewitemPage } from './newitem';

@NgModule({
  declarations: [
    NewitemPage,
  ],
  imports: [
    IonicPageModule.forChild(NewitemPage),
  ],
})
export class NewitemPageModule {}
