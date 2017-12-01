import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavParams, Platform, ViewController } from 'ionic-angular';

@Component({
  selector: 'page-list-detail',
  templateUrl: 'list-detail.html',
})
export class ListDetailPage {
  character: any;

  constructor(public platform: Platform,
    public params: NavParams,
    public viewCtrl: ViewController
  ) {
    this.character = this.params.data;
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

  showInMap() {
    let data = {'showMap': true, 'character': this.character};
    this.viewCtrl.dismiss(data);
  }
}
