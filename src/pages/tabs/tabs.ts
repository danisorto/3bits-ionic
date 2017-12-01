import { Component, ViewChild } from '@angular/core';

import { AboutPage } from '../about/about';
import { ContactPage } from '../contact/contact';
import { HomePage } from '../home/home';
import { ListViewPage } from '../list-view/list-view';
import { MapsPage } from '../maps/maps';
import { NavController, Tabs, Events } from 'ionic-angular';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  @ViewChild('myTabs') tabRef: Tabs;

  tab1Root = HomePage;
  tab2Root = AboutPage;
  tab3Root = ContactPage;
  tab4Root = ListViewPage;
  tab5Root = MapsPage;

  constructor(private navCtrl: NavController, public events: Events) {
    events.subscribe('map:addMarkerIcon', (character) => {
      this.gotToTab(2);
    });
  }

  changingTab () {
  }

  gotToTab(index) {
    this.tabRef.select(index);
  }
}