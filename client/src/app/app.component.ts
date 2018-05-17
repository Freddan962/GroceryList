import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, NavController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { IntroductionPage } from './../pages/introduction/introduction';
import { DepartmentPage } from '../pages/department/department';

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
      { title: 'Lists', component: HomePage },
      { title: 'Departments', component: DepartmentPage },
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
