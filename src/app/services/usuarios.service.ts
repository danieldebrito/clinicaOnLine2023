import { Injectable } from '@angular/core';
import { collection, collectionData, deleteDoc, doc, docData, Firestore, orderBy, query, setDoc, updateDoc, where } from '@angular/fire/firestore';
import { catchError, map, Observable, throwError } from 'rxjs';
import { User } from '../class/user';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  constructor(private firestore: Firestore) { }

  public addItem(item: User) {
    const col = collection(this.firestore, 'usuarios');
    const newDoc = doc(col);

    item.id = newDoc.id; // guardo el id del documento que crea firebase
    setDoc(newDoc, item);
  }

  public getItems(): Observable<User[]> {
    const col = collection(this.firestore, 'usuarios');
    //                 const queryObservable = query(col, orderBy('email')); // ORDENARRRR
    const observable = collectionData(col).pipe(
      map(res => {
        return res as User[];
      }),
      catchError(err => {
        console.error('Error obteniendo datos:', err);
        return throwError(() => err);
      })
    );
    return observable;
  }

  public getItemById(id: string): Observable<User> {
    const col = collection(this.firestore, 'usuarios');
    const documento = doc(col, id);

    const observable = docData(documento).pipe(
      map(res => {
        return res as User;
      }),
      catchError(err => {
        console.error('Error obteniendo el documento:', err);
        return throwError(() => err);
      })
    );
    return observable;
  }

  public getItemByUid(uid: string): Observable<User> {
    const col = collection(this.firestore, 'usuarios');
    const queryRef = query(col, where('uid', '==', uid));

    const observable = collectionData(queryRef).pipe(
      map(res => {
        // Debería haber solo un resultado, por lo que se toma el primer elemento del array
        const user = res[0];
        return user as User;
      }),
      catchError(err => {
        console.error('Error obteniendo el usuario:', err);
        return throwError(() => err);
      })
    );
    return observable;
  }


  public update(id: string, Item: any) {
    const col = collection(this.firestore, 'usuarios');
    const documento = doc(col, id);

    updateDoc(documento, Item);
  }

  public delete(id: string) {
    const col = collection(this.firestore, 'usuarios');
    const documento = doc(col, id);

    deleteDoc(documento);
  }
}