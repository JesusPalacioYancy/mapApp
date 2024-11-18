import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CounterAloneComponent } from '../../components/counterAlone/counterAlone.component';
import { SideMenuComponent } from "../../components/side-menu/side-menu.component";


@Component({
  selector: 'alone-olene-page',
  standalone: true,
  imports: [CommonModule, CounterAloneComponent, SideMenuComponent],
  templateUrl: './olenePage.component.html',
  styleUrl: './olenePage.component.css',
})

export class OlenePageComponent {



};
