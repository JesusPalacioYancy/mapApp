import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

interface menuItem {
  route: string;
  name: string;
};

@Component({
  selector: 'side-menu',
  standalone: true,
  imports: [CommonModule, RouterModule ],
  templateUrl: './side-menu.component.html',
  styleUrl: './side-menu.component.css'
})
export class SideMenuComponent {

  public menuItems: menuItem[] = [
    {route: '/maps/fullscreen', name: 'FullScreen'},
    {route: '/maps/zoomrange', name: 'ZoomRange'},
    {route: '/maps/markers', name: 'Markers'},
    {route: '/maps/properties', name: 'Houses'},
    {route: '/alone', name: 'AlonePage'},
  ];

};
