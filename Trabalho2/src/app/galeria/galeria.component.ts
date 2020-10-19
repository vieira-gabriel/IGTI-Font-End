import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'galeria',
  templateUrl: './galeria.component.html',
  styleUrls: ['./galeria.component.css'],
})
export class GaleriaComponent {
  titulo: string = '';
  foto: string[] = [];

  constructor() {}
}
