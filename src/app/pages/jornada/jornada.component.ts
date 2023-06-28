import { Component, EventEmitter, Output, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Especialidad } from 'src/app/class/especialidad';
import { Jornada } from 'src/app/class/jornada';
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

  public jornadas: Jornada[] = [];
  //public jornada: Jornada = {};

  formulario = new FormGroup({
    diaDeSemanaEnNumeros: new FormControl(0, [Validators.required, Validators.min(1), Validators.max(60), Validators.pattern("^[0-9]*$")]),
    horaInicioJornada: new FormControl(8, [Validators.required, Validators.min(1), Validators.max(60), Validators.pattern("^[0-9]*$")]),
    horaFinJornada: new FormControl(19, [Validators.required, Validators.min(1), Validators.max(60), Validators.pattern("^[0-9]*$")]),
    duracionTurno: new FormControl(19, [Validators.required, Validators.min(1), Validators.max(60), Validators.pattern("^[0-9]*$")]),
  });

  constructor(
    private especialidadesSv: EspecialidadesService,
    private jornadasSv: JornadasService) { }

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

  public onEspecialidadChange(event: any) {
    const valorSeleccionado = event.target ? event.target.value : null;
    if (valorSeleccionado !== null) {
      this.setEspecialidad(valorSeleccionado);
      console.log(valorSeleccionado);
    }
  }
  

  public setEspecialidad(especialidad: Especialidad) {
    this.especialidad = especialidad;
    console.log(this.especialidad);
  }


  ///* jornadas//////////////////////////////////////////////////////////////////////////////////
  public addJornada() {

    const newItem: Jornada = {
      //id: this.createForm.value.id ?? '',
      //emailVerified: this.createForm.value.emailVerified ?? '',

      diaDeSemanaEnNumeros: this.formulario.value.diaDeSemanaEnNumeros ?? 0,
      horaInicioJornada: this.formulario.value.horaInicioJornada ?? 0,
      horaFinJornada: this.formulario.value.horaFinJornada ?? 0,
      duracionTurno: this.formulario.value.duracionTurno ?? 0,
      especialidad: this.especialidad,
    };


    this.jornadasSv.addItem(newItem);
  }


  public getJornadas(){
    this.jornadasSv.getItems().subscribe( res => {
      this.jornadas = res;
      console.log(this.jornadas);
    });
  }

  ///////////////////////////////////////////////////////////////////////////////////////////////

  public ngOnInit(): void {
    this.getEspecialidades();
    this.getJornadas();
  }
}
