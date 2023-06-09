import { Component } from '@angular/core';
import { AuthService } from 'src/app/auth/services/auth.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ERole, Usuario } from 'src/app/auth/class/usuario';
import { Especialidad } from 'src/app/class/especialidad';

@Component({
  selector: 'app-sign-up-especialista',
  templateUrl: './sign-up-especialista.component.html',
  styleUrls: ['./sign-up-especialista.component.scss']
})
export class SignUpEspecialistaComponent {

  public error = false;
  public mostrarPass = false;

  public userEmail: string = '';
  public userPwd: string = '';

  public especialidades: Especialidad[] = [];
  public espEspecialista: Especialidad[] = [];

  createForm = new FormGroup({
    //uid: new FormControl('', [Validators.required, Validators.minLength(6)]),
    //id: new FormControl('', [Validators.required, Validators.minLength(6)]),
    //emailVerified: new FormControl('', [Validators.required, Validators.minLength(6)]),
    email: new FormControl('', [Validators.required, Validators.minLength(6)]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)]),
    displayName: new FormControl('', [Validators.required, Validators.minLength(6)]),
    photoURL: new FormControl('', [Validators.required, Validators.minLength(6)]),
    nombre: new FormControl('', [Validators.required, Validators.minLength(6)]),
    apellido: new FormControl('', [Validators.required, Validators.minLength(6)]),
    sexo: new FormControl('', [Validators.required, Validators.minLength(6)]),
    dni: new FormControl('', [Validators.required, Validators.minLength(6)]),
    edad: new FormControl('', [Validators.required, Validators.minLength(6)]),
    fechaNacimiento: new FormControl('', [Validators.required, Validators.minLength(6)]),
    foto: new FormControl('', [Validators.required, Validators.minLength(6)]),
    //role: new FormControl('', [Validators.required, Validators.minLength(6)]),
    //habilitado: new FormControl('', [Validators.required, Validators.minLength(6)])
  });

  constructor(
    private authService: AuthService,
  ) { }


  public createUser() {
    if (this.createForm.valid) {

      //const habilitadoValue = this.createForm.value.habilitado === 'true' ? true : false;

      const newItem: Usuario = {
        //id: this.createForm.value.id ?? '',
        //emailVerified: this.createForm.value.emailVerified ?? '',

        email: this.createForm.value.email ?? '',
        password: this.createForm.value.password ?? '',
        displayName: this.createForm.value.displayName ?? '',
        photoURL: this.createForm.value.photoURL ?? '',
        nombre: this.createForm.value.nombre ?? '',
        apellido: this.createForm.value.apellido ?? '',
        sexo: this.createForm.value.sexo ?? '',
        dni: this.createForm.value.dni ?? '',
        edad: this.createForm.value.edad ?? '',
        fechaNacimiento: this.createForm.value.fechaNacimiento ?? '',
        foto: this.createForm.value.foto ?? '',
        role: ERole.especialista,
        habilitado: true,
      };

      // this.createUserAuth(newItem);
      this.authService.SignUp(newItem);


      console.log(newItem);
      //this.usuariosService.addItem(newItem);
    } else {
      console.log("El formulario no es válido, realiza alguna acción o muestra un mensaje de error.");
      // El formulario no es válido, realiza alguna acción o muestra un mensaje de error.
    }
  }

  public createUserAuth(usuario: Usuario) {
    const pass = usuario.password ?? '';
    const email = usuario.email ?? '';
    //this.authService.SignUp(email, pass);
  }

  public GoogleAuth() {
    this.authService.GoogleAuth();
  }

  public AddEspecialidadSeleccionada(item: Especialidad) {
    this.espEspecialista.push(item);
    console.table(this.espEspecialista);
  }
}
