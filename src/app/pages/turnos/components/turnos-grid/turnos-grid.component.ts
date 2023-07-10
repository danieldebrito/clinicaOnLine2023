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


  public generadorDeTurnos(jornada: any) {
    // cuantos irtervalos por hora * cantidad de horas de atencion
    const cant =
      (60 / jornada.duracionTurno) *
      (jornada.horaFinJornada -
        jornada.horaInicioJornada);

    // primer semana
    for (let i = 0; i < cant; i++) {
      for (let j = 0; j < 7; j++) {
        // quito el domingo (6) y pongo el dia de la jornada en la grilla 0 = lunes, 1 =  martes,  etc....
        if (j !== 6 && j == jornada.diaDeSemanaEnNumeros) {
          this.turnos.push({
            // le sumo un dia ( 24hs ) para armar los Turnos ( 60*24 = 1440 )
            fecha: this.sumarMinuts(i * jornada.duracionTurno + 1440 * j),
            dia: this.getNombreDia(j),
          });
        }
      }
      // segunda semana
      for (let j = 7; j < 14; j++) {
        if (j !== 13 && j == jornada.diaDeSemanaEnNumeros + 7) {
          this.turnos.push({
            fecha: this.sumarMinuts(i * jornada.duracionTurno + 1440 * j),
            dia: this.getNombreDia(j - 7),
          });
        }
      }
    }
    console.log(this.turnos);
  } ///////////////////////////////////////////////////////////////

  public getNombreDia(dia: number) {
    let ret: string = '';
    switch (dia) {
      case 0:
        ret = 'Lun';
        break;
      case 1:
        ret = 'Mar';
        break;
      case 2:
        ret = 'Mie';
        break;
      case 3:
        ret = 'Jue';
        break;
      case 4:
        ret = 'Vie';
        break;
      case 5:
        ret = 'Sab';
        break;
      case 6:
        ret = 'Dom';
        break;
      default:
        console.log('No existe!');
        break;
    }
    return ret;
  }

  public sumarDias(dias: number) {
    const fecha = new Date(
      this.getToday().getFullYear(),
      this.getToday().getMonth(),
      this.getToday().getDate(),
      8,
      0
    );
    fecha.setDate(fecha.getDate() + dias);

    return fecha;
  }

  public sumarMinuts(minuts: number) {
    return new Date(this.getMonday(this.getToday()).getTime() + minuts * 60000);
  }

  public fechaToString(fecha: Date) {
    const dia = fecha.getDate().toString();
    const mes = (fecha.getMonth() + 1).toString();
    const anio = fecha.getFullYear().toString();
    const hora =
      fecha.getHours() < 10
        ? '0' + fecha.getHours().toString()
        : fecha.getHours().toString();
    const minutos =
      fecha.getMinutes() < 10
        ? '0' + fecha.getMinutes().toString()
        : fecha.getMinutes().toString();

    return dia + '/' + mes + '/' + anio + ' ' + hora + ':' + minutos;
  }

  public getMonday(date: Date) {
    const day = date.getDay() || 7;
    if (day !== 1) {
      date.setHours(-24 * (day - 1));
    }
    // retorno el lunes 8:00 AM
    return new Date(date.getFullYear(), date.getMonth(), date.getDate(), 8, 0);
  }

  public getToday() {
    return new Date();
  }
  

  ngOnInit(): void {

    this.jornadasSv.getItems().subscribe( res => {
      this.generadorDeTurnos(res[0]);
    });


    this.jornadasSv.getItems().subscribe(res => {
      this.jornadas = res;
    });
  }
}