import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbNavModule } from '@ng-bootstrap/ng-bootstrap';

import { SacarTurnoRoutingModule } from './sacar-turno-routing.module';
import { SacarTurnoComponent } from './sacar-turno.component';
import { TurnosComponentsModule } from '../../components/turnos-components.module';
import { EspecialistaComponentsModule } from 'src/app/pages/especialistas/components/especialista-components.module';
import { EspecialidadesModule } from 'src/app/pages/especialidades/especialidades.module';


@NgModule({
  declarations: [
    SacarTurnoComponent
  ],
  imports: [
    CommonModule,
    SacarTurnoRoutingModule,
    TurnosComponentsModule,
    NgbNavModule,
    EspecialistaComponentsModule,
    EspecialidadesModule
  ]
})
export class SacarTurnoModule { }
