import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { Map } from 'mapbox-gl';

@Component({
  templateUrl: './full-screen-page.component.html',
  styleUrl: './full-screen-page.component.css'
})
export class FullScreenPageComponent implements AfterViewInit{

  // Obtener valor de la etiqueta
  @ViewChild('map') divMap?: ElementRef;

  // Creacion del mapa
  ngAfterViewInit(): void {
    if( !this.divMap ) throw 'El elemento html no fue encontrado'

    const map = new Map({
      container: this.divMap.nativeElement, // container ID
      style: 'mapbox://styles/mapbox/streets-v12', // style URL
      center: [-74.79367470295588, 10.919224141582049], // starting position [lng, lat]
      zoom: 9, // starting zoom
    });
  };

}
