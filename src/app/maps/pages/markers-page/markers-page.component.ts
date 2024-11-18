import { Component, ElementRef, ViewChild } from '@angular/core';
import { LngLat, Map, Marker } from 'mapbox-gl';
import { MarkerAndColor } from '../../interfaces/marker-color.interface';
import { PlainMarker } from './../../interfaces/plain-marker.interface'


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

    this.readFromLocalStorage();
  };

  // crear marca
  createMarker() {
    if(!this.map) return;

    const color = '#xxxxxx'.replace(/x/g, y=>(Math.random()*16|0).toString(16));
    const lgnLat = this.map.getCenter();

    this.addMarker(lgnLat, color);
  };


  // añadir marca
  addMarker(lngLat: LngLat, color: string ) {
    if(!this.map) return;

    const marker = new Marker({
      color: color,
      draggable: true,
    })
      .setLngLat(lngLat)
      .addTo(this.map)
      
    this.markers.push({ color, marker });
    this.saveToLocalStorage();

    marker.on('dragend', () => this.saveToLocalStorage())
  };

  // Eliminar marcadores
  delateMarker(index: number): void {
    this.markers[index].marker.remove();
    this.markers.splice(index, 1);

    this.saveToLocalStorage();
  };


  // ir a la marca 
  flyTo(marker: Marker){
    this.map?.flyTo({
      zoom: 15,
      center: marker.getLngLat(),
    });
  };

  // Guardar marcadores en localStorage
  saveToLocalStorage() {
    const plainMarkers: PlainMarker[]  = this.markers.map(({color, marker}) => {
      return {
        color,
        lngLat: marker.getLngLat().toArray(),
      };
    });

    localStorage.setItem('plainMarkers', JSON.stringify(plainMarkers));
  };


  // Leer marcadores del localStorage
  readFromLocalStorage() {
    const plainMakerString = localStorage.getItem('plainMarkers') ?? '[]';
    const plainMarker: PlainMarker[] = JSON.parse(plainMakerString);

    plainMarker.forEach(({color, lngLat}) => {
      const [lng, lat] = lngLat;
      const coords =  new LngLat(lng, lat);

      this.addMarker(coords, color);
    });

  };

 
};
