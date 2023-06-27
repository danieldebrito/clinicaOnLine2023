import { Component, EventEmitter, Output, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Especialidad } from 'src/app/class/especialidad';
import { EspecialidadesService } from 'src/app/services/especialidades.service';
import { JornadasService } from 'src/app/services/jornadas.service';

@Component({
  selector: 'app-jornada',
  templateUrl: './jornada.component.html',
  styleUrls: ['./jornada.component.scss']
})
export class JornadaComponent implements OnInit {

  @Output() pasaItem = new EventEmitter();

  public especialidades: Especialidad[] = [];
  public especialidad: Especialidad = {};

  formulario = new FormGroup({
    diaDeSemanaEnNumeros: new FormControl(0, [Validators.required, Validators.min(30), Validators.max(60), Validators.pattern("^[0-9]*$")]),
    horaInicioJornada: new FormControl(8, [Validators.required, Validators.min(30), Validators.max(60), Validators.pattern("^[0-9]*$")]),
    horaFinJornada: new FormControl(19, [Validators.required, Validators.min(30), Validators.max(60), Validators.pattern("^[0-9]*$")]),
    duracionTurno: new FormControl(19, [Validators.required, Validators.min(30), Validators.max(60), Validators.pattern("^[0-9]*$")]),
  });

  constructor(
    private especialidadesSv: EspecialidadesService,
    private jornadasSv: JornadasService) { }

  public cargar() { }

  public resetFrom() {
    this.formulario.reset({
      diaDeSemanaEnNumeros: 0,
      horaInicioJornada: 8,
      horaFinJornada: 19
    });
  }

  public enviarItem() {
    this.pasaItem.emit({ itemEnviado: this.formulario.getRawValue() });
    // alert(event.target.value);
    // console.log(this.formulario.getRawValue());
  }

  public getEspecialidades() {
    this.especialidadesSv.getItems().subscribe(res => {
      this.especialidades = res;
    });
  }

  public setEspecialidad(especialidad: Especialidad) {
    this.especialidad = especialidad;
  }

  public ngOnInit(): void {
    this.getEspecialidades();
  }


  ///* jornadas//////////////////////////////////////////////////////////////////////////////////
  public addJordana() {

  }
  ///////////////////////////////////////////////////////////////////////////////////////////////
}
