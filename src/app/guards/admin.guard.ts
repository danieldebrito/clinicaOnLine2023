import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { Observable, of } from 'rxjs';
import { take, switchMap, map, tap, catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { UsuariosService } from '../auth/services/usuarios.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Usuario } from 'src/app/auth/class/usuario';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {

  public userLoggedUID: string = '';
  public usuario: Usuario = { email: '', password: ''};

  constructor(
    private usuariosSv: UsuariosService,
    private router: Router,
    private afAuth: AngularFireAuth
  ) {}

  canActivate(): Observable<boolean> | Promise<boolean> | boolean {
    return this.afAuth.authState.pipe(
      take(1),
      switchMap(user => {
        if (user) {
          this.userLoggedUID = user.uid;
          return this.usuariosSv.getItemByUid(this.userLoggedUID).pipe(
            map(res => {
              if (res) {
                this.usuario = res;
                return res.role == 'administrador';
              } else {
                return false;
              }
            })
          );
        } else {
          this.userLoggedUID = '';
          return of(false);
        }
      }),
      tap(isAdmin => {
        if (!isAdmin) {
          this.router.navigate(['/denegado']); // Redirect to unauthorized page
        }
      }),
      catchError(error => {
        console.log('Error al obtener el rol del usuario', error);
        return of(false);
      })
    );
  }
}
