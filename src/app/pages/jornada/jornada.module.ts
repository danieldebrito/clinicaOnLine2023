import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { JornadaRoutingModule } from './jornada-routing.module';
import { JornadaComponent } from './jornada.component';
import { EspecialidadesModule } from '../especialidades/especialidades.module';
EspecialidadesModule

@NgModule({
  declarations: [
    JornadaComponent
  ],
  imports: [
    CommonModule,
    JornadaRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    EspecialidadesModule
  ]
})
export class JornadaModule { }
