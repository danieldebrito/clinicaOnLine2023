import { Injectable, NgZone } from '@angular/core';
import { Usuario } from 'src/app/auth/class/usuario';
import { UserLog } from 'src/app/auth/class/userLog';

import { Router } from '@angular/router';
import { catchError, map, take } from 'rxjs/operators';

import { AngularFireAuth } from '@angular/fire/compat/auth';
import { collection, collectionData, doc, docData, Firestore, updateDoc } from '@angular/fire/firestore';
import { Observable, throwError } from 'rxjs';
import { LogUserService } from './log-user.service';
import { UsuariosService } from './usuarios.service';
import * as auth from 'firebase/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {


  userData: any; // Save logged in user data
  public allUsers: any[] = [];

  constructor(
    private logUserSv: LogUserService,
    private usuariosSv: UsuariosService,
    public afs: Firestore,
    public afAuth: AngularFireAuth,
    public router: Router,
    public ngZone: NgZone
  ) {
    this.afAuth.authState.subscribe((user) => {
      if (user) {
        this.userData = user;
        localStorage.setItem('user', JSON.stringify(this.userData));
        this.userData = JSON.parse(localStorage.getItem('user')!);
      } else {
        localStorage.setItem('user', 'null');
        this.userData = JSON.parse(localStorage.getItem('user')!);
      }
    });
  }

  // Sign in with email/password
  SignIn(email: string, password: string) {
    return this.afAuth
      .signInWithEmailAndPassword(email, password)
      .then((res) => {
        if (res.user) {
          this.UpdateUserData(password, res.user!);
        }
  
        this.afAuth.authState.subscribe((user) => {
          if (user) {
            this.router.navigate(['home']);
          }
        });
      })
      .catch((error) => {
        console.log(error.message);
      });
  }
  

  // Sign up with email/password
  SignUp(usuario: Usuario) {
    return this.afAuth
      .createUserWithEmailAndPassword(usuario.email, usuario.password)
      .then((result) => {
        /* Call the SendVerificaitonMail() function when new user sign
        up and returns promise */
        this.SendVerificationMail();

        usuario.uid = result.user?.uid;
        usuario.displayName = result.user?.displayName ?? '';
        usuario.emailVerified = result.user?.emailVerified ?? false;

        this.usuariosSv.addItem(usuario);

        /////////////////////////////////////////////////////////////////////////////////////////this.SetUserData(result.user);
      })
      .catch((error) => {
        console.log(error.message);
      });
  }
  // Send email verfificaiton when new user sign up
  SendVerificationMail() {
    return this.afAuth.currentUser
      .then((u: any) => u.sendEmailVerification())
      .then(() => {
        this.router.navigate(['verify-email']);
      });
  }
  // Reset Forggot password
  ForgotPassword(passwordResetEmail: string) {
    return this.afAuth
      .sendPasswordResetEmail(passwordResetEmail)
      .then(() => {
        console.log('Password reset email sent, check your inbox.');
      })
      .catch((error) => {
        console.log(error);
      });
  }
  // Returns true when user is looged in and email is verified
  get isLoggedIn(): boolean {
    const user = JSON.parse(localStorage.getItem('user')!);
    return user !== null && user.emailVerified !== false ? true : false;
  }
  // Sign in with Google
  // Sign in with Google
  GoogleAuth() {
    return this.AuthLogin(new auth.GoogleAuthProvider()).then((res: any) => {
      this.router.navigate(['home']);
    });
  }
  // Auth logic to run auth providers
  AuthLogin(provider: any) {
    return this.afAuth
      .signInWithPopup(provider)
      .then((result) => {
        this.router.navigate(['home']);

        /////////////////////////////////////////////////////////////////////////////////////////this.SetUserData(result.user);

        this.cargarLog(result.user);  /// cargo el log

        console.log(result.user);
      })
      .catch((error) => {
        console.log(error);
      });
  }
  // Sign out
  SignOut() {
    return this.afAuth.signOut().then(() => {
      localStorage.removeItem('user');
      this.router.navigate(['sign-in']);
    });
  }

  /*Setting up user data when sign in with username/password,
  sign up with username/password and sign in with social auth
  provider in Firestore database 
  async SetUserData(user: any) {
    const col = collection(this.afs, 'usuarios');
    const userDoc = await getDoc(doc(col, user.uid));

    if (userDoc.exists()) {
      console.log('El usuario ya está registrado');
    } else {
      
      const userData: Usuario = {
        uid: user.uid,
        email: user.email,
        displayName: user.displayName,
        photoURL: user.photoURL,
        emailVerified: user.emailVerified,
      };

      //setDoc(doc(col, user.uid), user);
    }
  }
  */


  UpdateUserData(pass: string, user: firebase.default.User) { // Update the type of user parameter
    const col = collection(this.afs, 'usuarios');
    const allItems = collectionData(col);

    let userData: any = {};

    allItems.pipe(take(1)).subscribe(res => {
      this.allUsers = res;
      userData = this.allUsers.find(usr => usr.uid == user.uid);

      console.table(userData);
      console.log(user);

      const documento = doc(col, userData.id);
      userData = {
        uid: user.uid,
        email: user.email,
        password: pass,
        displayName: user.displayName,
        photoURL: user.photoURL,
        emailVerified: user.emailVerified,
      };

      updateDoc(documento, userData);
    });
  }

  public getUserByID(id: string): Observable<Usuario> {
    const col = collection(this.afs, 'usuarios');
    const documento = doc(col, id);

    const observable = docData(documento).pipe(
      map(res => {
        return res as Usuario;
      }),
      catchError(err => {
        console.error('Error obteniendo el documento:', err);
        return throwError(() => err);
      })
    );
    return observable;
  }

  private cargarLog(user: any) {
    let userLog: UserLog = {};
    userLog.fechaIngreso = new Date().getTime();
    userLog.uid = user.uid;
    this.logUserSv.addItem(userLog);
  }
}
