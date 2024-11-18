import { Component, ElementRef, ViewChild } from '@angular/core';
import { LngLat, Map, Marker } from 'mapbox-gl';


interface MarkerAndColor {
  color : string;
  marker : Marker;
};


@Component({
  templateUrl: './markers-page.component.html',
  styleUrl: './markers-page.component.css'
})

export class MarkersPageComponent {

  // Array de las marcas
  public markers: MarkerAndColor[] = [];

  // propiedad del mapa '?'
  public map?: Map;

  // propiedad de LNG y LAT
  public lngLat: LngLat = new LngLat(-74.79367470295588, 10.919224141582049);


  // Obtener valor de la etiqueta
  @ViewChild('map') divMap?: ElementRef;

  // Creacion del mapa
  ngAfterViewInit(): void {
  if( !this.divMap ) throw 'El elemento html no fue encontrado'
  
    this.map = new Map({
      container: this.divMap.nativeElement, // container ID
      style: 'mapbox://styles/mapbox/streets-v12', // style URL
      center: this.lngLat, // starting position [lng, lat]
      zoom: 15, // starting zoom
    });

    // Ejemplo de marcador
    // const markerHtml = document.createElement('div')
    // markerHtml.innerHTML = 'JP'
    
    // const markers = new Marker({
    //   color: 'red',
    //   element: markerHtml
    // })
    //   .setLngLat(this.lngLat)
    //   .addTo(this.map)
  };

  // crear marca
  createMarker() {
    if(!this.map) return;

    const color = '#xxxxxx'.replace(/x/g, y=>(Math.random()*16|0).toString(16));
    const lgnLat = this.map.getCenter();

    this.addMarker(lgnLat, color)
  };


  // añadir marca
  addMarker(lngLat: LngLat, color: string ) {
    if(!this.map) return;

    const marker = new Marker({
      color: color,
      draggable: true
    })
      .setLngLat(lngLat)
      .addTo(this.map)
      this.markers.push({
        color,
        marker
      })
  };

  // Eliminar marcadores
  delateMarker(index: number): void {
    this.markers[index].marker.remove();
    this.markers.splice(index, 1);
  };


  flyTo(marker: Marker){
    this.map?.flyTo({
      zoom: 14,
      center: marker.getLngLat()
    })
  }


 
};
