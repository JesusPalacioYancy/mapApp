import { AfterViewInit, Component, ElementRef, OnDestroy, ViewChild } from '@angular/core';
import { LngLat, Map } from 'mapbox-gl';

@Component({
  templateUrl: './zoom-range-page.component.html',
  styleUrl: './zoom-range-page.component.css'
})
export class ZoomRangePageComponent implements AfterViewInit, OnDestroy{

  // Valor del zomm
  public zoom: number = 10;

  // propiedad del mapa '?'
  public map?: Map;

  // propiedad de LNG y LAT
  public lngLat: LngLat = new LngLat(-74.79367470295588, 10.919224141582049)

  
  // Obtener valor de la etiqueta
  @ViewChild('map') divMap?: ElementRef;

  // Creacion del mapa
  ngAfterViewInit(): void {
    if( !this.divMap ) throw 'El elemento html no fue encontrado'

    this.map = new Map({
      container: this.divMap.nativeElement, // container ID
      style: 'mapbox://styles/mapbox/streets-v12', // style URL
      center: this.lngLat, // starting position [lng, lat]
      zoom: this.zoom, // starting zoom
    });
    this.mapListeners()
  };

  // Listener para obtener y limitar
  mapListeners(): void  {
    if( !this.map ) throw 'Mapa no inicializado'

    this.map.on('zoom', (ev) => {
      this.zoom = this.map!.getZoom();
    });

    this.map.on('zoomend', (ev) => {
      if( this.map!.getZoom() < 18 ) return; 

      this.map!.zoomTo(18)
    });

    this.map.on('move', () => {
      this.lngLat = this.map!.getCenter();
    });

  };

  zoomIn(): void{
    this.map?.zoomIn();
  };

  zoomOut(): void{
    this.map?.zoomOut();
  };

  zoomChange(value: string): void {
    this.zoom = Number(value)
    this.map?.zoomTo(this.zoom)
  };


  ngOnDestroy(): void {
    this.map?.remove();
  };


};
