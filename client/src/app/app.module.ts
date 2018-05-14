import { UnitPage } from './../pages/unit/unit';
import { DepartmentService } from './../services/departmentservice';
import { ListService } from './../services/listservice';
import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { IntroductionPage } from './../pages/introduction/introduction';
import { NewlistPage } from './../pages/newlist/newlist';
import { NewitemPage } from './../pages/newitem/newitem';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { RecipePage } from '../pages/recipe/recipe';
import { DepartmentPage } from '../pages/department/department';
@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ListPage,
    IntroductionPage,
    NewlistPage,
    NewitemPage,
    RecipePage,
    DepartmentPage,
    UnitPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ListPage,
    IntroductionPage,    
    NewlistPage,
    NewitemPage,
    RecipePage,
    DepartmentPage,
    UnitPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    ListService,
    DepartmentService
  ]
})
export class AppModule {}
