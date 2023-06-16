import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TurnoCardComponent } from './turno-card/turno-card.component';
import { TurnosListComponent } from './turnos-list/turnos-list.component';
import { BarraBusquedaComponent } from './barra-busqueda/barra-busqueda.component';

@NgModule({
  declarations: [
    TurnoCardComponent,
    TurnosListComponent,
    BarraBusquedaComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    TurnoCardComponent,
    TurnosListComponent,
    BarraBusquedaComponent
  ]
})
export class TurnosComponentsModule { }
