import { Injectable } from '@angular/core';
import firebase from 'firebase/compat/app';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { from, Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(public auth: AngularFireAuth) {}

  public logged(){
    return this.auth.user
  }

  // Login conta Google
  public loginWithGoogle() {
    this.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider)
  }

  // Login conta Facebook
  public loginWithFacebook() {
    this.auth.signInWithPopup(new firebase.auth.FacebookAuthProvider)
  }

  // Logout
  public logout() : Observable<any> {
    return from(this.auth.signOut())
  }




}
