import { UnitService } from './../services/unitservice';
import { DepartmentService } from './../services/departmentservice';
import { ListService } from './../services/listservice';
import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { IntroductionPage } from './../pages/introduction/introduction';
import { NewitemPage } from './../pages/newitem/newitem';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { DepartmentPage } from '../pages/department/department';

import { RoundProgressModule } from 'angular-svg-round-progressbar'; //https://github.com/crisbeto/angular-svg-round-progressbar

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ListPage,
    IntroductionPage,
    NewitemPage,
    DepartmentPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    RoundProgressModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ListPage,
    IntroductionPage,    
    NewitemPage,
    DepartmentPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    ListService,
    DepartmentService,
    UnitService
  ]
})
export class AppModule {}