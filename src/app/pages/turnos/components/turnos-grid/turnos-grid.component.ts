import { Component, OnInit, Input } from '@angular/core';
import { Jornada } from 'src/app/class/jornada';
import { Turno } from 'src/app/class/turno';
import { JornadasService } from 'src/app/services/jornadas.service';

@Component({
  selector: 'app-turnos-grid',
  templateUrl: './turnos-grid.component.html',
  styleUrls: ['./turnos-grid.component.scss']
})
export class TurnosGridComponent implements OnInit {

  @Input() jornadas: Jornada[] = [];
  @Input() turnos: Turno[] = [];

  public dias = [
    { dia: 'lunes', numero: 1 },
    { dia: 'martes', numero: 1 },
    { dia: 'miercoles', numero: 1 },
    { dia: 'jueves', numero: 1 },
    { dia: 'viernes', numero: 1 },
    { dia: 'sabado', numero: 1 }
  ];

  constructor(private jornadasSv: JornadasService) { }

  public generateTurnos(jornadas: Jornada[]) {

  }
  

  ngOnInit(): void {
    this.jornadasSv.getItems().subscribe(res => {
      this.jornadas = res;
    });
  }
}
