import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { IntroductionPage } from './../pages/introduction/introduction';
import { RecipePage } from '../pages/recipe/recipe';
import { DepartmentPage } from '../pages/department/department';
import { UnitPage } from '../pages/unit/unit';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = HomePage;
  showIntroductionPage: any;

  pages: Array<{title: string, component: any}>;

  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen) {
    this.showIntroductionPage = false;
    if (this.showIntroductionPage)
      this.rootPage = IntroductionPage;

    this.initializeApp();

    this.pages = [
      { title: 'Home', component: HomePage },
      { title: 'Recipes', component: RecipePage },
      { title: 'Departments', component: DepartmentPage },
      { title: 'Units', component: UnitPage },
      { title: 'Settings', component: HomePage },
    ];

  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  openPage(page) {
    this.nav.push(page.component);
  }
}
