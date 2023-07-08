import { Component, Input } from '@angular/core';
import { Especialidad } from 'src/app/class/especialidad';

@Component({
  selector: 'app-especialistas-grid',
  templateUrl: './especialistas-grid.component.html',
  styleUrls: ['./especialistas-grid.component.scss']
})
export class EspecialistasGridComponent {

  @Input() especialistas: Especialidad[] = [];

}
