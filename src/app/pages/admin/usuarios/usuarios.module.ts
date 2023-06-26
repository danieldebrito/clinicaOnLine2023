import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsuariosRoutingModule } from './usuarios-routing.module';
import { UsuariosComponent } from './usuarios.component';
import { UsuariosTablaComponent } from './usuarios-tabla/usuarios-tabla.component';


@NgModule({
  declarations: [
    UsuariosComponent,
    UsuariosTablaComponent
  ],
  imports: [
    CommonModule,
    UsuariosRoutingModule
  ]
})
export class UsuariosModule { }
