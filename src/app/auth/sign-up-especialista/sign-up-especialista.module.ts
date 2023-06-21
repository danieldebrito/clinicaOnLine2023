import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SignUpEspecialistaRoutingModule } from './sign-up-especialista-routing.module';
import { SignUpEspecialistaComponent } from './sign-up-especialista.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EspecialidadesModule } from 'src/app/pages/especialidades/especialidades.module';


@NgModule({
  declarations: [
    SignUpEspecialistaComponent
  ],
  imports: [
    CommonModule,
    SignUpEspecialistaRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    EspecialidadesModule
  ]
})
export class SignUpEspecialistaModule { }
