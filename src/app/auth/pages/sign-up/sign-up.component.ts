import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/services/auth.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UsuariosService } from 'src/app/auth/services/usuarios.service';
import { Usuario, ERole } from 'src/app/auth/class/usuario';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {

  public error = false;
  public mostrarPass = false;
  public role: ERole = ERole.paciente;

  public userEmail: string = '';
  public userPwd: string = '';

  createForm = new FormGroup({
    //uid: new FormControl('', [Validators.required, Validators.minLength(6)]),
    //id: new FormControl('', [Validators.required, Validators.minLength(6)]),
    //emailVerified: new FormControl('', [Validators.required, Validators.minLength(6)]),

    email: new FormControl('', [Validators.required, Validators.minLength(6)]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)]),
    displayName: new FormControl('', [Validators.required, Validators.minLength(2)]),
    photoURL: new FormControl('', [Validators.required, Validators.minLength(2)]),
    nombre: new FormControl('', [Validators.required, Validators.minLength(2)]),
    apellido: new FormControl('', [Validators.required, Validators.minLength(2)]),
    sexo: new FormControl('', [Validators.required, Validators.minLength(1)]),
    dni: new FormControl('', [Validators.required, Validators.minLength(7)]),
    edad: new FormControl('', [Validators.required, Validators.minLength(1)]),
    fechaNacimiento: new FormControl('', [Validators.required, Validators.minLength(6)]),
    foto: new FormControl('', [Validators.required, Validators.minLength(2)]),
    //role: new FormControl('', [Validators.required, Validators.minLength(6)]),
    //habilitado: new FormControl('', [Validators.required, Validators.minLength(6)])
  });

  constructor(private authService: AuthService, private usuariosService: UsuariosService) { }


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
        role: this.role,
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

  ngOnInit(): void {
    this.role = this.usuariosService.role;
  }

}
