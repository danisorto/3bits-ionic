import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController, Events } from 'ionic-angular';
import {
  GoogleMaps,
  GoogleMap,
  GoogleMapsEvent,
  CameraPosition,
  LatLng,
  MarkerOptions,
  Marker
 } from '@ionic-native/google-maps';
 import { Geolocation } from '@ionic-native/geolocation';

@Component({
  selector: 'page-maps',
  templateUrl: 'maps.html',
})
export class MapsPage {

  @ViewChild('myCanvas') canvasRef: ElementRef;
  @ViewChild('map') mapElement: ElementRef;
  map: GoogleMap;
  mapNotInit: boolean = true;

  constructor(public navCtrl: NavController, private _googleMaps: GoogleMaps, private _geoLoc: Geolocation, 
    public events: Events) { 
    events.subscribe('map:addMarkerIcon', (character) => {
      this.showCharacterMarker(character);
    });
  }

  ngAfterViewInit(){
    let loc: LatLng;
    this.initMap();

    // When the map is ready
    this.map.one(GoogleMapsEvent.MAP_READY).then(() => {
      this.mapNotInit = false;
      this.getLocation().then(res => {
        loc = new LatLng(res.coords.latitude, res.coords.longitude);
        this.moveCamera(loc);

        // Add marker
        this.createMarker(loc, "Aqui toi").then((marker: Marker) => {
          marker.showInfoWindow();
        }).catch(err => {
          console.log(err);
        });

        // Enable my location button
        this.map.setMyLocationEnabled(true);
      })
    }).catch(err => {
      console.log(err);
    });
  }

  initMap(){
    let element = this.mapElement.nativeElement;
    this.map = this._googleMaps.create(element);
  }

  getLocation(){
    return this._geoLoc.getCurrentPosition();
  }

  moveCamera(loc: LatLng){
    let options: CameraPosition<any> = {
      target: loc,
      zoom: 15,
      tilt: 10
    }
    this.map.moveCamera(options);
    // this.map.
  }

  createMarker(loc: LatLng, title: string) {
    let markerOptions: MarkerOptions = {
      position: loc,
      title: title
    }

    return this.map.addMarker(markerOptions);
  }

  createMarkerWithIcon(loc: LatLng, title: string, icon: any) {
    let markerOptions: MarkerOptions = {
      position: loc,
      title: title,
      icon: icon
    }

    return this.map.addMarker(markerOptions);
  }

  showCharacterMarker(character: any) {
    let loc: LatLng;
    loc = new LatLng(character.lat, character.long);

    let iconURL: string = this.getMarkerIconWithPicture(character.image);
    
    this.createMarkerWithIcon(loc, character.name, { 'url': iconURL, 'size': {width: 80, height: 80}})
    .then((marker: Marker) => {
      marker.showInfoWindow();
      this.moveCamera(loc);
    }).catch(err => {
      console.log(err);
    });
  }

  getMarkerIconWithPicture(src: string) {
    var canvas = document.createElement('canvas');
    canvas.setAttribute('width', '200');
    canvas.setAttribute('height', '200');
    let ctx: CanvasRenderingContext2D = canvas.getContext('2d');

    var img1 = new Image();
    var img2 = new Image();

    img1.src = src;
    img2.src = 'assets/customMarker.png';

    ctx.drawImage(img1, canvas.width / 2 - 50, 24, 100, 100);
    ctx.globalAlpha = 1;
    ctx.drawImage(img2, 0, 0, 200, 200);
    return canvas.toDataURL()
  }
}
