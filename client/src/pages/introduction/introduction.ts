import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HomePage } from './../home/home';

@IonicPage()
@Component({
  selector: 'page-introduction',
  templateUrl: 'introduction.html',
})
export class IntroductionPage {
  navs: NavController;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.navs = navCtrl;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad IntroductionPage');
  }

  onClickStart() {
    this.navs.push(HomePage);
  }

}
