// Create authentication Service

import { Injectable } from '@angular/core';
import { Auth, signInWithEmailAndPassword } from '@angular/fire/auth';
import { from } from 'rxjs';
import { authState } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  public currentUser$ = authState(this._afAuth);
  constructor(private readonly _afAuth: Auth) {}

  public login(email: string, password: string) {
    return from(signInWithEmailAndPassword(this._afAuth, email, password));
  }

  public logout() {
    return from(this._afAuth.signOut());
  }
}
