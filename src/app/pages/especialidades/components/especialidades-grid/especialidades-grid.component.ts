import { Component, Input } from '@angular/core';
import { Especialidad } from 'src/app/class/especialidad';

@Component({
  selector: 'app-especialidades-grid',
  templateUrl: './especialidades-grid.component.html',
  styleUrls: ['./especialidades-grid.component.scss']
})
export class EspecialidadesGridComponent {

  @Input() especialidades: Especialidad[] = [];

}
