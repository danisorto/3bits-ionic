import { Component } from '@angular/core';
import { NavController, ModalController, Events } from 'ionic-angular';
import { TabsPage } from '../tabs/tabs';
import { ListDetailPage } from '../list-detail/list-detail';

@Component({
  selector: 'page-list-view',
  templateUrl: 'list-view.html',
})
export class ListViewPage {

  list: Array<any>;

  constructor(public navCtrl: NavController, public modalCtrl: ModalController, public events: Events) {
  }

  ngAfterViewInit() {
    this.list = [
      {
        'image': 'assets/avatar-ts-woody.png', 'name': 'Woody',
        'text': 'This town ain\'t big enough for the two of us!', 'time': '3:43 pm',
        'lat': 9.9384763, 'long': -84.0523702
      }, 
      {
        'image': 'assets/avatar-ts-buzz.png', 'name': 'Buzz Lightyear',
        'text': 'My eyeballs could have been sucked from their sockets!', 'time': '1:12 pm',
        'lat': 9.9368244, 'long': -84.0523614
      }, 
      {
        'image': 'assets/avatar-ts-jessie.png', 'name': 'Jessie',
        'text': 'Well aren\'t you just the sweetest space toy I ever did meet!', 'time': '10:03 am',
        'lat': 9.9446916, 'long': -84.0461383
      },
      {
        'image': 'assets/avatar-ts-potatohead.png', 'name': 'Mr. Potato Head',
        'text': 'You\'re not turning me into a Mashed Potato.', 'time': '5:47 am',
        'lat': 9.9369046, 'long': -84.0447918
      }
    ];
  }

  itemSelected(item) {
    console.log(item);
    let modal = this.modalCtrl.create(ListDetailPage, item);
    modal.onDidDismiss(data => {
      console.log(data);
      if (data.showMap) {
        this.events.publish('map:addMarkerIcon', data.character);
      }
    });
    modal.present();
  }
}
