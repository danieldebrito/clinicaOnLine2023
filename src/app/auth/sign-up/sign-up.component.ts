import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UsuariosService } from 'src/app/services/usuarios.service';
import { User } from 'src/app/class/user';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent {

  public error = false;
  public mostrarPass = false;

  public userEmail: string = '';
  public userPwd: string = '';

  createForm = new FormGroup({
    //uid: new FormControl('', [Validators.required, Validators.minLength(6)]),
    //id: new FormControl('', [Validators.required, Validators.minLength(6)]),
    email: new FormControl('', [Validators.required, Validators.minLength(6)]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)]),
    displayName: new FormControl('', [Validators.required, Validators.minLength(6)]),
    photoURL: new FormControl('', [Validators.required, Validators.minLength(6)]),
    emailVerified: new FormControl('', [Validators.required, Validators.minLength(6)]),
    nombre: new FormControl('', [Validators.required, Validators.minLength(6)]),
    apellido: new FormControl('', [Validators.required, Validators.minLength(6)]),
    sexo: new FormControl('', [Validators.required, Validators.minLength(6)]),
    dni: new FormControl('', [Validators.required, Validators.minLength(6)]),
    edad: new FormControl('', [Validators.required, Validators.minLength(6)]),
    fechaNacimiento: new FormControl('', [Validators.required, Validators.minLength(6)]),
    foto: new FormControl('', [Validators.required, Validators.minLength(6)]),
    role: new FormControl('', [Validators.required, Validators.minLength(6)]),
    //habilitado: new FormControl('', [Validators.required, Validators.minLength(6)])
  });

  constructor(private authService: AuthService, private usuariosService: UsuariosService) {}


  public createUser() {


    



    if (this.createForm.valid) {
  
      const newItem: User = {
        //id: this.createForm.value.id ?? '',
        email: this.createForm.value.email ?? '',
        password: this.createForm.value.password ?? '',
        displayName: this.createForm.value.displayName ?? '',
        photoURL: this.createForm.value.photoURL ?? '',
        emailVerified: this.createForm.value.emailVerified ?? '',
        nombre: this.createForm.value.nombre ?? '',
        apellido: this.createForm.value.apellido ?? '',
        sexo: this.createForm.value.sexo ?? '',
        dni: this.createForm.value.dni ?? '',
        edad: this.createForm.value.edad ?? '',
        fechaNacimiento: this.createForm.value.fechaNacimiento ?? '',
        foto: this.createForm.value.foto ?? '',
        role: this.createForm.value.role ?? '',
        // habilitado: this.createForm.value.habilitado ?? '',
      };
  
      this.usuariosService.addItem(newItem);
    } else {
      console.log("El formulario no es válido, realiza alguna acción o muestra un mensaje de error.");
      // El formulario no es válido, realiza alguna acción o muestra un mensaje de error.
    }
  }

  public createUserAuth(userEmail: string,  userPwd: string){
    this.authService.SignUp(userEmail, userPwd);
  }

  public GoogleAuth() {
    this.authService.GoogleAuth();
  }
}
