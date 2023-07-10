import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TurnoCardComponent } from './turno-card/turno-card.component';
import { TurnosListComponent } from './turnos-list/turnos-list.component';
import { BarraBusquedaComponent } from './barra-busqueda/barra-busqueda.component';
import { TurnosGridComponent } from './turnos-grid/turnos-grid.component';
import { TurnosGeneradorComponent } from './turnos-generador/turnos-generador.component';

@NgModule({
  declarations: [
    TurnoCardComponent,
    TurnosListComponent,
    BarraBusquedaComponent,
    TurnosGridComponent,
    TurnosGeneradorComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    TurnoCardComponent,
    TurnosListComponent,
    BarraBusquedaComponent,
    TurnosGridComponent,
    TurnosGeneradorComponent
  ]
})
export class TurnosComponentsModule { }
