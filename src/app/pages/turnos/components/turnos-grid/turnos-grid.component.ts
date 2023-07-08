import { Component, Input } from '@angular/core';
import { Jornada } from 'src/app/class/jornada';

@Component({
  selector: 'app-turnos-grid',
  templateUrl: './turnos-grid.component.html',
  styleUrls: ['./turnos-grid.component.scss']
})
export class TurnosGridComponent {

  @Input() jornada: Jornada = {};

  

}
